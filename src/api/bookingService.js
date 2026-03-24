import axios from "./axiosConfig";

export const getBookingSummary = async () => {
  const res = await axios.get("/api/bookings/summary");
  return res.data;
};