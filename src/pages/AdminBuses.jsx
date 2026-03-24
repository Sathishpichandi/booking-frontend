import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import {
  getAdminBuses,
  addBus,
  updateBus,
  deleteBus
} from "../api/busService";

function AdminBuses() {
  const [buses, setBuses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    busNumber: "",
    operatorName: "",
    source: "",
    destination: "",
    busType: "",
    seatType: "SEATER",
    price: "",
    availableSeats: ""
  });

  // 🔥 Load buses
  const loadBuses = async () => {
    try {
      const res = await getAdminBuses();
      setBuses(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load buses");
    }
  };

  useEffect(() => {
    loadBuses();
  }, []);

  // 🔥 Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 Submit (Add / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateBus(editId, formData);
      } else {
        await addBus(formData);
      }

      resetForm();
      loadBuses();
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  const handleEdit = (bus) => {
    setFormData(bus);
    setEditId(bus.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bus?")) return;

    await deleteBus(id);
    loadBuses();
  };

  const resetForm = () => {
    setFormData({
      busNumber: "",
      operatorName: "",
      source: "",
      destination: "",
      busType: "",
      seatType: "SEATER",
      price: "",
      availableSeats: ""
    });
    setEditId(null);
    setShowForm(false);
  };

  return (

      <div className="text-white">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🚌 Bus Management</h1>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            {showForm ? "Close" : "Add Bus"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 mb-10">

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-3 gap-4"
            >
              <input name="busNumber" placeholder="Bus Number"
                value={formData.busNumber} onChange={handleChange} required
                className="p-3 rounded bg-slate-900 border border-white/20" />

              <input name="operatorName" placeholder="Operator"
                value={formData.operatorName} onChange={handleChange} required
                className="p-3 rounded bg-slate-900 border border-white/20" />

              <input name="source" placeholder="Source"
                value={formData.source} onChange={handleChange} required
                className="p-3 rounded bg-slate-900 border border-white/20" />

              <input name="destination" placeholder="Destination"
                value={formData.destination} onChange={handleChange} required
                className="p-3 rounded bg-slate-900 border border-white/20" />

              <input name="busType" placeholder="Bus Type"
                value={formData.busType} onChange={handleChange}
                className="p-3 rounded bg-slate-900 border border-white/20" />

              <select name="seatType"
                value={formData.seatType}
                onChange={handleChange}
                className="p-3 rounded bg-slate-900 border border-white/20"
              >
                <option value="SEATER">SEATER</option>
                <option value="SLEEPER">SLEEPER</option>
              </select>

              <input type="number" name="price" placeholder="Price"
                value={formData.price} onChange={handleChange} required
                className="p-3 rounded bg-slate-900 border border-white/20" />

              <input type="number" name="availableSeats" placeholder="Seats"
                value={formData.availableSeats} onChange={handleChange} required
                className="p-3 rounded bg-slate-900 border border-white/20" />

              <button
                type="submit"
                className="bg-green-600 py-2 rounded-lg hover:bg-green-700"
              >
                {editId ? "Update Bus" : "Save Bus"}
              </button>

            </form>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-white/20 rounded-xl">
            <thead className="bg-white/10">
              <tr>
                <th className="p-3">Bus</th>
                <th className="p-3">Route</th>
                <th className="p-3">Type</th>
                <th className="p-3">Price</th>
                <th className="p-3">Seats</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {buses.map((bus) => (
                <tr key={bus.id} className="border-t border-white/10">
                  <td className="p-3">
                    {bus.busNumber} <br />
                    <span className="text-sm text-slate-400">
                      {bus.operatorName}
                    </span>
                  </td>

                  <td className="p-3">
                    {bus.source} → {bus.destination}
                  </td>

                  <td className="p-3">
                    {bus.busType} / {bus.seatType}
                  </td>

                  <td className="p-3">₹{bus.price}</td>
                  <td className="p-3">{bus.availableSeats}</td>

                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(bus)}
                      className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(bus.id)}
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

export default AdminBuses;