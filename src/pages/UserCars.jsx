import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { getAllCars, bookCar } from "../api/carService";
import { toast } from "react-toastify";

function UserCars() {

  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const res = await getAllCars();
      setCars(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load cars");
    }
  };

  const handleBook = async (car) => {

    try {

      const res = await bookCar(car.id);

      const bookingId = res.data.id;

      toast.success("Car reserved. Complete payment 🚗");

      navigate(`/payment?bookingId=${bookingId}&amount=${car.pricePerDay}&type=CAR`);

    } catch (err) {

      console.log(err);
      toast.error("Booking failed ❌");

    }

  };

  return (

    <MainLayout>

      <h1 className="text-4xl font-bold mb-3">
        Car Rentals 🚗
      </h1>

      <p className="text-slate-300 mb-10">
        Choose from premium self-drive and rental cars.
      </p>

      <div className="grid grid-cols-3 gap-10">

        {cars.map((car) => (

          <div key={car.id} className="relative group">

            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl transition transform group-hover:-translate-y-2">

              <h2 className="text-xl font-semibold mb-2">
                {car.brand}
              </h2>

              <p className="text-slate-400">
                {car.carType}
              </p>

              <p className="mt-2 text-slate-400">
                Available: {car.availableCars}
              </p>

              <p className="mt-3 text-purple-400 font-semibold">
                ₹{car.pricePerDay} / day
              </p>

              <button
                disabled={car.availableCars <= 0}
                onClick={() => handleBook(car)}
                className="mt-6 w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition disabled:bg-gray-500"
              >
                {car.availableCars > 0 ? "Rent Now" : "Not Available"}
              </button>

            </div>

          </div>

        ))}

      </div>

    </MainLayout>

  );
}

export default UserCars;