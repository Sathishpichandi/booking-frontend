import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Plane,
  Hotel,
  Train,
  Bus,
  Car,
  LogOut
} from "lucide-react";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Flights", icon: Plane, path: "/admin/flights" },
    { name: "Hotels", icon: Hotel, path: "/admin/hotels" },
    { name: "Trains", icon: Train, path: "/admin/trains" },
    { name: "Buses", icon: Bus, path: "/admin/buses" },
    { name: "Cars", icon: Car, path: "/admin/cars" },
  ];

  return (
    <div className="h-screen w-64 flex flex-col justify-between
                    bg-gradient-to-b from-slate-900 to-slate-800
                    text-white p-6 shadow-2xl">

      {/* Top Section */}
      <div>

        <h2 className="text-2xl font-bold mb-10 tracking-wide">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-3">

          {menu.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition
                   ${isActive
                    ? "bg-blue-600 shadow-lg"
                    : "hover:bg-slate-700"}`
                }
              >
                <Icon size={20}/>
                {item.name}
              </NavLink>
            );
          })}

        </nav>

      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg
                   text-red-400 hover:bg-red-500/20 transition"
      >
        <LogOut size={20}/>
        Logout
      </button>

    </div>
  );
}

export default Sidebar;