import Navbar from "../components/common/Navbar";
import Hero from "../components/home/Hero";
import TrekkerForm from "../components/home/TrekkerForm";
import PopularTreks from "../components/home/PopularTreks";
import Footer from "../components/common/Footer";
import AnimatedSection from "../components/common/AnimatedSection.jsx";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AnimatedSection>
        <TrekkerForm />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <PopularTreks />
      </AnimatedSection>
      <Footer />
    </>
  );
};

export default Home;