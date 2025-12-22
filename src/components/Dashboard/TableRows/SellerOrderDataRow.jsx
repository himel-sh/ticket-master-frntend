import { useState } from "react";
import { toast } from "react-hot-toast";
import DeleteModal from "../../Modal/DeleteModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SellerOrderDataRow = ({ order, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [localStatus, setLocalStatus] = useState(order?.status || "pending");
  const closeModal = () => setIsOpen(false);
  const axiosSecure = useAxiosSecure();

  const { name, price, quantity, status, customer, _id } = order || {};

  const handleDelete = async (orderId) => {
    try {
      const response = await axiosSecure.delete(`/orders/${orderId}`);
      if (response.status === 200) {
        toast.success("Order cancelled successfully");
        if (refetch) refetch();
      } else {
        toast.error("Failed to cancel order");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error cancelling order");
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await axiosSecure.patch(`/orders/${_id}`, {
        status: newStatus,
      });
      if (response.status === 200) {
        setLocalStatus(newStatus);
        const statusMessage =
          newStatus === "approved"
            ? "Order approved successfully"
            : newStatus === "rejected"
            ? "Order rejected successfully"
            : "Order status updated";
        toast.success(statusMessage);
        if (refetch) refetch();
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error updating order status");
      setLocalStatus(status);
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{customer}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">${price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{quantity}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{localStatus}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center gap-2">
          <select
            value={localStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 bg-white"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button
            onClick={() => setIsOpen(true)}
            className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">Cancel</span>
          </button>
        </div>
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          onDelete={handleDelete}
          orderId={_id}
        />
      </td>
    </tr>
  );
};

export default SellerOrderDataRow;
