import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Plane,
  Train,
  Bus,
  Car,
  Hotel,
  Menu,
  History,
  LogOut
} from "lucide-react";

import travelBg from "../assets/travel.png";

function MainLayout({ children }) {

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (

    <div className="relative flex min-h-screen text-white overflow-hidden">

      {/* GLOBAL BACKGROUND */}
      <img
        src={travelBg}
        className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none"
      />

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-blue-900/20 to-slate-900/20"></div>

      {/* SIDEBAR */}
      <div
        className={`relative z-10 ${
          collapsed ? "w-20" : "w-64"
        } transition-all duration-500 bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between`}
      >

        {/* TOP */}
        <div>

          <div className="flex items-center justify-between p-4">

            {!collapsed && (
              <h1 className="text-xl font-bold tracking-wide">
                Smart Multi Service Booking
              </h1>
            )}

            <Menu
              className="cursor-pointer"
              onClick={() => setCollapsed(!collapsed)}
            />

          </div>

          <nav className="mt-8 space-y-2 px-3">

            <NavItem to="/user" icon={<LayoutDashboard size={20} />} label="Dashboard" collapsed={collapsed} />
            <NavItem to="/user/flights" icon={<Plane size={20} />} label="Flights" collapsed={collapsed} />
            <NavItem to="/user/trains" icon={<Train size={20} />} label="Trains" collapsed={collapsed} />
            <NavItem to="/user/buses" icon={<Bus size={20} />} label="Buses" collapsed={collapsed} />
            <NavItem to="/user/cars" icon={<Car size={20} />} label="Cars" collapsed={collapsed} />
            <NavItem to="/user/hotels" icon={<Hotel size={20} />} label="Hotels" collapsed={collapsed} />
            <NavItem to="/user/history" icon={<History size={20} />} label="History" collapsed={collapsed} />

          </nav>

        </div>

        {/* LOGOUT */}
        <div className="p-4">

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-xl
                       bg-gradient-to-r from-red-500 to-pink-600
                       hover:scale-105 transition-all shadow-lg shadow-red-500/30"
          >

            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}

          </button>

        </div>

      </div>

      {/* PAGE CONTENT */}
      <div className="relative z-10 flex-1 p-10">
        {children}
      </div>

    </div>

  );
}

function NavItem({ to, icon, label, collapsed }) {

  return (

    <NavLink
      to={to}
      end={to === "/user"}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-xl transition-all duration-300
        ${
          isActive
            ? "bg-blue-600/40 border border-blue-500 shadow-lg shadow-blue-500/30"
            : "hover:bg-white/10"
        }`
      }
    >

      {icon}
      {!collapsed && <span>{label}</span>}

    </NavLink>

  );
}

export default MainLayout;