import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';
import HowItWorks from '../components/home/HowItWorks';


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <CategoryGrid />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Home;