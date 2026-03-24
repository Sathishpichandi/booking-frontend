import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "../api/axiosConfig";

/* IMAGES */

import flightImg from "../assets/flight.png";
import trainImg from "../assets/train.png";
import busImg from "../assets/bus.png";
import carImg from "../assets/car.png";
import hotelImg from "../assets/hotel.png";

function UserDashboard() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [summary, setSummary] = useState({
    upcoming: 0,
    completed: 0,
    cancelled: 0,
    totalSpent: 0
  });

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {

      try {

        const decoded = jwtDecode(token);

        const email = decoded.sub;
        const name = email.split("@")[0];

        setUsername(name);

      } catch (err) {
        console.error("Invalid token");
      }

    }

    loadSummary();

  }, []);

  const loadSummary = async () => {

    try {

      const res = await axios.get("/bookings/summary");

      setSummary(res.data);

    } catch (err) {

      console.error("Failed to load summary", err);

    }

  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5
      }
    })
  };

  const cards = [
    {
      title: "Flights",
      img: flightImg,
      desc: "Book Domestic & International Flights",
      color: "from-blue-500 to-cyan-400",
      route: "/user/flights"
    },
    {
      title: "Trains",
      img: trainImg,
      desc: "Reserve Train Tickets Easily",
      color: "from-purple-500 to-pink-500",
      route: "/user/trains"
    },
    {
      title: "Buses",
      img: busImg,
      desc: "Affordable Bus Booking",
      color: "from-green-500 to-emerald-400",
      route: "/user/buses"
    },
    {
      title: "Cars",
      img: carImg,
      desc: "Self Drive & Rental Cars",
      color: "from-yellow-500 to-orange-400",
      route: "/user/cars"
    }
  ];

  return (

    <MainLayout>

      <div className="min-h-screen text-white">

        {/* HEADER */}

        <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
          Welcome Back, {username} 👋
        </h1>

        <p className="text-slate-300 mb-12 text-lg">
          Manage all your bookings in one premium travel platform.
        </p>

        {/* SERVICE CARDS */}

        <div className="grid md:grid-cols-4 gap-8 mb-8">

          {cards.map((card, index) => (

            <motion.div
              key={card.title}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className="relative h-56 rounded-2xl overflow-hidden shadow-xl"
            >

              <img
                src={card.img}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/30"></div>

              <div className="relative z-10 p-6 flex flex-col justify-end h-full">

                <h2 className="text-xl font-semibold">
                  {card.title}
                </h2>

                <p className="text-sm text-slate-200 mb-4">
                  {card.desc}
                </p>

                <button
                  onClick={() => navigate(card.route)}
                  className={`w-full py-2 rounded-lg bg-gradient-to-r ${card.color}`}
                >
                  Explore →
                </button>

              </div>

            </motion.div>

          ))}

        </div>

        {/* HOTEL + OVERVIEW */}

        <div className="grid md:grid-cols-4 gap-8">

          {/* HOTEL CARD */}

          <div className="relative h-56 rounded-2xl overflow-hidden shadow-xl">

            <img
              src={hotelImg}
              alt="hotel"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 p-6 flex flex-col justify-end h-full">

              <h2 className="text-xl font-semibold">
                Hotels
              </h2>

              <p className="text-sm text-slate-200 mb-4">
                Choose Your Perfect Stay
              </p>

              <button
                onClick={() => navigate("/user/hotels")}
                className="w-full py-2 rounded-lg bg-gradient-to-r
                           from-red-500 to-rose-400"
              >
                Explore →
              </button>

            </div>

          </div>

          {/* BOOKINGS OVERVIEW */}

          <div className="col-span-3 grid md:grid-cols-4 gap-6">

            <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg h-32 flex flex-col justify-center px-4">
              <p className="text-slate-300 text-sm">Upcoming</p>
              <h3 className="text-2xl font-bold">{summary.upcoming}</h3>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg h-32 flex flex-col justify-center px-4">
              <p className="text-slate-300 text-sm">Completed</p>
              <h3 className="text-2xl font-bold">{summary.completed}</h3>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg h-32 flex flex-col justify-center px-4">
              <p className="text-slate-300 text-sm">Cancelled</p>
              <h3 className="text-2xl font-bold">{summary.cancelled}</h3>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg h-32 flex flex-col justify-center px-4">
              <p className="text-slate-300 text-sm">Total Spent</p>
              <h3 className="text-2xl font-bold text-green-400">
                ₹{summary.totalSpent}
              </h3>
            </div>

          </div>

        </div>

        {/* FEATURES */}

        <div className="mt-16 grid md:grid-cols-4 gap-6 text-center">

          <div className="bg-slate-900/60 p-6 rounded-xl">
            ⭐ Best Prices
          </div>

          <div className="bg-slate-900/60 p-6 rounded-xl">
            ⚡ Fast Booking
          </div>

          <div className="bg-slate-900/60 p-6 rounded-xl">
            📞 24/7 Support
          </div>

          <div className="bg-slate-900/60 p-6 rounded-xl">
            🔒 Secure Payment
          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default UserDashboard;