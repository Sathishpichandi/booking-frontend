import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function HotelBookingModal({ room, onClose, onConfirm }) {

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  if (!room) return null;

  const handleConfirm = () => {

    if (!checkIn || !checkOut) {
      toast.warning("Please select check-in and check-out dates");
      return;
    }

    if (checkOut <= checkIn) {
      toast.warning("Check-out must be after check-in");
      return;
    }

    onConfirm(room.id, checkIn, checkOut);

  };

  return (

    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-900 p-8 rounded-2xl w-[400px] border border-white/20 text-white"
      >

        <h2 className="text-2xl font-bold mb-4">
          {room.roomType} Room
        </h2>

        <p className="text-slate-400 mb-4">
          ₹{room.pricePerNight} / night
        </p>

        {/* Check-in */}

        <label className="text-sm text-slate-300">
          Check-in Date
        </label>

        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-slate-800 border border-white/20"
        />

        {/* Check-out */}

        <label className="text-sm text-slate-300">
          Check-out Date
        </label>

        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-slate-800 border border-white/20"
        />

        {/* Buttons */}

        <button
          onClick={handleConfirm}
          className="w-full bg-purple-600 py-2 rounded-lg hover:bg-purple-700"
        >
          Confirm Booking
        </button>

        <button
          onClick={onClose}
          className="mt-3 w-full bg-red-600 py-2 rounded-lg hover:bg-red-700"
        >
          Cancel
        </button>

      </motion.div>

    </div>

  );
}

export default HotelBookingModal;