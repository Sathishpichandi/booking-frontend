import { useState } from "react";
import { createBooking } from "../api/userService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function BookingModal({ flight, onClose }) {
  const navigate = useNavigate();

  const [seatNumber, setSeatNumber] = useState("");
  const [baggageKg, setBaggageKg] = useState(15);
  const [mealOption, setMealOption] = useState("VEG");
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!seatNumber) {
      toast.error("Please enter seat number");
      return;
    }

    try {
      setLoading(true);

      const res = await createBooking({
        flight: { id: flight.id },
        seatNumber: seatNumber,
        baggageKg: baggageKg,
        mealOption: mealOption,
      });

      const bookingId = res.data.bookingId;

      toast.success("Booking Created! Proceed to Payment 💳");

      onClose();

      navigate(`/payment/${bookingId}`);

    } catch (error) {
      if (error.response?.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Booking Failed ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>✈ Book Flight</h2>

        <p>
          <strong>{flight.source}</strong> →{" "}
          <strong>{flight.destination}</strong>
        </p>

        <p>Price: ₹{flight.price}</p>
        <p>Available Seats: {flight.availableSeats}</p>

        <input
          type="text"
          placeholder="Seat Number (Ex: A1)"
          value={seatNumber}
          onChange={(e) => setSeatNumber(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Baggage (kg)"
          value={baggageKg}
          onChange={(e) => setBaggageKg(Number(e.target.value))}
          style={styles.input}
        />

        <select
          value={mealOption}
          onChange={(e) => setMealOption(e.target.value)}
          style={styles.input}
        >
          <option value="VEG">VEG</option>
          <option value="NON_VEG">NON VEG</option>
          <option value="NO_MEAL">NO MEAL</option>
        </select>

        <button
          onClick={handleBooking}
          disabled={loading}
          style={styles.primaryBtn}
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>

        <button onClick={onClose} style={styles.cancelBtn}>
          Cancel
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(6px)",
    zIndex: 999,
  },
  modal: {
    background: "linear-gradient(145deg, #1e293b, #0f172a)",
    padding: "35px",
    borderRadius: "15px",
    width: "380px",
    color: "white",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },
  primaryBtn: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    cursor: "pointer",
  },
  cancelBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
  },
};

export default BookingModal;