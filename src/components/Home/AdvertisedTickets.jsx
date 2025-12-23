import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Container from "../Shared/Container";
import Heading from "../Shared/Heading";

const AdvertisedTickets = () => {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["advertised-tickets"],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/advertised-tickets`
      );
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (tickets.length === 0) return null;

  return (
    <Container>
      <div className="py-16">
        <Heading
          title="Featured Tickets"
          subtitle="Check out our featured and advertised tickets"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {tickets.map((ticket) => (
            <AdvertisedTicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      </div>
    </Container>
  );
};

const AdvertisedTicketCard = ({ ticket }) => {
  const { _id, name, image, price, quantity, transportType, perks } =
    ticket || {};

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border-2 border-lime-300">
      {/* Featured Badge */}
      <div className="bg-lime-500 text-white px-3 py-1 text-xs font-bold">
        ⭐ FEATURED
      </div>

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

        {/* Transport Type */}
        <div className="text-sm text-gray-600">
          <p className="font-semibold text-lime-600">{transportType}</p>
        </div>

        {/* Price and Quantity */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-600">Price per unit</p>
            <p className="text-lg font-bold text-lime-600">${price}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600">Available</p>
            <p className="text-lg font-bold text-gray-900">{quantity}</p>
          </div>
        </div>

        {/* Perks */}
        {perks && perks.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-700">Perks:</p>
            <div className="flex flex-wrap gap-1">
              {perks.slice(0, 3).map((perk, index) => (
                <span
                  key={index}
                  className="bg-lime-100 text-lime-800 px-2 py-1 rounded text-xs"
                >
                  {perk}
                </span>
              ))}
              {perks.length > 3 && (
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                  +{perks.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* See Details Button */}
        <Link
          to={`/ticket/${_id}`}
          className="w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 rounded transition text-center block"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default AdvertisedTickets;
