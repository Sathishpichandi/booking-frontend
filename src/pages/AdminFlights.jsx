import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import {
  getAdminFlights,
  addFlight,
  updateFlight,
  deleteFlight
} from "../api/flightService";

function AdminFlights() {

  const [flights, setFlights] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    departureDate: "",
    flightType: "ECONOMY",
    price: "",
    availableSeats: ""
  });

  // 🔥 Load Flights
  const loadFlights = async () => {
    try {
      const res = await getAdminFlights();
      setFlights(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load flights");
    }
  };

  useEffect(() => {
    loadFlights();
  }, []);

  // 🔥 Handle Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateFlight(editId, formData);
      } else {
        await addFlight(formData);
      }

      resetForm();
      loadFlights();
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  const handleEdit = (flight) => {
    setFormData({
      source: flight.source,
      destination: flight.destination,
      departureDate: flight.departureDate,
      flightType: flight.flightType,
      price: flight.price,
      availableSeats: flight.availableSeats
    });

    setEditId(flight.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this flight?")) return;

    await deleteFlight(id);
    loadFlights();
  };

  const resetForm = () => {
    setFormData({
      source: "",
      destination: "",
      departureDate: "",
      flightType: "ECONOMY",
      price: "",
      availableSeats: ""
    });
    setEditId(null);
    setShowForm(false);
  };

  return (

      <div className="text-white">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">✈ Flight Management</h1>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            {showForm ? "Close" : "Add Flight"}
          </button>
        </div>

        {/* FORM */}
        {showForm && (
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 mb-10">

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-3 gap-4"
            >

              <input
                name="source"
                placeholder="Source"
                value={formData.source}
                onChange={handleChange}
                required
                className="p-3 rounded bg-slate-900 border border-white/20"
              />

              <input
                name="destination"
                placeholder="Destination"
                value={formData.destination}
                onChange={handleChange}
                required
                className="p-3 rounded bg-slate-900 border border-white/20"
              />

              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                required
                className="p-3 rounded bg-slate-900 border border-white/20"
              />

              <select
                name="flightType"
                value={formData.flightType}
                onChange={handleChange}
                className="p-3 rounded bg-slate-900 border border-white/20"
              >
                <option value="ECONOMY">ECONOMY</option>
                <option value="FIRST_CLASS">FIRST_CLASS</option>
              </select>

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
                className="p-3 rounded bg-slate-900 border border-white/20"
              />

              <input
                type="number"
                name="availableSeats"
                placeholder="Seats"
                value={formData.availableSeats}
                onChange={handleChange}
                required
                className="p-3 rounded bg-slate-900 border border-white/20"
              />

              <button
                type="submit"
                className="bg-green-600 py-2 rounded-lg hover:bg-green-700"
              >
                {editId ? "Update Flight" : "Save Flight"}
              </button>

            </form>
          </div>
        )}

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-white/20 rounded-xl">
            <thead className="bg-white/10">
              <tr>
                <th className="p-3">Route</th>
                <th className="p-3">Type</th>
                <th className="p-3">Departure</th>
                <th className="p-3">Price</th>
                <th className="p-3">Seats</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {flights.map((flight) => (
                <tr key={flight.id} className="border-t border-white/10">

                  <td className="p-3">
                    {flight.source} → {flight.destination}
                  </td>

                  <td className="p-3">
                    {flight.flightType}
                  </td>

                  <td className="p-3">
                    {flight.departureDate}
                  </td>

                  <td className="p-3">
                    ₹{flight.price}
                  </td>

                  <td className="p-3">
                    {flight.availableSeats}
                  </td>

                  <td className="p-3 space-x-2">

                    <button
                      onClick={() => handleEdit(flight)}
                      className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(flight.id)}
                      className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

  );
}

export default AdminFlights;