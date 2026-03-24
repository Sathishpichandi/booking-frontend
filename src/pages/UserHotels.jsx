import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { toast } from "react-toastify";

import {
  getAllHotels,
  searchHotels,
  getHotelRooms,
  bookRoom
} from "../api/hotelService";

import HotelBookingModal from "../components/HotelBookingModal";

function UserHotels() {

  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    loadHotels();
  }, []);

  // Load all hotels
  const loadHotels = async () => {

    try {

      const res = await getAllHotels();

      setHotels(res.data);

    } catch (err) {

      console.error(err);
      toast.error("Failed to load hotels");

    }

  };

  // Search hotels
  const handleSearch = async () => {

    try {

      const res = await searchHotels(city);

      setHotels(res.data);

    } catch (err) {

      toast.error("Search failed");

    }

  };

  // View hotel rooms
  const handleViewRooms = async (hotel) => {

    try {

      const res = await getHotelRooms(hotel.id);

      setRooms(res.data);

      setSelectedHotel(hotel);

    } catch (err) {

      toast.error("Failed to load rooms");

    }

  };

  // Book room → redirect to payment
  const handleBookRoom = async (roomId, checkIn, checkOut) => {

    try {

      const res = await bookRoom(roomId, checkIn, checkOut);

      const bookingId = res.data.id;

      toast.success("Room reserved. Complete payment 🏨");

      setSelectedRoom(null);

      navigate(
        `/payment?bookingId=${bookingId}&amount=${selectedRoom.pricePerNight}&type=HOTEL`
      );

    } catch (err) {

      console.error(err);

      toast.error("Booking failed ❌");

    }

  };

  return (

    <MainLayout>

      <div className="text-white">

        <h1 className="text-4xl font-bold mb-2">
          Hotel Booking 🏨
        </h1>

        {/* Search */}

        <div className="flex gap-4 mb-8">

          <input
            type="text"
            placeholder="Search by City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 rounded bg-slate-900 border border-white/20"
          />

          <button
            onClick={handleSearch}
            className="bg-purple-600 px-6 rounded-lg hover:bg-purple-700"
          >
            Search
          </button>

        </div>

        {/* Hotels */}

        <div className="grid md:grid-cols-3 gap-8">

          {hotels.map((hotel) => (

            <div
              key={hotel.id}
              className="bg-white/10 p-6 rounded-2xl border border-white/20 hover:scale-105 transition"
            >

              <h2 className="text-xl font-semibold">
                {hotel.name}
              </h2>

              <p className="text-slate-400">
                {hotel.city}
              </p>

              <p className="text-yellow-400">
                ⭐ {hotel.rating}
              </p>

              <button
                onClick={() => handleViewRooms(hotel)}
                className="mt-4 w-full bg-purple-600 py-2 rounded-lg hover:bg-purple-700"
              >
                View Rooms
              </button>

            </div>

          ))}

        </div>

        {/* Rooms */}

        {selectedHotel && (

          <div className="mt-12">

            <h2 className="text-2xl font-bold mb-6">
              Rooms in {selectedHotel.name}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              {rooms.map((room) => (

                <div
                  key={room.id}
                  className="bg-white/10 p-5 rounded-xl border border-white/20"
                >

                  <h3 className="font-semibold">
                    {room.roomType}
                  </h3>

                  <p>
                    ₹ {room.pricePerNight} / night
                  </p>

                  <p>
                    Available: {room.availableRooms}
                  </p>

                  <button
                    onClick={() => setSelectedRoom(room)}
                    className="mt-4 w-full bg-purple-600 py-2 rounded-lg hover:bg-purple-700"
                  >
                    Book Room
                  </button>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* Booking Modal */}

        <HotelBookingModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onConfirm={handleBookRoom}
        />

      </div>

    </MainLayout>

  );

}

export default UserHotels;