import API from "./axiosConfig";

/* ================= USER SIDE ================= */

// Get all buses
export const getAllBuses = () =>
  API.get("/buses");

// Search buses
export const searchBuses = (source, destination) =>
  API.get(`/buses/search?source=${source}&destination=${destination}`);

// Book bus
export const bookBus = (busId,seatNumber) =>
  API.post(`/bus-bookings/create?busId=${busId}`,{seatNumber:seatNumber});


/* ================= ADMIN SIDE ================= */

// Get all buses
export const getAdminBuses = () =>
  API.get("/admin/buses");

// Add bus
export const addBus = (data) =>
  API.post("/admin/buses", data);

// Update bus
export const updateBus = (id, data) =>
  API.put(`/admin/buses/${id}`, data);

// Delete bus
export const deleteBus = (id) =>
  API.delete(`/admin/buses/${id}`);