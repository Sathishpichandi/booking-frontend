import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Plane,
  Train,
  Bus,
  Car,
  Hotel,
  Menu,
  History
} from "lucide-react";

function UserSidebar() {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", path: "/user", icon: LayoutDashboard },
    { name: "Flights", path: "/user/flights", icon: Plane },
    { name: "Trains", path: "/user/trains", icon: Train },
    { name: "Buses", path: "/user/buses", icon: Bus },
    { name: "Cars", path: "/user/cars", icon: Car },
    { name: "Hotels", path: "/user/hotels", icon: Hotel },

    // ⭐ NEW MENU ITEM
    { name: "History", path: "/user/history", icon: History }
  ];

  return (
    <motion.div
      animate={{ width: open ? 260 : 80 }}
      className="h-screen bg-slate-900/80 backdrop-blur-xl border-r border-slate-700 p-4 flex flex-col"
    >
      <div className="flex items-center justify-between mb-10">
        {open && <h1 className="text-xl font-bold text-white">User Panel</h1>}
        <Menu
          className="text-white cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>

      <div className="flex flex-col gap-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/user"}
              className={({ isActive }) =>
                `flex items-center gap-4 p-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} className="text-white" />
              {open && <span className="text-white">{item.name}</span>}
            </NavLink>
          );
        })}
      </div>
    </motion.div>
  );
}

export default UserSidebar;