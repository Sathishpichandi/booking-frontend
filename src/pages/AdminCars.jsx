import { useEffect, useState } from "react";

import {
  getAdminCars,
  addCar,
  updateCar,
  deleteCar
} from "../api/carService";

function AdminCars() {
  const [cars, setCars] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    brand: "",
    city: "",
    carType: "SEDAN",
    pricePerDay: "",
    availableCars: ""
  });

  // 🔥 Load cars
  const loadCars = async () => {
    try {
      const res = await getAdminCars();
      setCars(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load cars");
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  // 🔥 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 Submit (Add / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateCar(editId, formData);
      } else {
        await addCar(formData);
      }

      resetForm();
      loadCars();
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  const handleEdit = (car) => {
    setFormData(car);
    setEditId(car.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this car?")) return;

    await deleteCar(id);
    loadCars();
  };

  const resetForm = () => {
    setFormData({
      brand: "",
      city: "",
      carType: "SEDAN",
      pricePerDay: "",
      availableCars: ""
    });
    setEditId(null);
    setShowForm(false);
  };

  return (

      <div className="text-white">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🚗 Car Management</h1>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-purple-600 px-5 py-2 rounded-lg hover:bg-purple-700"
          >
            {showForm ? "Close" : "Add Car"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 mb-10">

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-3 gap-4"
            >
              <input
                name="brand"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="p-3 rounded bg-slate-900 border border-white/20"
              />

              <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="p-3 rounded bg-slate-900 border border-white/20"
              />

              <select
                name="carType"
                value={formData.carType}
                onChange={handleChange}
                className="p-3 rounded bg-slate-900 border border-white/20"
              >
                <option value="SEDAN">SEDAN</option>
                <option value="SUV">SUV</option>
                <option value="MPV">MPV</option>
                <option value="LUXURY">LUXURY</option>
              </select>

              <input
                type="number"
                name="pricePerDay"
                placeholder="Price Per Day"
                value={formData.pricePerDay}
                onChange={handleChange}
                required
                className="p-3 rounded bg-slate-900 border border-white/20"
              />

              <input
                type="number"
                name="availableCars"
                placeholder="Available Cars"
                value={formData.availableCars}
                onChange={handleChange}
                required
                className="p-3 rounded bg-slate-900 border border-white/20"
              />

              <button
                type="submit"
                className="bg-green-600 py-2 rounded-lg hover:bg-green-700"
              >
                {editId ? "Update Car" : "Save Car"}
              </button>

            </form>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-white/20 rounded-xl">
            <thead className="bg-white/10">
              <tr>
                <th className="p-3">Brand</th>
                <th className="p-3">City</th>
                <th className="p-3">Type</th>
                <th className="p-3">Price/Day</th>
                <th className="p-3">Available</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {cars.map((car) => (
                <tr key={car.id} className="border-t border-white/10">
                  <td className="p-3">{car.brand}</td>
                  <td className="p-3">{car.city}</td>
                  <td className="p-3">{car.carType}</td>
                  <td className="p-3">₹{car.pricePerDay}</td>
                  <td className="p-3">{car.availableCars}</td>

                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(car)}
                      className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(car.id)}
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

export default AdminCars;