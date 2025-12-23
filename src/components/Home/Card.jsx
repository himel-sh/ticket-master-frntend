import { Link } from "react-router";
import Marquee from "react-fast-marquee";

const Card = ({ ticket }) => {
  const {
    _id,
    name,
    image,
    from,
    to,
    transportType,
    quantity,
    price,
    perks,
    departureDate,
    departureTime,
  } = ticket || {};

  const routeText = `${from} → ${to}`;
  const isRouteLong = routeText.length > 15;

  // Convert 24-hour time to 12-hour format with AM/PM
  const formatTime = (time24) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Check if departure time has passed
  const isTimePassed = () => {
    if (!departureDate || !departureTime) return false;
    const departureDateTime = new Date(`${departureDate}T${departureTime}`);
    const now = new Date();
    return departureDateTime < now;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition h-full flex flex-col">
      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-gray-200 shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition"
        />
      </div>

      {/* Content */}
      <div className="p-3 space-y-2 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 truncate">{name}</h3>

        {/* Route and Transport Type - Side by Side */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0 overflow-hidden">
            <p className="text-xs text-gray-600">Route</p>
            {isRouteLong ? (
              <Marquee speed={30} pauseOnHover gradient={false}>
                <span className="text-sm font-semibold text-gray-900 pr-8">
                  {routeText}
                </span>
              </Marquee>
            ) : (
              <p className="text-sm font-semibold text-gray-900">{routeText}</p>
            )}
          </div>
          <div className="shrink-0">
            <p className="text-xs text-gray-600">Transport</p>
            <p className="text-sm font-semibold text-lime-600 whitespace-nowrap">
              {transportType}
            </p>
          </div>
        </div>

        {/* Date and Time - Single Line */}
        <div className="flex items-center justify-between text-xs text-gray-600">
          <p className="truncate">
            {departureDate} • {formatTime(departureTime)}
          </p>
          {isTimePassed() && (
            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap ml-2">
              N/A
            </span>
          )}
        </div>

        {/* Price and Quantity - Side by Side */}
        <div className="flex justify-between items-center gap-2 py-2 border-t border-b">
          <div>
            <p className="text-xs text-gray-600">Price</p>
            <p className="text-base font-bold text-lime-600">${price}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Available</p>
            <p className="text-base font-bold text-gray-900">{quantity}</p>
          </div>
        </div>

        {/* Perks - Compact */}
        {perks && perks.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {perks.slice(0, 2).map((perk, index) => (
              <span
                key={index}
                className="bg-lime-100 text-lime-800 px-2 py-0.5 rounded text-xs"
              >
                {perk}
              </span>
            ))}
            {perks.length > 2 && (
              <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs">
                +{perks.length - 2}
              </span>
            )}
          </div>
        )}

        {/* See Details Button */}
        <Link
          to={`/ticket/${_id}`}
          className="w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold py-1.5 rounded transition text-center block text-sm mt-auto"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
