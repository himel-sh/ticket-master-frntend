import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Card from "../../components/Home/Card";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const AllTickets = () => {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["all-tickets"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/tickets`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <div className="pt-24 pb-12">
        <Heading title="All Tickets" subtitle="Browse all available tickets" />

        {tickets && tickets.length > 0 ? (
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {tickets.map((ticket) => (
              <Card key={ticket._id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No tickets available</p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AllTickets;
