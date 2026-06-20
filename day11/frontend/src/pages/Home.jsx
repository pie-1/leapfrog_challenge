import Navbar from '../components/common/Navbar';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import FeaturedPages from '../components/home/FeaturedPages';
import AboutSection from '../components/home/AboutSection';
import Footer from '../components/common/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink/10 via-pastel-yellow/10 to-pastel-sky/10">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <FeaturedPages />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Home;