import { useEffect, useState } from "react";
import axios from "axios";

function SeatMap({ flightId, rows = 8, columns = ["A","B","C","D","E","F"], onSelect }) {

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    loadBookedSeats();
  }, [flightId]);

  const loadBookedSeats = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://https://booking-backend-1-mon5.onrender.com/api/bookings/seats/${flightId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBookedSeats(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  const handleSeatClick = (seat) => {

    if (bookedSeats.includes(seat)) return;

    setSelectedSeat(seat);
    onSelect(seat);
  };

  return (

    <div className="flex flex-col items-center mt-6">

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-gray-300 font-semibold text-sm">
          ✈ Aircraft Seat Layout
        </h3>
        <p className="text-xs text-gray-500">
          Window • Middle • Aisle
        </p>
      </div>

      {/* Column Labels */}
      <div className="flex gap-8 text-xs text-gray-400 mb-2">

        <div className="flex gap-2">
          <div className="w-12 text-center">A</div>
          <div className="w-12 text-center">B</div>
          <div className="w-12 text-center">C</div>
        </div>

        <div className="flex gap-2">
          <div className="w-12 text-center">D</div>
          <div className="w-12 text-center">E</div>
          <div className="w-12 text-center">F</div>
        </div>

      </div>

      {/* Seat Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => {

        const row = rowIndex + 1;

        return (

          <div key={row} className="flex items-center gap-6 mb-3">

            {/* Row number */}
            <div className="text-xs text-gray-400 w-6">
              {row}
            </div>

            {/* Left side seats */}
            <div className="flex gap-2">

              {columns.slice(0,3).map(col => {

                const seat = `${col}${row}`;
                const isBooked = bookedSeats.includes(seat);
                const isSelected = selectedSeat === seat;

                let color = "bg-slate-700 hover:bg-blue-500";

                if (isBooked) color = "bg-red-600 cursor-not-allowed";
                if (isSelected) color = "bg-green-500";

                return (
                  <div
                    key={seat}
                    onClick={() => handleSeatClick(seat)}
                    className={`w-12 h-12 flex items-center justify-center rounded text-sm cursor-pointer transition ${color}`}
                  >
                    {seat}
                  </div>
                );

              })}

            </div>

            {/* Aisle */}
            <div className="w-6"></div>

            {/* Right side seats */}
            <div className="flex gap-2">

              {columns.slice(3).map(col => {

                const seat = `${col}${row}`;
                const isBooked = bookedSeats.includes(seat);
                const isSelected = selectedSeat === seat;

                let color = "bg-slate-700 hover:bg-blue-500";

                if (isBooked) color = "bg-red-600 cursor-not-allowed";
                if (isSelected) color = "bg-green-500";

                return (
                  <div
                    key={seat}
                    onClick={() => handleSeatClick(seat)}
                    className={`w-12 h-12 flex items-center justify-center rounded text-sm cursor-pointer transition ${color}`}
                  >
                    {seat}
                  </div>
                );

              })}

            </div>

          </div>

        );

      })}

      {/* Legend */}
      <div className="flex gap-6 mt-5 text-xs text-gray-300">

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-700 rounded"></div>
          Available
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          Selected
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600 rounded"></div>
          Booked
        </div>

      </div>

    </div>

  );
}

export default SeatMap;