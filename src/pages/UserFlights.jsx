import { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import { getAllFlights, searchFlights, bookFlight } from "../api/flightService";
import FlightBookingModal from "../components/FlightBookingModal";
import {toast} from "react-toastify";

function UserFlights() {

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllFlights();
  }, []);

  const loadAllFlights = async () => {
    try {
      setLoading(true);
      const res = await getAllFlights();
      setFlights(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await searchFlights(source, destination);
      setFlights(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching flights");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async (
    flightId,
    seatNumber,
    baggageKg,
    mealOption
  ) => {
    try {

      const res = await bookFlight(
        flightId,
        seatNumber,
        baggageKg,
        mealOption
      );

      const booking = res.data;

      toast.success("Seat reserved. Please complete payment.");

      setSelectedFlight(null);

      // redirect to payment page
     window.location.href = `/payment?bookingId=${booking.bookingId}&amount=${booking.flight.price}&type=FLIGHT`;
    } catch (err) {

      console.error(err);

      if (err.response?.data) {
        toast.warning(err.response.data);
      } else {
        toast.error("Booking failed ❌");
      }
    }
  };
  return (
    <MainLayout>
      <div className="text-white">

        <h1 className="text-4xl font-bold mb-2">
          ✈ Flight Booking
        </h1>

        <p className="text-slate-300 mb-8">
          Find the best flights at affordable prices.
        </p>

        {/* Search */}
        <div className="bg-gradient-to-r from-blue-600/40 to-indigo-600/40
                        p-6 rounded-2xl backdrop-blur-xl mb-12 flex gap-4">

          <input
            type="text"
            placeholder="From"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-slate-900 border border-white/20"
          />

          <input
            type="text"
            placeholder="To"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-slate-900 border border-white/20"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Flight Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {flights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl
                         border border-white/20 shadow-lg hover:scale-105
                         transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-2">
                {flight.airline}
              </h2>

              <p className="text-slate-300 mb-1">
                {flight.source} → {flight.destination}
              </p>

              <p className="text-blue-400 font-bold mt-2">
                ₹ {flight.price}
              </p>

              <p className="text-sm text-slate-400 mt-1">
                Seats: {flight.availableSeats}
              </p>

              <button
                onClick={() => setSelectedFlight(flight)}
                className="mt-6 w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          ))}

        </div>

        {flights.length === 0 && !loading && (
          <p className="text-slate-400 mt-8">No flights available.</p>
        )}

        {/* Modal */}
        <FlightBookingModal
          flight={selectedFlight}
          onClose={() => setSelectedFlight(null)}
          onConfirm={handleConfirmBooking}
        />

      </div>
    </MainLayout>
  );
}

export default UserFlights;