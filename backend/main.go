// main.go
package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"example.com/sa-67-example/config"
	"example.com/sa-67-example/controller"
	"os"
)

const PORT = "8000"

func main() {
	// open connection database
	config.ConnectionDB()

	// Generate databases
	config.SetupDatabase()

	r := gin.Default()

	// ตรวจสอบว่ามีโฟลเดอร์ uploads หรือไม่ ถ้าไม่มีให้สร้างขึ้น
	if _, err := os.Stat("uploads"); os.IsNotExist(err) {
		os.Mkdir("uploads", os.ModePerm)
	}

	// Set static folder for serving uploaded files
	r.Static("/uploads", "./uploads") // เส้นทางสำหรับไฟล์ที่อัปโหลด

	r.Use(CORSMiddleware())

	router := r.Group("")
	{
		// Member Routes
		router.POST("/login", controller.SignIn)
		router.POST("/Member", controller.SignUp)

		// Concert Routes
		router.GET("/concerts", controller.ListConcerts)
		router.GET("/seats/:id", controller.GetSeatsByConcertID)
		router.GET("/seatTypes", controller.GetSeatTypes)
		router.POST("/concerts/:id/seat", controller.SelectSeat)
		router.POST("/payment", controller.CreatePayment)
		router.POST("/ticket", controller.CreateTicket)
		router.GET("/payment/:id", controller.GetPaymentsByMemberID) // เส้นทางสำหรับดึงข้อมูลการชำระเงินของสมาชิก
		router.GET("/tickets/member/:memberID", controller.ListTicketsByMemberID)
		
		//Refundrequest
		router.GET("/refundrequest", controller.GetAllRefundrequest)
		router.GET("/refundrequest/:id", controller.GetRefundrequestbyId)
		router.POST("/refundrequest", controller.CreateRefundrequest)
		router.DELETE("/refundrequest/:id", controller.DeleteRefundrequest)
		router.PUT("/refundrequest/:id",controller.UpdateRefundrequestByUserID)
		router.PATCH("/refundrequest/:id",controller.UpdateRefundrequest)
		// เปลี่ยนการเรียกใช้งาน SendEmail ให้ถูกต้อง
		router.POST("/sendTicketEmail", controller.SendEmail)
		//Refundapproval
		router.GET("/refundapproval", controller.GetAllRefundApproval)
		router.GET("/refundapproval/:id", controller.GetRefundapprovalbyId)
		router.POST("/refundapproval", controller.CreateRefundApproval)
		router.DELETE("/refundapproval/:id", controller.DeleteRefundapproval)
		router.PUT("/refundapproval/:id",controller.UpdateRefundapprovalByUserID)
		router.PATCH("/refundapproval/:id",controller.UpdateRefundApproval)

	}

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	// Run the server
	r.Run("localhost:" + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With, Content-Disposition")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}