import API from "./axiosConfig";

/* ================= USER SIDE ================= */
export const getAllTrains = () =>
  API.get("/trains");

// 🔎 Search trains
export const searchTrains = (source, destination) =>
  API.get(`/trains/search?source=${source}&destination=${destination}`);

// 🎟 Book train



export const bookTrain = (trainId, classType) =>
  API.post(`/trains/book?trainId=${trainId}&classType=${classType}`);


/* ================= ADMIN SIDE ================= */

// Get all trains
export const getAdminTrains = () =>
  API.get("/api/admin/trains");

// Add train
export const addTrain = (data) =>
  API.post("/api/admin/trains", data);

// Update train
export const updateTrain = (id, data) =>
  API.put(`/api/admin/trains/${id}`, data);

// Delete train
export const deleteTrain = (id) =>
  API.delete(`/api/admin/trains/${id}`);