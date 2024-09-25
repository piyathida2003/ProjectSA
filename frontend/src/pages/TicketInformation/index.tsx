import React, { useState, useEffect } from 'react'; 
import { List, Spin, Alert, Card, Typography, Button } from 'antd';
import { useUser } from '../component/UserContext'; // ดึงข้อมูลจาก UserContext
import { GetTicket } from '../../services/https'; // นำเข้าฟังก์ชัน GetTicket
import { PaymentInterface } from '../../interfaces/IPayment';
import { SeatandTypeInterface } from '../../interfaces/ISeatandType';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate

// ประกาศ Interface ของ Ticket
interface TicketInterface {
  Price?: number;
  PurchaseDate?: string;
  Seat?: SeatandTypeInterface; // เปลี่ยนเป็น SeatandTypeInterface
  Payment?: PaymentInterface; // ทำให้เป็น optional
}

const { Text } = Typography;

const TicketHistory: React.FC = () => {
  const { memberID } = useUser(); // ดึง MemberID จาก UserContext
  const [ticketData, setTicketData] = useState<TicketInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // สร้างตัวแปร navigate

  useEffect(() => {
    const fetchTicketData = async () => {
      if (memberID) {
        try {
          const data = await GetTicket(parseInt(memberID)); // แปลง memberID จาก string เป็น number
          if (data && data.data) {
            setTicketData(data.data); // ตั้งค่าจาก data.data
          } else {
            setError('ไม่พบข้อมูลตั๋ว');
          }
        } catch (error) {
          console.error('Error fetching ticket data:', error);
          setError('ไม่สามารถดึงข้อมูลตั๋วได้');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTicketData();
  }, [memberID]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message={error} type="error" style={{ textAlign: 'center', marginTop: '100px' }} />;
  }

  // ฟังก์ชันสำหรับนำทางไปที่ RefundRequest พร้อมข้อมูลตั๋ว
  const handleRefundRequest = (ticket: TicketInterface) => {
    navigate("/refund-request", { state: { ticket } }); // ส่งข้อมูลตั๋วไปใน state
  };

  return (
    <div style={{ padding: '20px' }}>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={Array.isArray(ticketData) ? ticketData : []} // ตรวจสอบให้แน่ใจว่าเป็น array
        renderItem={(item: TicketInterface) => (
          <List.Item>
            <Card style={{ marginBottom: '16px' }}>
              <Text strong>หมายเลขที่นั่ง:</Text> {item.Seat?.SeatNumber || 'ไม่ระบุ'}<br />
              <Text strong>ราคาตั๋ว:</Text> {item.Price} บาท<br />
              <Text strong>วันที่ซื้อ:</Text> {item.PurchaseDate ? new Date(item.PurchaseDate).toLocaleString() : 'ไม่ระบุ'}<br />
              <Text strong>สถานะการชำระเงิน:</Text> {item.Payment?.Status || 'ไม่ระบุ'}<br />
              <Text strong>วิธีการชำระเงิน:</Text> {item.Payment?.PaymentMethod || 'ไม่ระบุ'}<br />
              <Text strong>ยอดเงินรวม:</Text> {item.Payment?.Amount || 0} บาท<br />
              <Text strong>ประเภทที่นั่ง:</Text> 
              {item.Seat?.SeatType ? (
                <>
                  {item.Seat.SeatType.Name || 'ไม่ระบุ'}
                </>
              ) : (
                'ไม่ระบุ'
              )}<br />
              <Text strong>รายละเอียด:</Text>
              {item.Seat?.SeatType ? (
                <>
                  {item.Seat.SeatType.Description || 'ไม่ระบุ'}
                </>
              ) : (
                'ไม่ระบุ'
              )}<br />
              <Button type="primary" onClick={() => handleRefundRequest(item)} style={{ marginTop: '16px' }}>
                ขอคืนเงิน
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TicketHistory; // ส่งออก Component ที่แก้ไขแล้ว
