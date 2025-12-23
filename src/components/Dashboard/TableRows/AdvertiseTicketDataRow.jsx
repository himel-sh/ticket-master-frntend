import { useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdvertiseTicketDataRow = ({
  ticket,
  refetch,
  maxAdvertised,
  currentAdvertisedCount,
}) => {
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);

  const { image, name, from, to, price, seller, _id, isAdvertised } =
    ticket || {};

  const handleToggleAdvertise = async () => {
    // Check if trying to advertise and already at max
    if (!isAdvertised && currentAdvertisedCount >= maxAdvertised) {
      toast.error(
        `Maximum ${maxAdvertised} tickets can be advertised at a time`
      );
      return;
    }

    try {
      setIsLoading(true);
      const response = await axiosSecure.patch(`/tickets/${_id}`, {
        isAdvertised: !isAdvertised,
      });
      if (response.status === 200) {
        toast.success(
          isAdvertised
            ? "Ticket unadvertised"
            : "Ticket advertised successfully"
        );
        if (refetch) refetch();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error updating advertisement status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="shrink-0">
            <img
              alt="ticket"
              src={image}
              className="mx-auto object-cover rounded h-10 w-15"
            />
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">
          {from} → {to}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{seller?.name}</p>
        <p className="text-xs text-gray-600">{seller?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">${price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={handleToggleAdvertise}
          disabled={isLoading}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
            isAdvertised ? "bg-purple-500" : "bg-gray-300"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
              isAdvertised ? "translate-x-7" : "translate-x-1"
            }`}
          />
        </button>
      </td>
    </tr>
  );
};

export default AdvertiseTicketDataRow;
