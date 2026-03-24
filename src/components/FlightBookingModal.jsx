import { useState } from "react";
import { toast } from "react-toastify";
import SeatMap from "./SeatMap";
import axios from "axios";

function FlightBookingModal({ flight, onClose, onConfirm }) {

  const [seatNumber, setSeatNumber] = useState("");
  const [baggageKg, setBaggageKg] = useState(15);
  const [mealOption, setMealOption] = useState("VEG");

  if (!flight) return null;

  const handleConfirm = () => {

    if (!seatNumber) {

      toast.warning("Please select a seat");

      return;
    }

    onConfirm(
      flight.id,
      seatNumber,
      baggageKg,
      mealOption
    );
  };

  return (
<div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
<div className="bg-slate-900 p-8 rounded-2xl w-[850px] border border-white/20 shadow-xl max-h-[90vh] flex flex-col">

        <h2 className="text-2xl font-bold mb-4">
          Book Flight
        </h2>

        <p className="mb-1 text-gray-300">
          {flight.source} → {flight.destination}
        </p>

        <p className="text-blue-400 font-semibold mb-4">
          ₹ {flight.price}
        </p>


        {/* Seat Map */}
    <div className="overflow-y-auto max-h-[420px]">
        <SeatMap
        flightId={flight.id}
          rows={8}
          columns={["A","B","C","D","E","F"]}
          onSelect={(seat) => setSeatNumber(seat)}
        />
        </div>

        {seatNumber && (

          <p className="text-green-400 mb-4">
            Selected Seat: {seatNumber}
          </p>

        )}

        {/* Baggage */}

        <label className="text-sm text-gray-300">
          Baggage (kg)
        </label>

        <input
          type="number"
          value={baggageKg}
          onChange={(e) => setBaggageKg(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-slate-800 border border-white/20"
        />

        {/* Meal */}

        <label className="text-sm text-gray-300">
          Meal
        </label>

        <select
          value={mealOption}
          onChange={(e) => setMealOption(e.target.value)}
          className="w-full p-2 mb-6 rounded bg-slate-800 border border-white/20"
        >
          <option value="VEG">VEG</option>
          <option value="NON_VEG">NON VEG</option>
        </select>

        {/* Buttons */}

        <div className="flex gap-3">

          <button
            onClick={handleConfirm}
            className="flex-1 bg-blue-600 py-2 rounded hover:bg-blue-700"
          >
            Confirm Booking
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-red-600 py-2 rounded hover:bg-red-700"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  );
}

export default FlightBookingModal;