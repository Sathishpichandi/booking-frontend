import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";

function TicketPage() {

  const { bookingId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();   // ✅ navigation added
  const type = searchParams.get("type");

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    loadBooking();
  }, []);

  const loadBooking = async () => {

    try {

      const token = localStorage.getItem("token");

      let url = "";

      if (type === "FLIGHT") url = `/api/bookings/${bookingId}`;
      if (type === "BUS") url = `/api/bus-bookings/${bookingId}`;
      if (type === "TRAIN") url = `/api/train-bookings/${bookingId}`;
      if (type === "HOTEL") url = `/api/hotel-bookings/${bookingId}`;
      if (type === "CAR") url = `/api/car-bookings/${bookingId}`;

      const res = await axios.get(
        `http://localhost:8081${url}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBooking(res.data);

    } catch (err) {
      console.error(err);
    }

  };

  const downloadTicket = async () => {

    const doc = new jsPDF();

    doc.setFillColor(30, 41, 59);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text(`${type} TICKET`, 75, 20);

    doc.setTextColor(0, 0, 0);

    doc.rect(10, 40, 190, 120);

    doc.setFontSize(14);

    let y = 60;

    const addLine = (label, value) => {
      doc.text(`${label} : ${value}`, 20, y);
      y += 12;
    };

    addLine("Booking ID", booking.id);
    addLine("Passenger", booking.user?.name);
    addLine("Email", booking.user?.email);

    if (type === "FLIGHT") {

      const route = `${booking.flight?.source} -> ${booking.flight?.destination}`;

      addLine("PNR", booking.pnr);
      addLine("Route", route);
      addLine("Seat", booking.seatNumber);

    }

    if (type === "BUS") {

      const route = `${booking.bus?.source} -> ${booking.bus?.destination}`;

      addLine("Bus", booking.bus?.operatorName);
      addLine("Route", route);
      addLine("Seat", booking.seatNumber);

    }

    if (type === "TRAIN") {

      const route = `${booking.train?.source} -> ${booking.train?.destination}`;

      addLine("Train", booking.train?.trainName);
      addLine("Route", route);
      addLine("Class", booking.classType);

    }

    if (type === "HOTEL") {

      addLine("Hotel", booking.room?.hotel?.name || "Hotel");
      addLine("Room", booking.room?.roomType);
      addLine("Check-in", booking.checkInDate);
      addLine("Check-out", booking.checkOutDate);

    }

    if (type === "CAR") {

      addLine("Car", booking.car?.brand);
      addLine("Type", booking.car?.carType);

    }

    addLine("Status", booking.status);

    const qrData = `
Booking ID: ${booking.id}
Passenger: ${booking.user?.name}
Service: ${type}
Status: ${booking.status}
`;

    const qr = await QRCode.toDataURL(qrData);

    doc.addImage(qr, "PNG", 150, 55, 40, 40);

    doc.setFontSize(10);
    doc.text("Smart Booking Platform - Digital Ticket", 70, 180);

    doc.save(`${type}_ticket.pdf`);

  };

  if (!booking) return <p className="text-white p-10">Loading...</p>;

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">

      <div className="bg-slate-800 p-10 rounded-xl shadow-xl w-96 text-center">

        <h1 className="text-3xl font-bold mb-6">
          🎫 {type} Ticket
        </h1>

        <p>Booking ID: {booking.id}</p>
        <p>Passenger: {booking.user?.name}</p>
        <p>Email: {booking.user?.email}</p>

        {type === "FLIGHT" && (
          <>
            <p>PNR: {booking.pnr}</p>
            <p>
              Route: {booking.flight?.source} {" → "} {booking.flight?.destination}
            </p>
            <p>Seat: {booking.seatNumber}</p>
          </>
        )}

        {type === "BUS" && (
          <>
            <p>Bus: {booking.bus?.operatorName}</p>
            <p>
              Route: {booking.bus?.source} {" → "} {booking.bus?.destination}
            </p>
            <p>Seat: {booking.seatNumber}</p>
          </>
        )}

        {type === "TRAIN" && (
          <>
            <p>Train: {booking.train?.trainName}</p>
            <p>
              Route: {booking.train?.source} {" → "} {booking.train?.destination}
            </p>
            <p>Class: {booking.classType}</p>
          </>
        )}

        {type === "HOTEL" && (
          <>
            <p>Hotel: {booking.room?.hotel?.name || "Hotel"}</p>
            <p>Room: {booking.room?.roomType}</p>
            <p>Check-in: {booking.checkInDate}</p>
            <p>Check-out: {booking.checkOutDate}</p>
          </>
        )}

        {type === "CAR" && (
          <>
            <p>Car: {booking.car?.brand}</p>
            <p>Type: {booking.car?.carType}</p>
          </>
        )}

        <p className="text-green-400 mb-6">
          Status: {booking.status}
        </p>

        {/* DOWNLOAD BUTTON */}
        <button
          onClick={downloadTicket}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg w-full mb-3"
        >
          Download Ticket PDF
        </button>

        {/* DASHBOARD BUTTON */}
        <button
          onClick={() => navigate("/user")}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg w-full"
        >
          Go To Dashboard
        </button>

      </div>

    </div>

  );
}

export default TicketPage;