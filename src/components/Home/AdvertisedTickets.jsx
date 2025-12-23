import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Container from "../Shared/Container";
import Heading from "../Shared/Heading";
import Card from "./Card";

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
          center={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="relative">
              {/* Featured Badge */}
              <div className="absolute top-2 left-2 bg-lime-500 text-white px-2 py-1 text-xs font-bold rounded z-10">
                ⭐ FEATURED
              </div>
              {/* Card with border */}
              <div className="border-2 h-full border-lime-300 rounded-lg overflow-hidden">
                <Card ticket={ticket} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AdvertisedTickets;
