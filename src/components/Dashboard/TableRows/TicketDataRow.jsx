import { useState } from "react";
import { toast } from "react-hot-toast";
import DeleteModal from "../../Modal/DeleteModal";
import UpdatePlantModal from "../../Modal/UpdatePlantModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TicketDataRow = ({ ticket, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const { image, name, quantity, price, category, _id } = ticket;

  const handleDelete = async (ticketId) => {
    try {
      const response = await axiosSecure.delete(`/tickets/${ticketId}`);
      if (response.status === 200) {
        toast.success("Ticket deleted successfully");
        if (refetch) refetch();
      } else {
        toast.error("Failed to delete ticket");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error deleting ticket");
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
        <p className="text-gray-900 ">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{category}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">${price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{quantity}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={openModal}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Delete</span>
        </span>
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          onDelete={handleDelete}
          orderId={_id}
        />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsEditModalOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update</span>
        </span>
        <UpdatePlantModal
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      </td>
    </tr>
  );
};

export default TicketDataRow;
