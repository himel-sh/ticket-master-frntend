import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { TbFidgetSpinner } from "react-icons/tb";

const PaymentModal = ({ isOpen, closeModal, order }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { name, category, price, quantity, _id, image } = order || {};

  const handlePayment = async () => {
    try {
      setIsLoading(true);

      const paymentInfo = {
        orderId: _id,
        ticketName: name,
        category,
        price: price / quantity, // price per ticket
        quantity,
        totalPrice: price,
        image,
        customer: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        paymentInfo
      );

      window.location.href = data.url;
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to process payment");
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
              Complete Payment
            </DialogTitle>

            <div className="mt-4 space-y-4">
              <div className="flex gap-3">
                <img
                  src={image}
                  alt={name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-semibold text-gray-900">{name}</p>
                  <p className="text-sm text-gray-600">Qty: {quantity}</p>
                </div>
              </div>

              <div className="bg-gray-100 p-3 rounded-md space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Price per ticket:</span>
                  <span className="font-semibold">
                    ${(price / quantity).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Quantity:</span>
                  <span className="font-semibold">{quantity}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="font-bold text-lg text-purple-600">
                    ${price.toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                Customer: <strong>{user?.displayName}</strong>
              </p>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="flex-1 bg-purple-500 text-white font-semibold py-2 rounded-md hover:bg-purple-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <TbFidgetSpinner className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Pay Now"
                  )}
                </button>
                <button
                  onClick={closeModal}
                  disabled={isLoading}
                  className="flex-1 bg-gray-200 text-gray-900 font-semibold py-2 rounded-md hover:bg-gray-300 transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PaymentModal;
