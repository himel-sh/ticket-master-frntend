import { useState } from "react";
import { toast } from "react-hot-toast";
import DeleteModal from "../../Modal/DeleteModal";
import PaymentModal from "../../Modal/PaymentModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CustomerOrderDataRow = ({ order, refetch }) => {
  let [isDeleteOpen, setIsDeleteOpen] = useState(false);
  let [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const closeDeleteModal = () => setIsDeleteOpen(false);
  const closePaymentModal = () => setIsPaymentOpen(false);
  const axiosSecure = useAxiosSecure();

  const { image, name, category, price, quantity, status, _id } = order || {};

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

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{category}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{quantity}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{status}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex gap-2">
          {status === "pending" && (
            <button
              onClick={() => setIsPaymentOpen(true)}
              className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
            >
              <span className="absolute cursor-pointer inset-0 bg-green-200 opacity-50 rounded-full"></span>
              <span className="relative cursor-pointer">Purchase</span>
            </button>
          )}

          <button
            onClick={() => setIsDeleteOpen(true)}
            className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight"
          >
            <span className="absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full"></span>
            <span className="relative cursor-pointer">Cancel</span>
          </button>
        </div>

        <DeleteModal
          isOpen={isDeleteOpen}
          closeModal={closeDeleteModal}
          onDelete={handleDelete}
          orderId={_id}
        />

        <PaymentModal
          isOpen={isPaymentOpen}
          closeModal={closePaymentModal}
          order={order}
          refetch={refetch}
        />
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
