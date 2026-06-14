import Navbar from "./Navbar";
import Footer from "./Footer";

const PageLayout = ({ title, subtitle, children }) => {
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {(title || subtitle) && (
            <div className="text-center mb-12">
              {title && <h1 className="text-5xl font-bold text-gray-900 mb-4">{title}</h1>}
              {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
            </div>
          )}
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageLayout;