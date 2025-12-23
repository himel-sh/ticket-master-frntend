import Carousel from "../../components/Home/Carousel";
import AdvertisedTickets from "../../components/Home/AdvertisedTickets";
import LatestTickets from "../../components/Home/LatestTickets";
import Tickets from "../../components/Home/Tickets";

const Home = () => {
  return (
    <div>
      <Carousel />
      <AdvertisedTickets />
      <LatestTickets />
      <Tickets />
      {/* More components */}
    </div>
  );
};

export default Home;
