import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import {
  DollarSign,
  ShoppingCart,
  Activity,
  Layers
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b"];

function AdminDashboard() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://booking-backend-1-mon5.onrender.com/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!data) {
    return (

        <div className="text-white text-xl p-10">
          Loading Dashboard...
        </div>

    );
  }

  const pieData = Object.entries(data.bookingsByModule).map(
    ([key, value]) => ({ name: key, value })
  );

  const revenueData = Object.entries(data.revenueByModule).map(
    ([key, value]) => ({ name: key, revenue: value })
  );

  const stats = [
    {
      label: "Total Revenue",
      value: `₹ ${data.totalRevenue}`,
      icon: <DollarSign size={22} />
    },
    {
      label: "Total Bookings",
      value: data.totalBookings,
      icon: <ShoppingCart size={22} />
    },
    {
      label: "Active Bookings",
      value: data.activeBookings,
      icon: <Activity size={22} />
    },
    {
      label: "Modules Used",
      value: data.modulesUsed,
      icon: <Layers size={22} />
    }
  ];

  return (

      <div className="text-white">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">
            📊 Admin Dashboard
          </h1>
          <p className="text-slate-400">
            Overview of platform performance and revenue insights.
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6 mb-14">
          {stats.map((card, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10
                         p-6 rounded-2xl shadow-xl flex items-center gap-4"
            >
              <div className="bg-blue-600/30 p-3 rounded-xl">
                {card.icon}
              </div>

              <div>
                <p className="text-slate-400 text-sm">
                  {card.label}
                </p>
                <h2 className="text-2xl font-bold mt-1">
                  {card.value}
                </h2>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CHARTS */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* PIE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10
                       p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-6">
              Bookings By Module
            </h2>

            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={110}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* BAR */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10
                       p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-6">
              Revenue By Module
            </h2>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar
                  dataKey="revenue"
                  fill="#6366f1"
                  radius={[12, 12, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

        </div>
      </div>

  );
}

export default AdminDashboard;