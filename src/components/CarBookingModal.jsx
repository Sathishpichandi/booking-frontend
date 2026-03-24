import { motion } from "framer-motion";

function CarBookingModal({ car, onClose, onConfirm }) {

  if (!car) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-900 p-8 rounded-2xl w-[400px] border border-white/20 shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-white">
          Book {car.carName}
        </h2>

        <p className="text-slate-300 mb-2">
          {car.source} → {car.destination}
        </p>

        <p className="text-blue-400 font-bold mb-6">
          ₹{car.price}
        </p>

        <button
          onClick={onConfirm}
          className="w-full bg-green-600 py-2 rounded-lg hover:bg-green-700"
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

export default CarBookingModal;