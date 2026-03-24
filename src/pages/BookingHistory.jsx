import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../components/MainLayout";
import { useNavigate } from "react-router-dom";

function BookingHistory() {

  const navigate = useNavigate();

  const [flightBookings, setFlightBookings] = useState([]);
  const [trainBookings, setTrainBookings] = useState([]);
  const [busBookings, setBusBookings] = useState([]);
  const [hotelBookings, setHotelBookings] = useState([]);
  const [carBookings, setCarBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {

    try {

      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`
      };

      const flights = await axios.get(
        "https://booking-backend-1-mon5.onrender.com/api/bookings/my",
        { headers }
      );

      const trains = await axios.get(
        "https://booking-backend-1-mon5.onrender.com/api/train-bookings/my",
        { headers }
      );

      const buses = await axios.get(
        "https://booking-backend-1-mon5.onrender.com/api/bus-bookings/my",
        { headers }
      );

      const hotels = await axios.get(
        "https://booking-backend-1-mon5.onrender.com/api/hotel-bookings/my",
        { headers }
      );

      const cars = await axios.get(
        "https://booking-backend-1-mon5.onrender.com/api/car-bookings/my",
        { headers }
      );

      setFlightBookings(flights.data);
      setTrainBookings(trains.data);
      setBusBookings(buses.data);
      setHotelBookings(hotels.data);
      setCarBookings(cars.data);

    } catch (err) {
      console.error(err);
    }

  };

  const goToTicket = (id, type) => {
    navigate(`/ticket/${id}?type=${type}`);
  };

  const Status = ({ status }) => (
    <span className={status === "CONFIRMED" ? "text-green-400" : "text-red-400"}>
      {status}
    </span>
  );

  return (

    <MainLayout>

      <div className="text-white bg-transparent min-h-screen">

        <h1 className="text-4xl font-bold mb-10">
          Booking History
        </h1>

        {/* FLIGHTS */}
        <Section title="Flights">
          {flightBookings.map((b) => (
            <Card key={b.id}>
              <div>
                <p>Route: {b.flight?.source} → {b.flight?.destination}</p>
                <p>Seat: {b.seatNumber}</p>
                <Status status={b.status} />
              </div>

              <button
                onClick={() => goToTicket(b.bookingId||b.id, "FLIGHT")}
                className="bg-blue-600 px-3 py-1 rounded"
              >
                Ticket
              </button>
            </Card>
          ))}
        </Section>


        {/* TRAINS */}
        <Section title="Trains">
          {trainBookings.map((b) => (
            <Card key={b.id}>
              <div>
                <p>Train: {b.train?.trainName}</p>
                <p>Route: {b.train?.source} → {b.train?.destination}</p>
                <Status status={b.status} />
              </div>

              <button
                onClick={() => goToTicket(b.id, "TRAIN")}
                className="bg-blue-600 px-3 py-1 rounded"
              >
                Ticket
              </button>
            </Card>
          ))}
        </Section>


        {/* BUSES */}
        <Section title="Buses">
          {busBookings.map((b) => (
            <Card key={b.id}>
              <div>
                <p>Bus: {b.bus?.operatorName}</p>
                <p>Seat: {b.seatNumber}</p>
                <Status status={b.status} />
              </div>

              <button
                onClick={() => goToTicket(b.id, "BUS")}
                className="bg-blue-600 px-3 py-1 rounded"
              >
                Ticket
              </button>
            </Card>
          ))}
        </Section>


        {/* HOTELS */}
        <Section title="Hotels">
          {hotelBookings.map((b) => (
            <Card key={b.id}>
              <div>
                <p>Hotel: {b.room?.hotel?.name}</p>
                <p>Room: {b.room?.roomType}</p>
                <Status status={b.status} />
              </div>

              <button
                onClick={() => goToTicket(b.id, "HOTEL")}
                className="bg-blue-600 px-3 py-1 rounded"
              >
                Ticket
              </button>
            </Card>
          ))}
        </Section>


        {/* CARS */}
        <Section title="Cars">
          {carBookings.map((b) => (
            <Card key={b.id}>
              <div>
                <p>Car: {b.car?.brand}</p>
                <p>Type: {b.car?.carType}</p>
                <Status status={b.status} />
              </div>

              <button
                onClick={() => goToTicket(b.id, "CAR")}
                className="bg-blue-600 px-3 py-1 rounded"
              >
                Ticket
              </button>
            </Card>
          ))}
        </Section>

      </div>

    </MainLayout>
  );
}

function Section({ title, children }) {

  return (

    <div className="mb-12">

      <h2 className="text-2xl font-semibold mb-4">
        {title}
      </h2>

    <div className="grid gap-4">
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div key={index}>{child}</div>
          ))
        : children}
    </div>

    </div>

  );

}

function Card({ children }) {

  return (

    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 flex justify-between items-center">
      {children}
    </div>

  );

}

export default BookingHistory;