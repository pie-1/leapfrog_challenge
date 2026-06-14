import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TrekkerForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fitness: "",
    budget: "",
    days: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = () => {
    // Navigate to routes page with budget filter
    if (form.budget) {
      navigate(`/routes?maxBudget=${form.budget}`);
    } else {
      navigate("/routes");
    }
  };

  return (
    <section id= "trekker-form" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Find Your Perfect Trek
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Tell us your preferences and we'll find the best route for you
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fitness Level
              </label>
              <select
                name="fitness"
                value={form.fitness}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget (NPR)
              </label>
              <input
                type="number"
                name="budget"
                placeholder="e.g., 50000"
                value={form.budget}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Days Available
              </label>
              <input
                type="number"
                name="days"
                placeholder="e.g., 7"
                value={form.days}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Generate Route →
          </motion.button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Based on your budget: {form.budget ? `₹${form.budget} NPR` : "any budget"}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrekkerForm;