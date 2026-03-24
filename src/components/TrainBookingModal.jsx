import { motion } from "framer-motion";

function TrainBookingModal({ train, onClose, onConfirm }) {

  if (!train) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-900 p-8 rounded-2xl w-[400px] border border-white/20 shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-white">
          Book {train.trainName}
        </h2>

        <p className="text-slate-300 mb-6">
          {train.source} → {train.destination}
        </p>

        <div className="space-y-3">

          <button
            onClick={() => onConfirm("SL")}
            className="w-full bg-purple-600 py-2 rounded-lg hover:bg-purple-700"
          >
            Book SL ₹{train.slPrice}
          </button>

          <button
            onClick={() => onConfirm("THREE_A")}
            className="w-full bg-green-600 py-2 rounded-lg hover:bg-green-700"
          >
            Book 3A ₹{train.threeAPrice}
          </button>

          <button
            onClick={() => onConfirm("TWO_A")}
            className="w-full bg-yellow-600 py-2 rounded-lg hover:bg-yellow-700"
          >
            Book 2A ₹{train.twoAPrice}
          </button>

        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-red-600 py-2 rounded-lg hover:bg-red-700"
        >
          Cancel
        </button>
      </motion.div>

    </div>
  );
}

export default TrainBookingModal;