import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import DeleteModal from "../../Modal/DeleteModal";
import PaymentModal from "../../Modal/PaymentModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CustomerOrderCard = ({ order, refetch }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    image,
    name,
    quantity,
    price,
    status,
    _id,
    from,
    to,
    departureDate,
    departureTime,
  } = order || {};

  // Calculate countdown
  useEffect(() => {
    if (!departureDate || !departureTime) return;

    const calculateCountdown = () => {
      const departureDateTime = new Date(`${departureDate}T${departureTime}`);
      const now = new Date();
      const diff = departureDateTime - now;

      if (diff <= 0) {
        setIsExpired(true);
        setCountdown("Departed");
        return;
      }

      setIsExpired(false);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);

      setCountdown(`${days}d ${hours}h ${minutes}m`);
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [departureDate, departureTime]);

  const handleDelete = async (orderId) => {
    try {
      const response = await axiosSecure.delete(`/orders/${orderId}`);
      if (response.status === 200) {
        toast.success("Booking cancelled successfully");
        if (refetch) refetch();
      } else {
        toast.error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error cancelling booking");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 truncate">{name}</h3>

        {/* Route */}
        <div className="text-sm text-gray-600">
          <p className="font-semibold">
            {from} → {to}
          </p>
        </div>

        {/* Departure Info */}
        <div className="text-xs text-gray-600 space-y-1">
          <p>
            <strong>Date:</strong> {departureDate}
          </p>
          <p>
            <strong>Time:</strong> {departureTime}
          </p>
        </div>

        {/* Countdown */}
        <div
          className={`text-sm font-semibold p-2 rounded text-center ${
            isExpired ? "bg-red-100 text-red-700" : "bg-purple-100 text-lime-700"
          }`}
        >
          {countdown}
        </div>

        {/* Quantity and Price */}
        <div className="flex justify-between items-center pt-2 border-t">
          <div>
            <p className="text-xs text-gray-600">Quantity</p>
            <p className="text-lg font-bold text-gray-900">{quantity}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600">Total Price</p>
            <p className="text-lg font-bold text-purple-600">${price}</p>
          </div>
        </div>

        {/* Status */}
        <div className="flex justify-center">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
              status
            )}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3">
          <button
            onClick={() => setIsPaymentOpen(true)}
            disabled={status !== "approved"}
            className={`flex-1 font-semibold py-2 rounded transition text-sm ${
              status === "approved"
                ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Purchase
          </button>

          <button
            onClick={() => setIsDeleteOpen(true)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition text-sm"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Modals */}
      <DeleteModal
        isOpen={isDeleteOpen}
        closeModal={() => setIsDeleteOpen(false)}
        onDelete={handleDelete}
        orderId={_id}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        closeModal={() => setIsPaymentOpen(false)}
        order={order}
      />
    </div>
  );
};

export default CustomerOrderCard;
