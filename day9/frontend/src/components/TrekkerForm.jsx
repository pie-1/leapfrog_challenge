import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = () => {
    localStorage.setItem("trekData", JSON.stringify(form));

    navigate("/results");
  };

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">

        <h2 className="text-3xl font-bold mb-8">
          Plan Your Adventure
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <select
            name="fitness"
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="">Fitness Level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <input
            type="number"
            name="budget"
            placeholder="Budget (NPR)"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="number"
            name="days"
            placeholder="Days Available"
            onChange={handleChange}
            className="border p-3 rounded"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
        >
          Generate Route
        </button>

      </div>
    </section>
  );
};

export default TrekkerForm;