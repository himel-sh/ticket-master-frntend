import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Container from "../Shared/Container";
import Heading from "../Shared/Heading";
import Card from "./Card";

const LatestTickets = () => {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["latest-tickets"],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/tickets?limit=8`
      );
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <div className="py-16">
        <Heading
          title="Latest Tickets"
          subtitle="Discover our most recently added tickets"
          center={true}
        />

        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No tickets available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {tickets.map((ticket) => (
              <Card key={ticket._id} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default LatestTickets;
