import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";

const BookingModal = ({ isOpen, closeModal, ticket, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const onSubmit = async (data) => {
    const { quantity } = data;
    const quantityNum = Number(quantity);

    // Validation
    if (quantityNum < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    if (quantityNum > ticket.quantity) {
      toast.error(`Cannot book more than ${ticket.quantity} tickets`);
      return;
    }

    try {
      setIsLoading(true);

      const bookingData = {
        ticketId: ticket._id,
        transactionId: `booking_${Date.now()}`,
        customer: user?.email,
        status: "pending",
        seller: ticket.seller,
        name: ticket.name,
        category: ticket.category,
        quantity: quantityNum,
        price: ticket.price * quantityNum,
        description: ticket.description,
        image: ticket.image,
        from: ticket.from,
        to: ticket.to,
        transportType: ticket.transportType,
        departureDate: ticket.departureDate,
        departureTime: ticket.departureTime,
        perks: ticket.perks,
      };

      const response = await axiosSecure.post("/orders", bookingData);

      if (response.status === 201 || response.status === 200) {
        toast.success("Booking successful! Check your orders.");
        reset();
        closeModal();
        if (refetch) refetch();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message || "Booking failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-red-100 px-3 py-1 rounded-md text-red-500 cursor-pointer"
              >
                X
              </button>
            </div>
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Book Ticket
            </DialogTitle>
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-4">
                <strong>{ticket.name}</strong> - {ticket.from} to {ticket.to}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Available: <strong>{ticket.quantity}</strong> tickets
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Tickets
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={ticket.quantity}
                    {...register("quantity", {
                      required: "Quantity is required",
                      min: {
                        value: 1,
                        message: "Minimum 1 ticket",
                      },
                      max: {
                        value: ticket.quantity,
                        message: `Maximum ${ticket.quantity} tickets`,
                      },
                    })}
                    className="w-full px-4 py-2 border border-lime-300 rounded-md focus:outline-lime-500"
                  />
                  {errors.quantity && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>

                <div className="bg-gray-100 p-3 rounded-md">
                  <p className="text-sm text-gray-700">
                    <strong>Total Price:</strong> ${ticket.price} per ticket
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-lime-500 text-white font-semibold py-2 rounded-md hover:bg-lime-600 transition disabled:opacity-50"
                >
                  {isLoading ? (
                    <TbFidgetSpinner className="animate-spin m-auto" />
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default BookingModal;
