import { useEffect, useState } from "react";
import axios from "axios";

const HOTEL_API = "http://localhost:8081/api/admin/hotels";

function AdminHotels() {

  const [hotels, setHotels] = useState([]);
  const [showHotelForm, setShowHotelForm] = useState(false);
  const [showRoomForm, setShowRoomForm] = useState(null);

  const [hotelForm, setHotelForm] = useState({
    name: "",
    city: "",
    address: "",
    rating: ""
  });

  const [roomForm, setRoomForm] = useState({
    roomNumber: "",
    pricePerNight: "",
    capacity: "",
    availableRooms: "",
    roomType: "STANDARD"
  });

  const token = localStorage.getItem("token");

  // ================= LOAD HOTELS =================
  const loadHotels = async () => {
    const res = await axios.get(HOTEL_API, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setHotels(res.data);
  };

  useEffect(() => {
    loadHotels();
  }, []);

  // ================= ADD HOTEL =================
  const handleHotelSubmit = async (e) => {
    e.preventDefault();

    await axios.post(HOTEL_API, hotelForm, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setHotelForm({
      name: "",
      city: "",
      address: "",
      rating: ""
    });

    setShowHotelForm(false);

    loadHotels();
  };

  // ================= ADD ROOM =================
  const handleRoomSubmit = async (hotelId) => {

    await axios.post(
      `${HOTEL_API}/${hotelId}/rooms`,
      roomForm,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setRoomForm({
      roomNumber: "",
      pricePerNight: "",
      capacity: "",
      availableRooms: "",
      roomType: "STANDARD"
    });

    setShowRoomForm(null);

    loadHotels();
  };

  return (

    <div className="text-white max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          🏨 Hotel Management
        </h1>

        <button
          onClick={() => setShowHotelForm(!showHotelForm)}
          className="bg-purple-600 px-5 py-2 rounded-lg hover:bg-purple-700"
        >
          {showHotelForm ? "Close" : "Add Hotel"}
        </button>
      </div>

      {/* ================= HOTEL FORM ================= */}
      {showHotelForm && (

        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 mb-10">

          <form
            onSubmit={handleHotelSubmit}
            className="grid md:grid-cols-4 gap-4"
          >

            <input
              placeholder="Hotel Name"
              value={hotelForm.name}
              onChange={(e) =>
                setHotelForm({ ...hotelForm, name: e.target.value })
              }
              required
              className="p-3 rounded bg-slate-900 border border-white/20"
            />

            <input
              placeholder="City"
              value={hotelForm.city}
              onChange={(e) =>
                setHotelForm({ ...hotelForm, city: e.target.value })
              }
              required
              className="p-3 rounded bg-slate-900 border border-white/20"
            />

            <input
              placeholder="Address"
              value={hotelForm.address}
              onChange={(e) =>
                setHotelForm({ ...hotelForm, address: e.target.value })
              }
              className="p-3 rounded bg-slate-900 border border-white/20"
            />

            <input
              type="number"
              placeholder="Rating"
              value={hotelForm.rating}
              onChange={(e) =>
                setHotelForm({ ...hotelForm, rating: e.target.value })
              }
              className="p-3 rounded bg-slate-900 border border-white/20"
            />

            <button className="bg-green-600 py-2 rounded-lg hover:bg-green-700">
              Save Hotel
            </button>

          </form>

        </div>

      )}

      {/* ================= HOTEL TABLE ================= */}

      <div className="overflow-x-auto">

        <table className="w-full text-left border border-white/20 rounded-xl">

          <thead className="bg-white/10">
            <tr>
              <th className="p-3">Hotel</th>
              <th className="p-3">City</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Rooms</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>

            {hotels.map((hotel) => (

              <tr key={hotel.id} className="border-t border-white/10">

                <td className="p-3 font-semibold">{hotel.name}</td>

                <td className="p-3">{hotel.city}</td>

                <td className="p-3">⭐ {hotel.rating}</td>

                <td className="p-3">

                  {hotel.rooms?.map((room) => (

                    <div key={room.id} className="text-sm text-slate-300">

                      {room.roomType} • ₹{room.pricePerNight} • {room.availableRooms} rooms

                    </div>

                  ))}

                </td>

                <td className="p-3">

                  <button
                    onClick={() => setShowRoomForm(hotel.id)}
                    className="bg-purple-600 px-3 py-1 rounded hover:bg-purple-700"
                  >
                    Add Room
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* ================= ROOM FORM ================= */}

      {showRoomForm && (

        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 mt-10">

          <h2 className="text-xl font-semibold mb-4">
            Add Room
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <input
              placeholder="Room Number"
              value={roomForm.roomNumber}
              onChange={(e) =>
                setRoomForm({ ...roomForm, roomNumber: e.target.value })
              }
              className="p-3 rounded bg-slate-900 border border-white/20"
            />

            <input
              type="number"
              placeholder="Price Per Night"
              value={roomForm.pricePerNight}
              onChange={(e) =>
                setRoomForm({ ...roomForm, pricePerNight: e.target.value })
              }
              className="p-3 rounded bg-slate-900 border border-white/20"
            />

            <input
              type="number"
              placeholder="Capacity"
              value={roomForm.capacity}
              onChange={(e) =>
                setRoomForm({ ...roomForm, capacity: e.target.value })
              }
              className="p-3 rounded bg-slate-900 border border-white/20"
            />

            <input
              type="number"
              placeholder="Available Rooms"
              value={roomForm.availableRooms}
              onChange={(e) =>
                setRoomForm({ ...roomForm, availableRooms: e.target.value })
              }
              className="p-3 rounded bg-slate-900 border border-white/20"
            />

            <select
              value={roomForm.roomType}
              onChange={(e) =>
                setRoomForm({ ...roomForm, roomType: e.target.value })
              }
              className="p-3 rounded bg-slate-900 border border-white/20"
            >
              {/*<option value="STANDARD">STANDARD</option>*/}
              <option value="DELUXE">DELUXE</option>
              <option value="SUITE">SUITE</option>
            </select>

            <button
              onClick={() => handleRoomSubmit(showRoomForm)}
              className="bg-green-600 py-2 rounded hover:bg-green-700"
            >
              Save Room
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default AdminHotels;