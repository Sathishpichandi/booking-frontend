import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";

import UserDashboard from "./pages/UserDashboard";
import UserFlights from "./pages/UserFlights";
import UserBuses from "./pages/UserBuses";
import UserCars from "./pages/UserCars";
import UserTrains from "./pages/UserTrains";
import UserHotels from "./pages/UserHotels";

import BookingHistory from "./pages/BookingHistory";
import MyBookings from "./pages/MyBookings";
import PaymentPage from "./pages/PaymentPage";
import TicketPage from "./pages/TicketPage";

import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminFlights from "./pages/AdminFlights";
import AdminTrains from "./pages/AdminTrains";
import AdminBuses from "./pages/AdminBuses";
import AdminCars from "./pages/AdminCars";
import AdminHotels from "./pages/AdminHotels";

import MainLayout from "./components/MainLayout";

function App() {
  return (
    <>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* USER ROUTES */}
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user/flights" element={<UserFlights />} />
        <Route path="/user/trains" element={<UserTrains />} />
        <Route path="/user/buses" element={<UserBuses />} />
        <Route path="/user/cars" element={<UserCars />} />
        <Route path="/user/hotels" element={<UserHotels />} />
         <Route path="/user/history" element={<BookingHistory />} />

        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/ticket/:bookingId" element={<TicketPage />} />

        <Route
          path="/user/my-bookings"
          element={
            <MainLayout>
              <MyBookings />
            </MainLayout>
          }
        />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="flights" element={<AdminFlights />} />
          <Route path="trains" element={<AdminTrains />} />
          <Route path="buses" element={<AdminBuses />} />
          <Route path="cars" element={<AdminCars />} />
          <Route path="hotels" element={<AdminHotels />} />
        </Route>

      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;