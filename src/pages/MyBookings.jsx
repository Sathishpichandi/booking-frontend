import { useEffect, useState } from "react";
import {
  getMyBookings,
  cancelBooking,
  confirmBooking
} from "../api/userService";
import toast from "react-hot-toast";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await getMyBookings();
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to load bookings");
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id);
      toast.success("Booking Cancelled");
      loadBookings();
    } catch {
      toast.error("Cancel failed");
    }
  };

  const handleConfirm = async (id) => {
    try {
      await confirmBooking(id);
      toast.success("Booking Confirmed");
      loadBookings();
    } catch (err) {
      console.log(err);
      toast.error("Confirm failed");
    }
  };

  return (
    <div className="container">
      <h2>My Bookings</h2>

      {bookings.map((b) => (
        <div key={b.bookingId} className="card">
          <p><strong>PNR:</strong> {b.pnr}</p>
          <p><strong>Status:</strong> {b.status}</p>
          <p>{b.flight.source} → {b.flight.destination}</p>

          <div style={{ marginTop: "10px" }}>
            {b.status === "PAYMENT_SUCCESS" && (
              <button
                onClick={() => handleConfirm(b.bookingId)}
                style={{ marginRight: "10px", background: "green", color: "white" }}
              >
                Confirm
              </button>
            )}

            {b.status !== "CANCELLED" && (
              <button
                onClick={() => handleCancel(b.bookingId)}
                style={{ background: "red", color: "white" }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;