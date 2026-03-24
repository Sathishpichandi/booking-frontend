import API from "./axiosConfig";

/* USER */

export const getAllHotels = () =>
  API.get("/hotels");

export const searchHotels = (city) =>
  API.get(`/hotels/search?city=${city}`);

export const getHotelRooms = (hotelId) =>
  API.get(`/hotels/${hotelId}/rooms`);

export const bookRoom = (roomId, checkIn, checkOut) =>
  API.post(
    `/hotel-bookings/create?roomId=${roomId}&checkIn=${checkIn}&checkOut=${checkOut}`
  );

export const getMyHotelBookings = () =>
  API.get("/hotel-bookings/my");