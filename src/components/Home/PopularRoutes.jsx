import Container from "../Shared/Container";
import Heading from "../Shared/Heading";
import { FaBus, FaTrain } from "react-icons/fa";

const PopularRoutes = () => {
  const routes = [
    {
      id: 1,
      from: "Dhaka",
      to: "Chittagong",
      type: "Bus",
      icon: FaBus,
      color: "bg-blue-100 text-blue-600",
      passengers: "2,450+",
    },
    {
      id: 2,
      from: "Dhaka",
      to: "Sylhet",
      type: "Train",
      icon: FaTrain,
      color: "bg-green-100 text-green-600",
      passengers: "1,890+",
    },
    {
      id: 3,
      from: "Dhaka",
      to: "Cox's Bazar",
      type: "Bus",
      icon: FaBus,
      color: "bg-purple-100 text-purple-600",
      passengers: "3,120+",
    },
    {
      id: 4,
      from: "Dhaka",
      to: "Khulna",
      type: "Bus",
      icon: FaBus,
      color: "bg-orange-100 text-orange-600",
      passengers: "1,560+",
    },
    {
      id: 5,
      from: "Chittagong",
      to: "Cox's Bazar",
      type: "Bus",
      icon: FaBus,
      color: "bg-red-100 text-red-600",
      passengers: "2,780+",
    },
    {
      id: 6,
      from: "Dhaka",
      to: "Rajshahi",
      type: "Train",
      icon: FaTrain,
      color: "bg-indigo-100 text-indigo-600",
      passengers: "1,340+",
    },
  ];

  return (
    <Container>
      <div className="py-16">
        <Heading
          title="Popular Routes"
          subtitle="Explore the most traveled routes on TicketMaster"
          center={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {routes.map((route) => {
            const IconComponent = route.icon;
            return (
              <div
                key={route.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border border-gray-100"
              >
                {/* Icon and Type */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${route.color}`}>
                    <IconComponent size={24} />
                  </div>
                  <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {route.type}
                  </span>
                </div>

                {/* Route Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {route.from} → {route.to}
                  </h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{route.passengers}</span>{" "}
                    passengers this month
                  </p>
                </div>

                {/* Book Button */}
                <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded transition text-sm">
                  View Tickets
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default PopularRoutes;
