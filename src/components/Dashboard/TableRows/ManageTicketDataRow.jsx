import { useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageTicketDataRow = ({ ticket, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);

  const { image, name, from, to, price, seller, _id, status } = ticket || {};

  const handleApprove = async () => {
    try {
      setIsLoading(true);
      const response = await axiosSecure.patch(`/tickets/${_id}`, {
        status: "approved",
      });
      if (response.status === 200) {
        toast.success("Ticket approved successfully");
        if (refetch) refetch();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error approving ticket");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setIsLoading(true);
      const response = await axiosSecure.patch(`/tickets/${_id}`, {
        status: "rejected",
      });
      if (response.status === 200) {
        toast.success("Ticket rejected successfully");
        if (refetch) refetch();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error rejecting ticket");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
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
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
            status
          )}`}
        >
          {status
            ? status.charAt(0).toUpperCase() + status.slice(1)
            : "Pending"}
        </span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex gap-2">
          <button
            onClick={handleApprove}
            disabled={isLoading || status === "approved"}
            className={`px-3 py-1 font-semibold rounded transition ${
              status === "approved"
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-green-200 text-green-900 hover:bg-green-300 cursor-pointer"
            }`}
          >
            Approve
          </button>
          <button
            onClick={handleReject}
            disabled={isLoading || status === "rejected"}
            className={`px-3 py-1 font-semibold rounded transition ${
              status === "rejected"
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-red-200 text-red-900 hover:bg-red-300 cursor-pointer"
            }`}
          >
            Reject
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ManageTicketDataRow;
