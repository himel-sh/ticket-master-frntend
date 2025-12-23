import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import axios from "axios";
import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Card from "../../components/Home/Card";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AllTickets = () => {
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["all-tickets"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/tickets`);
      return result.data;
    },
  });

  // Sort tickets based on selected order
  const sortedTickets = useMemo(() => {
    let sorted = [...tickets];
    if (sortOrder === "low-to-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [tickets, sortOrder]);

  // Paginate tickets
  const totalPages = Math.ceil(sortedTickets.length / itemsPerPage);
  const paginatedTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedTickets.slice(startIndex, endIndex);
  }, [sortedTickets, currentPage]);

  // Reset to page 1 when sort order changes
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <div className="pt-24 pb-12">
        <Heading title="All Tickets" subtitle="Browse all available tickets" />

        {tickets && tickets.length > 0 ? (
          <>
            {/* Sort Controls */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <label className="font-semibold text-gray-700">
                  Sort by Price:
                </label>
                <select
                  value={sortOrder}
                  onChange={handleSortChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="default">Default</option>
                  <option value="low-to-high">Low to High</option>
                  <option value="high-to-low">High to Low</option>
                </select>
              </div>
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, sortedTickets.length)} of{" "}
                {sortedTickets.length} tickets
              </div>
            </div>

            {/* Tickets Grid */}
            <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {paginatedTickets.map((ticket) => (
                <Card key={ticket._id} ticket={ticket} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-12 flex items-center justify-center gap-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-purple-500 text-white hover:bg-purple-600"
                  }`}
                >
                  <FaChevronLeft /> Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`w-10 h-10 rounded-lg font-semibold transition ${
                          currentPage === page
                            ? "bg-purple-500 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-purple-500 text-white hover:bg-purple-600"
                  }`}
                >
                  Next <FaChevronRight />
                </button>
              </div>
            )}
          </>
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
