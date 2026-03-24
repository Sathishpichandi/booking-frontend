import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import BusSeatModal from "../components/BusSeatModal";
import { getAllBuses, searchBuses, bookBus } from "../api/busService";
import { toast } from "react-toastify";

function UserBuses() {

  const navigate = useNavigate();

  const [buses, setBuses] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    loadAllBuses();
  }, []);

  const loadAllBuses = async () => {

    try {

      setLoading(true);

      const res = await getAllBuses();

      setBuses(res.data);

    } catch (err) {

      console.error(err);

      toast.error("Failed to load buses");

    } finally {

      setLoading(false);

    }

  };

  const handleSearch = async () => {

    try {

      setLoading(true);

      const res = await searchBuses(source, destination);

      setBuses(res.data);

    } catch (err) {

      toast.error("Search failed");

    } finally {

      setLoading(false);

    }

  };

  const confirmBooking = async (bus, seatNumber) => {

    try {

      const res = await bookBus(bus.id, seatNumber);

      console.log(res.data);

      const bookingId = res.data.id;

      toast.success("Seat reserved. Complete payment.");

      setSelectedBus(null);

      navigate(`/payment?bookingId=${bookingId}&amount=${bus.price}&type=BUS`);

    } catch (err) {

      console.error(err);

      toast.error("Booking failed ❌");

    }

  };

  return (

    <MainLayout>

      <div className="text-white">

        <h1 className="text-4xl font-bold mb-2">
          🚌 Bus Booking
        </h1>

        <p className="text-slate-300 mb-8">
          Travel comfortably across cities.
        </p>

        {/* Search */}

        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl mb-10 flex gap-4">

          <input
            type="text"
            placeholder="From"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="flex-1 p-3 rounded bg-slate-900 border border-white/20"
          />

          <input
            type="text"
            placeholder="To"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-1 p-3 rounded bg-slate-900 border border-white/20"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 px-6 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>

        </div>

        {/* Bus Cards */}

        <div className="grid md:grid-cols-3 gap-8">

          {buses.map((bus) => (

            <div
              key={bus.id}
              className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl
                         border border-white/20 shadow-lg
                         transition duration-300
                         hover:scale-105 hover:shadow-blue-500/50
                         hover:border-blue-400"
            >

              <h2 className="text-xl font-semibold mb-2">
                {bus.operatorName}
              </h2>

              <p className="text-slate-300">
                {bus.source} → {bus.destination}
              </p>

              <div className="mt-4 text-sm space-y-1">

                <div>Bus No: {bus.busNumber}</div>

                <div>Type: {bus.busType}</div>

                <div>Seat Type: {bus.seatType}</div>

                <div className="text-blue-400 font-bold">
                  ₹ {bus.price}
                </div>

                <div>
                  Seats Available: {bus.availableSeats}
                </div>

              </div>

              <button
                onClick={() => setSelectedBus(bus)}
                disabled={bus.availableSeats <= 0}
                className="mt-6 w-full bg-green-600 py-2 rounded-lg
                           hover:bg-green-700 disabled:bg-gray-600"
              >
                {bus.availableSeats > 0 ? "Book Now" : "Sold Out"}
              </button>

            </div>

          ))}

        </div>

        {buses.length === 0 && !loading && (

          <p className="text-slate-400 mt-10">
            No buses available.
          </p>

        )}

      </div>

      {/* Seat Modal */}

      <BusSeatModal
        bus={selectedBus}
        onClose={() => setSelectedBus(null)}
        onConfirm={confirmBooking}
      />

    </MainLayout>

  );
}

export default UserBuses;