import Card from "./Card";
import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Plants = () => {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/tickets`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <Container>
      {tickets && tickets.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {tickets.map((ticket) => (
            <Card key={ticket._id} ticket={ticket}></Card>
          ))}
        </div>
      ) : null}
    </Container>
  );
};

export default Plants;
