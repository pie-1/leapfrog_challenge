import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrekkerForm from "../components/TrekkerForm";
import Footer from "../components/Footer";
import PopularTreks from "../components/PopularTreks";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />

      <PopularTreks/>
      <TrekkerForm />
      <Footer />
    </>
  );
};

export default Home;