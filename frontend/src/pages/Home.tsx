import Hero from "../components/Hero";
import UsedBySection from "../components/UsedBySection";
import ProductsSection from "../components/ProductSection";
import { VideoReviews } from "../components/VideoReview";

const Home = () => {
  return (
    <div>
      <Hero />
      <UsedBySection />
      <VideoReviews />
      <ProductsSection />
    </div>
  );
};

export default Home;
