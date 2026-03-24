import { motion } from "framer-motion";

function BusBookingModal({ bus, onClose, onConfirm }) {

  if (!bus) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-900 p-8 rounded-2xl w-[400px] border border-white/20 shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-white">
          Book Bus
        </h2>

        <p className="text-slate-300 mb-2">
          <strong>{bus.operatorName}</strong>
        </p>

        <p className="text-slate-300 mb-2">
          {bus.source} → {bus.destination}
        </p>

        <p className="text-slate-400 mb-2">
          Type: {bus.busType}
        </p>

        <p className="text-slate-400 mb-4">
          Seat: {bus.seatType}
        </p>

        <p className="text-xl font-semibold mb-6">
          ₹{bus.price}
        </p>

        <button
          onClick={onConfirm}
          className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
        >
          Confirm Booking
        </button>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-600 py-2 rounded-lg hover:bg-red-700"
        >
          Cancel
        </button>

      </motion.div>

    </div>
  );
}

export default BusBookingModal;