import Carousel from "../../components/Home/Carousel";
import AdvertisedTickets from "../../components/Home/AdvertisedTickets";
import LatestTickets from "../../components/Home/LatestTickets";
import FAQ from "../../components/Home/FAQ";

const Home = () => {
  return (
    <div>
      <Carousel />
      <AdvertisedTickets />
      <LatestTickets />
      <FAQ />
      {/* More components */}
    </div>
  );
};

export default Home;
