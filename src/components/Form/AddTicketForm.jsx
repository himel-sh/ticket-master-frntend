import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils";
import useAuth from "../../hooks/useAuth";

import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddTicketForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    isError,
    mutateAsync,
    reset: resetMutation,
  } = useMutation({
    mutationFn: async (payload) => {
      return await axiosSecure.post(`/tickets`, payload);
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Ticket added successfully");
      resetMutation();
    },
    onError: (error) => {
      console.log(error);
    },
    onMutate: (payload) => {
      console.log("I will post this data---->", payload);
    },
    onSettled: (data, error) => {
      console.log("i am from onsetteled", data);
      if (error) console.log(error);
    },
    retry: 2,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const perksOptions = [
    "AC",
    "Breakfast",
    "WiFi",
    "Charging",
    "Blanket",
    "Pillow",
  ];

  const onSubmit = async (data) => {
    const {
      title,
      from,
      to,
      transportType,
      quantity,
      price,
      departureDate,
      departureTime,
      perks,
      image,
    } = data;
    const imageFile = image[0];

    try {
      const imageUrl = await imageUpload(imageFile);

      // Get selected perks
      const selectedPerks = perksOptions.filter((perk) => data[`perk_${perk}`]);

      const ticketData = {
        image: imageUrl,
        name: title,
        from,
        to,
        transportType,
        quantity: Number(quantity),
        price: Number(price),
        departureDate,
        departureTime,
        perks: selectedPerks,
        seller: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };

      await mutateAsync(ticketData);
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Error adding ticket");
    }
  };

  if (isPending) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return "An error has occurred";

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Ticket Title */}
            <div className="space-y-1 text-sm">
              <label htmlFor="title" className="block text-gray-600">
                Ticket Title
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                id="title"
                type="text"
                placeholder="e.g., Dhaka to Chittagong Express"
                {...register("title", {
                  required: "Ticket title is required",
                })}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* From Location */}
            <div className="space-y-1 text-sm">
              <label htmlFor="from" className="block text-gray-600">
                From (Location)
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                id="from"
                type="text"
                placeholder="Departure location"
                {...register("from", {
                  required: "From location is required",
                })}
              />
              {errors.from && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.from.message}
                </p>
              )}
            </div>

            {/* To Location */}
            <div className="space-y-1 text-sm">
              <label htmlFor="to" className="block text-gray-600">
                To (Location)
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                id="to"
                type="text"
                placeholder="Destination location"
                {...register("to", {
                  required: "To location is required",
                })}
              />
              {errors.to && (
                <p className="text-red-500 text-xs mt-1">{errors.to.message}</p>
              )}
            </div>

            {/* Transport Type */}
            <div className="space-y-1 text-sm">
              <label htmlFor="transportType" className="block text-gray-600">
                Transport Type
              </label>
              <select
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                {...register("transportType", {
                  required: "Transport type is required",
                })}
              >
                <option value="">Select transport type</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Flight">Flight</option>
                <option value="Boat">Boat</option>
              </select>
              {errors.transportType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.transportType.message}
                </p>
              )}
            </div>

            {/* Departure Date */}
            <div className="space-y-1 text-sm">
              <label htmlFor="departureDate" className="block text-gray-600">
                Departure Date
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                id="departureDate"
                type="date"
                {...register("departureDate", {
                  required: "Departure date is required",
                })}
              />
              {errors.departureDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.departureDate.message}
                </p>
              )}
            </div>

            {/* Departure Time */}
            <div className="space-y-1 text-sm">
              <label htmlFor="departureTime" className="block text-gray-600">
                Departure Time
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                id="departureTime"
                type="time"
                {...register("departureTime", {
                  required: "Departure time is required",
                })}
              />
              {errors.departureTime && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.departureTime.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            {/* Price & Quantity */}
            <div className="flex justify-between gap-2">
              {/* Price */}
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600">
                  Price (per unit)
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  id="price"
                  type="number"
                  placeholder="Price per ticket"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price must be positive" },
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className="space-y-1 text-sm">
                <label htmlFor="quantity" className="block text-gray-600">
                  Ticket Quantity
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  id="quantity"
                  type="number"
                  placeholder="Available tickets"
                  {...register("quantity", {
                    required: "Quantity is required",
                    min: {
                      value: 1,
                      message: "Quantity must be at least 1",
                    },
                  })}
                />
                {errors.quantity && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
            </div>

            {/* Perks Checkboxes */}
            <div className="space-y-2 text-sm">
              <label className="block text-gray-600">Perks</label>
              <div className="grid grid-cols-2 gap-3">
                {perksOptions.map((perk) => (
                  <label key={perk} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register(`perk_${perk}`)}
                      className="w-4 h-4 border-lime-300 rounded"
                    />
                    <span className="text-gray-700">{perk}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className="p-4 w-full m-auto rounded-lg">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                      {...register("image", {
                        required: "Image is required",
                      })}
                    />
                    {errors.image && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.image.message}
                      </p>
                    )}
                    <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-600">
                      Upload Image
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Vendor Info - Readonly */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1 text-sm">
                <label className="block text-gray-600">Vendor Name</label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-100"
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="block text-gray-600">Vendor Email</label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-100"
                  type="email"
                  value={user?.email || ""}
                  readOnly
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 hover:bg-lime-600"
            >
              {isPending ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Add Ticket"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTicketForm;
