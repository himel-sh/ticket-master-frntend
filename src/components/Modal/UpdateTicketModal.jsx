import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import UpdateTicketForm from "../Form/UpdateTicketForm";

const UpdateTicketModal = ({ setIsEditModalOpen, isOpen, ticket, refetch }) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => setIsEditModalOpen(false)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-2xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-red-100 px-3 py-1 rounded-md text-red-500 cursor-pointer"
              >
                X
              </button>
            </div>
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Update Ticket Info
            </DialogTitle>
            <div className="mt-4 w-full">
              <UpdateTicketForm
                ticket={ticket}
                closeModal={() => setIsEditModalOpen(false)}
                refetch={refetch}
              />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateTicketModal;
