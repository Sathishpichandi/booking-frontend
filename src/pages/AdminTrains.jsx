import { useEffect, useState } from "react";
import axios from "axios";


const API = "https://booking-backend-1-mon5.onrender.com/api/admin/trains";

function AdminTrains() {

  const [trains, setTrains] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    trainNumber: "",
    trainName: "",
    source: "",
    destination: "",
    slPrice: "",
    threeAPrice: "",
    twoAPrice: "",
    slAvailableSeats: "",
    threeAAvailableSeats: "",
    twoAAvailableSeats: ""
  });

  // ================= LOAD TRAINS =================
  const loadTrains = async () => {
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrains(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load trains");
    }
  };

  useEffect(() => {
    loadTrains();
  }, []);

  // ================= HANDLE INPUT CHANGE =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ================= ADD / UPDATE TRAIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(API, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      resetForm();
      loadTrains();
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  // ================= EDIT =================
  const handleEdit = (train) => {
    setForm(train);
    setEditId(train.id);
    setShowForm(true);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this train?")) return;

    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadTrains();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ================= RESET =================
  const resetForm = () => {
    setForm({
      trainNumber: "",
      trainName: "",
      source: "",
      destination: "",
      slPrice: "",
      threeAPrice: "",
      twoAPrice: "",
      slAvailableSeats: "",
      threeAAvailableSeats: "",
      twoAAvailableSeats: ""
    });
    setEditId(null);
    setShowForm(false);
  };

  return (

      <div className="text-white">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🚆 Train Management</h1>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            {showForm ? "Close" : "Add Train"}
          </button>
        </div>

        {/* FORM */}
        {showForm && (
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 mb-10">
            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-3 gap-4"
            >

              <input name="trainNumber" placeholder="Train Number"
                value={form.trainNumber}
                onChange={handleChange}
                required
                className="p-3 rounded bg-slate-900 border border-white/20" />

              <input name="trainName" placeholder="Train Name"
                value={form.trainName}
                onChange={handleChange}
                required
                className="p-3 rounded bg-slate-900 border border-white/20" />

              <input name="source" placeholder="Source"
                value={form.source}
                onChange={handleChange}
                required
                className="p-3 rounded bg-slate-900 border border-white/20" />

              <input name="destination" placeholder="Destination"
                value={form.destination}
                onChange={handleChange}
                required
                className="p-3 rounded bg-slate-900 border border-white/20" />

              <input type="number" name="slPrice" placeholder="SL Price"
                value={form.slPrice}
                onChange={handleChange}
                required
                className="p-3 rounded bg-slate-900 border border-white/20" />

              <input type="number" name="threeAPrice" placeholder="3A Price"
                value={form.threeAPrice}
                onChange={handleChange}
                required
                className="p-3 rounded bg-slate-900 border border-white/20" />

              <input type="number" name="twoAPrice" placeholder="2A Price"
                value={form.twoAPrice}
                onChange={handleChange}
                required
                className="p-3 rounded bg-slate-900 border border-white/20" />

              <input type="number" name="slAvailableSeats" placeholder="SL Seats"
                value={form.slAvailableSeats}
                onChange={handleChange}
                required
                className="p-3 rounded bg-slate-900 border border-white/20" />

              <input type="number" name="threeAAvailableSeats" placeholder="3A Seats"
                value={form.threeAAvailableSeats}
                onChange={handleChange}
                required
                className="p-3 rounded bg-slate-900 border border-white/20" />

              <input type="number" name="twoAAvailableSeats" placeholder="2A Seats"
                value={form.twoAAvailableSeats}
                onChange={handleChange}
                required
                className="p-3 rounded bg-slate-900 border border-white/20" />

              <button
                type="submit"
                className="bg-green-600 py-2 rounded-lg hover:bg-green-700"
              >
                {editId ? "Update Train" : "Save Train"}
              </button>

            </form>
          </div>
        )}

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-white/20 rounded-xl">
            <thead className="bg-white/10">
              <tr>
                <th className="p-3">Train</th>
                <th className="p-3">Route</th>
                <th className="p-3">SL</th>
                <th className="p-3">3A</th>
                <th className="p-3">2A</th>
                <th className="p-3">Seats</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {trains.map((t) => (
                <tr key={t.id} className="border-t border-white/10">

                  <td className="p-3">
                    {t.trainNumber} <br />
                    <span className="text-sm text-slate-400">
                      {t.trainName}
                    </span>
                  </td>

                  <td className="p-3">
                    {t.source} → {t.destination}
                  </td>

                  <td className="p-3">₹{t.slPrice}</td>
                  <td className="p-3">₹{t.threeAPrice}</td>
                  <td className="p-3">₹{t.twoAPrice}</td>

                  <td className="p-3">
                    SL:{t.slAvailableSeats} |
                    3A:{t.threeAAvailableSeats} |
                    2A:{t.twoAAvailableSeats}
                  </td>

                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(t)}
                      className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(t.id)}
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

export default AdminTrains;