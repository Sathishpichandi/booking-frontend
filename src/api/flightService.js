import API from "./axiosConfig";

/* ================= USER ================= */

// Get all flights
export const getAllFlights = () =>
  API.get("/flights");

// Search flights
export const searchFlights = (source, destination) =>
  API.get(`/flights/search?source=${source}&destination=${destination}`);

// Book flight (VERY IMPORTANT STRUCTURE)
export const bookFlight = (
  flightId,
  seatNumber,
  baggageKg,
  mealOption
) =>
  API.post("/bookings/create", {
    flight: { id: flightId },
    seatNumber: seatNumber,
    baggageKg: baggageKg,
    mealOption: mealOption
  });

// My bookings
export const getMyBookings = () =>
  API.get("/bookings/my");

// Cancel booking
export const cancelBooking = (id) =>
  API.put(`/bookings/cancel/${id}`);


/* ================= ADMIN SIDE ================= */

export const getAdminFlights = () =>
  API.get("/admin/flights");

export const addFlight = (data) =>
  API.post("/admin/flights", data);

export const updateFlight = (id, data) =>
  API.put(`/admin/flights/${id}`, data);

export const deleteFlight = (id) =>
  API.delete(`/admin/flights/${id}`);