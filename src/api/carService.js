import API from "./axiosConfig";

/* ================= USER ================= */

// Get all cars
export const getAllCars = () =>
  API.get("/cars");

// Search cars by city
export const searchCars = (city) =>
  API.get(`/cars/search?city=${city}`);

// Book car
export const bookCar = (carId) =>
  API.post(`/car-bookings/create?carId=${carId}`);

// My car bookings
export const getMyCarBookings = () =>
  API.get("/car-bookings/my");

// Cancel car booking
export const cancelCarBooking = (bookingId) =>
  API.put(`/car-bookings/cancel/${bookingId}`);
// ADMIN
export const getAdminCars = () =>
  API.get("/admin/cars");

export const addCar = (data) =>
  API.post("/admin/cars", data);

export const updateCar = (id, data) =>
  API.put(`/admin/cars/${id}`, data);

export const deleteCar = (id) =>
  API.delete(`/admin/cars/${id}`);