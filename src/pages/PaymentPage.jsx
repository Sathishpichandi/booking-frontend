import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function PaymentPage() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const bookingId = searchParams.get("bookingId");
  const amount = searchParams.get("amount");
  const type = searchParams.get("type");

  const [method, setMethod] = useState("UPI");
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {

    try {

      setProcessing(true);

      // fake payment delay (like real gateway)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8081/api/payments",
        null,
        {
          params: {
            referenceId: Number(bookingId),
            type: type,
            amount:Number(amount),
            method: method
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Payment Successful 🎉");

     navigate(`/ticket/${bookingId}?type=${type}`);

    } catch (err) {

      console.error(err);
      toast.error("Payment Failed ❌");

    } finally {

      setProcessing(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">

      <div className="bg-slate-800 p-8 rounded-xl w-96 shadow-xl">

        <h1 className="text-2xl font-bold mb-6">💳 Payment</h1>

        <p className="mb-2">Booking ID: {bookingId}</p>
        <p className="mb-2">Service: {type}</p>
        <p className="mb-6">Amount: ₹{amount}</p>

        {/* Payment Method */}
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-3 mb-6 bg-slate-900 border border-slate-600 rounded-lg"
        >
          <option value="UPI">UPI</option>
          <option value="CARD">Card</option>
          <option value="NET_BANKING">Net Banking</option>
        </select>

        {/* Fake Card Fields */}
        {method === "CARD" && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-2 mb-2 bg-slate-900 border border-slate-600 rounded"
            />
            <input
              type="text"
              placeholder="Expiry"
              className="w-full p-2 mb-2 bg-slate-900 border border-slate-600 rounded"
            />
            <input
              type="text"
              placeholder="CVV"
              className="w-full p-2 bg-slate-900 border border-slate-600 rounded"
            />
          </div>
        )}

        {/* Fake UPI */}
        {method === "UPI" && (
          <input
            type="text"
            placeholder="Enter UPI ID"
            className="w-full p-3 mb-6 bg-slate-900 border border-slate-600 rounded-lg"
          />
        )}

        {/* Button */}
        <button
          onClick={handlePayment}
          disabled={processing}
          className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg"
        >
          {processing ? "Processing Payment..." : "Pay Now"}
        </button>

      </div>

    </div>

  );
}

export default PaymentPage;