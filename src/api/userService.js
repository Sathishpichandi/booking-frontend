import API from "/src/api/axiosConfig.js";

export const getFlights = () =>
  API.get("/flights/all");

export const createBooking = (data) =>
  API.post("/bookings/create", data);

export const makePayment = (referenceId, amount) =>
  API.post(`/payments?referenceId=${referenceId}&type=FLIGHT&amount=${amount}&method=CARD`);

export const getMyBookings = () =>
  API.get("/bookings/my");

export const confirmBooking = (id) =>
  API.put(`/bookings/confirm/${id}`);   // ✅ BACKTICKS

export const cancelBooking = (id) =>
  API.put(`/bookings/cancel/${id}`);    // ✅ BACKTICKS