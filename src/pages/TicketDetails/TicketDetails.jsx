import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import BookingModal from "../../components/Modal/BookingModal";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { AuthContext } from "../../providers/AuthContext";
import toast from "react-hot-toast";

const TicketDetails = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    data: ticket = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/tickets/${id}`
      );
      return result.data;
    },
  });

  // Calculate countdown
  useEffect(() => {
    if (!ticket.departureDate || !ticket.departureTime) return;

    const calculateCountdown = () => {
      const departureDateTime = new Date(
        `${ticket.departureDate}T${ticket.departureTime}`
      );
      const now = new Date();
      const diff = departureDateTime - now;

      if (diff <= 0) {
        setIsExpired(true);
        setCountdown("Departure time has passed");
        return;
      }

      setIsExpired(false);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [ticket.departureDate, ticket.departureTime]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleBookNow = () => {
    if (!user) {
      toast.error(
        "You need to be logged in to book a ticket. Please log in first."
      );
      navigate("/login");
      return;
    }
    setIsOpen(true);
  };

  if (isLoading) return <LoadingSpinner />;
  const {
    image,
    name,
    from,
    to,
    transportType,
    departureDate,
    departureTime,
    quantity,
    price,
    perks,
    seller,
  } = ticket;

  const isBookingDisabled = isExpired || quantity === 0;

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12 pt-20">
        {/* Header */}
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <div className="w-full overflow-hidden rounded-xl">
              <img
                className="object-cover w-full h-96"
                src={image}
                alt="ticket image"
              />
            </div>
          </div>
        </div>
        <div className="md:gap-10 flex-1">
          {/* Ticket Info */}
          <Heading title={name} subtitle={`${transportType}`} center={false} />
          <hr className="my-6" />

          {/* Route Information */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">From:</span>
              <span className="text-lg text-gray-900">{from}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">To:</span>
              <span className="text-lg text-gray-900">{to}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">
                Transport Type:
              </span>
              <span className="text-lg text-gray-900">{transportType}</span>
            </div>
          </div>
          <hr className="my-6" />

          {/* Departure Information */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">
                Departure Date:
              </span>
              <span className="text-lg text-gray-900">{departureDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">
                Departure Time:
              </span>
              <span className="text-lg text-gray-900">{departureTime}</span>
            </div>
          </div>
          <hr className="my-6" />

          {/* Countdown */}
          <div className="bg-lime-50 border-2 border-lime-300 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-700">
              <strong>Time until departure:</strong>
            </p>
            <p
              className={`text-2xl font-bold ${
                isExpired ? "text-red-600" : "text-lime-600"
              }`}
            >
              {countdown}
            </p>
          </div>

          {/* Perks */}
          {perks && perks.length > 0 && (
            <>
              <div>
                <span className="font-semibold text-gray-700">Perks:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {perks.map((perk, index) => (
                    <span
                      key={index}
                      className="bg-lime-100 text-lime-800 px-3 py-1 rounded-full text-sm"
                    >
                      {perk}
                    </span>
                  ))}
                </div>
              </div>
              <hr className="my-6" />
            </>
          )}

          {/* Seller Information */}
          <div className="flex items-center gap-4">
            <div>
              <p className="font-semibold text-gray-700">Seller:</p>
              <p className="text-lg text-gray-900">{seller?.name}</p>
              <p className="text-sm text-gray-600">{seller?.email}</p>
            </div>
            <img
              className="rounded-full"
              height="50"
              width="50"
              alt="Seller Avatar"
              referrerPolicy="no-referrer"
              src={seller?.image}
            />
          </div>
          <hr className="my-6" />

          {/* Quantity and Price */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">
                Available Tickets:
              </span>
              <span className="text-lg font-bold text-lime-600">
                {quantity}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-2xl text-gray-700">Price:</span>
              <span className="font-bold text-3xl text-lime-600">${price}</span>
            </div>
          </div>
          <hr className="my-6" />

          {/* Book Now Button */}
          <div className="flex justify-end">
            <button
              onClick={handleBookNow}
              disabled={isBookingDisabled}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition ${
                isBookingDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-lime-500 hover:bg-lime-600"
              }`}
            >
              {isExpired
                ? "Departure Passed"
                : quantity === 0
                ? "Sold Out"
                : "Book Now"}
            </button>
          </div>

          <BookingModal
            ticket={ticket}
            closeModal={closeModal}
            isOpen={isOpen}
            refetch={refetch}
          />
        </div>
      </div>
    </Container>
  );
};

export default TicketDetails;
