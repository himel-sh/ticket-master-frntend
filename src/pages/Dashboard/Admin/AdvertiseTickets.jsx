import { useQuery } from "@tanstack/react-query";
import AdvertiseTicketDataRow from "../../../components/Dashboard/TableRows/AdvertiseTicketDataRow";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const AdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: tickets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["advertise-tickets"],
    queryFn: async () => {
      const result = await axiosSecure(`/approved-tickets`);
      return result.data;
    },
  });

  const advertisedCount = tickets.filter((t) => t.isAdvertised).length;

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Advertise Tickets
          </h2>
          <div className="text-sm text-gray-600">
            <span className="font-semibold">{advertisedCount}/6</span> tickets
            advertised
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                  >
                    Route
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                  >
                    Vendor
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <AdvertiseTicketDataRow
                    key={ticket._id}
                    ticket={ticket}
                    refetch={refetch}
                    maxAdvertised={6}
                    currentAdvertisedCount={advertisedCount}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseTickets;
