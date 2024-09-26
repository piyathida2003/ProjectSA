export const submitRefundRequest = async (values: any, ticket: any) => {
    try {
      const response = await fetch("/api/refund-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, ticket }), // ส่งข้อมูลตั๋วไปด้วย
      });
  
      // ตรวจสอบสถานะ response
      if (response.ok) {
        return { success: true };
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      // ตรวจสอบว่า error เป็น instance ของ Error หรือไม่
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { success: false, message: errorMessage };
    }
  };
  