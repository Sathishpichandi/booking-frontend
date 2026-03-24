import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { getAllTrains, searchTrains, bookTrain } from "../api/trainService";
import TrainBookingModal from "../components/TrainBookingModal";
import { toast } from "react-toastify";

function UserTrains() {

  const navigate = useNavigate();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);

  useEffect(() => {
    loadAllTrains();
  }, []);

  const loadAllTrains = async () => {
    try {
      const res = await getAllTrains();
      setTrains(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load trains");
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await searchTrains(source, destination);
      setTrains(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // OPEN MODAL
  const handleOpenModal = (train) => {
    setSelectedTrain(train);
  };

  // CONFIRM BOOKING
  const confirmBooking = async (classType) => {

    try {

      const res = await bookTrain(selectedTrain.id, classType);

      const bookingId = res.data.id;

      let price = 0;

      // ✅ Correct classType matching
      switch (classType) {

        case "SL":
          price = selectedTrain.slPrice;
          break;

        case "THREE_A":
          price = selectedTrain.threeAPrice;
          break;

        case "TWO_A":
          price = selectedTrain.twoAPrice;
          break;

        default:
          price = 0;

      }

      toast.success("Seat reserved. Please complete payment.");

      setSelectedTrain(null);

      navigate(`/payment?bookingId=${bookingId}&amount=${price}&type=TRAIN`);

    } catch (err) {

      console.error(err);
      toast.error("Booking Failed ❌");

    }

  };

  return (
    <MainLayout>

      <div className="text-white">

        <h1 className="text-4xl font-bold mb-6">🚆 Train Booking</h1>

        {/* SEARCH BAR */}
        <div className="flex gap-4 mb-10">

          <input
            type="text"
            placeholder="From"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="p-3 rounded bg-slate-900 border border-white/20"
          />

          <input
            type="text"
            placeholder="To"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="p-3 rounded bg-slate-900 border border-white/20"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 px-6 rounded hover:bg-blue-700"
          >
            Search
          </button>

        </div>

        {/* TRAIN CARDS */}
        <div className="grid md:grid-cols-3 gap-8">

          {trains.map((train) => (

            <div
              key={train.id}
              className="bg-white/10 p-6 rounded-xl backdrop-blur-xl border border-white/20"
            >

              <h2 className="text-xl font-bold">{train.trainName}</h2>

              <p className="text-slate-300">
                {train.source} → {train.destination}
              </p>

              <div className="mt-4 text-sm">

                SL ₹{train.slPrice} | Seats: {train.slAvailableSeats}
                <br />

                3A ₹{train.threeAPrice} | Seats: {train.threeAAvailableSeats}
                <br />

                2A ₹{train.twoAPrice} | Seats: {train.twoAAvailableSeats}

              </div>

              <button
                onClick={() => handleOpenModal(train)}
                className="mt-6 w-full bg-purple-600 py-2 rounded-lg hover:bg-purple-700"
              >
                Book Now
              </button>

            </div>

          ))}

        </div>

        {/* BOOKING MODAL */}
        <TrainBookingModal
          train={selectedTrain}
          onClose={() => setSelectedTrain(null)}
          onConfirm={confirmBooking}
        />

      </div>

    </MainLayout>
  );
}

export default UserTrains;