import Carousel from "../../components/Home/Carousel";
import AdvertisedTickets from "../../components/Home/AdvertisedTickets";
import LatestTickets from "../../components/Home/LatestTickets";
import PopularRoutes from "../../components/Home/PopularRoutes";
import FAQ from "../../components/Home/FAQ";

const Home = () => {
  return (
    <div>
      <Carousel />
      <AdvertisedTickets />
      <LatestTickets />
      <PopularRoutes />
      <FAQ />
      {/* More components */}
    </div>
  );
};

export default Home;
