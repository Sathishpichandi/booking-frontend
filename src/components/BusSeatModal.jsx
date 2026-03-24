import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function BusSeatModal({ bus, onClose, onConfirm }) {

  const rows = 10;
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {

    if (!bus) return;

    const token = localStorage.getItem("token");

    axios.get(
      `https://booking-backend-1-mon5.onrender.com/api/bus-bookings/bus/${bus.id}/seats`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {
      setBookedSeats(res.data || []);
    })
    .catch(err => {
      console.error("Seat fetch error", err);
    });

  }, [bus]);

  if (!bus) return null;

  const handleSeatClick = (seat) => {

    if (bookedSeats.includes(seat)) {
      toast.error("Seat already booked");
      return;
    }

    setSelectedSeat(seat);
  };

  const handleConfirm = () => {

    if (!selectedSeat) {
      toast.warning("Please select a seat");
      return;
    }

    onConfirm(bus, selectedSeat);
  };

  const getSeatStyle = (seat) => {

    if (bookedSeats.includes(seat))
      return "bg-red-500 cursor-not-allowed";

    if (selectedSeat === seat)
      return "bg-green-500";

    return "bg-slate-700 hover:bg-blue-500 cursor-pointer";
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">

      <div className="bg-slate-900 p-8 rounded-xl w-[700px] text-white border border-white/20">

        <h2 className="text-2xl font-bold text-center mb-6">
          🚌 Select Your Seat
        </h2>

        <div className="flex flex-col items-center gap-4">

          {[...Array(rows)].map((_, i) => {

            const row = i + 1;

            return (

              <div key={row} className="flex items-center gap-6">

                <div
                  onClick={() => handleSeatClick(`A${row}`)}
                  className={`w-14 h-10 rounded flex items-center justify-center ${getSeatStyle(`A${row}`)}`}
                >
                  A{row}
                </div>

                <div
                  onClick={() => handleSeatClick(`B${row}`)}
                  className={`w-14 h-10 rounded flex items-center justify-center ${getSeatStyle(`B${row}`)}`}
                >
                  B{row}
                </div>

                <div className="w-16"></div>

                <div
                  onClick={() => handleSeatClick(`C${row}`)}
                  className={`w-14 h-10 rounded flex items-center justify-center ${getSeatStyle(`C${row}`)}`}
                >
                  C{row}
                </div>

                <div
                  onClick={() => handleSeatClick(`D${row}`)}
                  className={`w-14 h-10 rounded flex items-center justify-center ${getSeatStyle(`D${row}`)}`}
                >
                  D{row}
                </div>

              </div>

            );

          })}

        </div>

        <div className="flex justify-center gap-8 mt-8 text-sm">

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-700"></div>
            Available
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500"></div>
            Selected
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500"></div>
            Booked
          </div>

        </div>

        <div className="flex justify-between mt-8">

          <button
            onClick={onClose}
            className="bg-red-600 px-6 py-2 rounded hover:bg-red-700"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
          >
            Confirm Booking
          </button>

        </div>

      </div>

    </div>
  );
}

export default BusSeatModal;