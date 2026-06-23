import { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import FeaturedPages from '../components/home/FeaturedPages';
import AboutSection from '../components/home/AboutSection';
import { getAllTemplates } from '../data/templates';

const Home = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const templates = getAllTemplates();
    setPages(templates);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink/10 via-pastel-yellow/10 to-pastel-sky/10">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <FeaturedPages pages={pages} loading={loading} />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Home;