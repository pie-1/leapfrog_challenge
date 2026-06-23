import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { currentUser } = useAuth();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-6 py-10"
    >
      <h1 className="text-3xl font-serif text-rose-700">
        Welcome, {currentUser?.displayName || "Couple"}!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 bg-white rounded-xl shadow-md border-l-4 border-rose-500">
          <h3 className="font-semibold">Upcoming Events</h3>
          <p className="text-2xl font-bold text-rose-600">5</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md border-l-4 border-amber-500">
          <h3 className="font-semibold">Pending Tasks</h3>
          <p className="text-2xl font-bold text-amber-600">12</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md border-l-4 border-emerald-500">
          <h3 className="font-semibold">Budget Spent</h3>
          <p className="text-2xl font-bold text-emerald-600">₹1,25,000</p>
        </div>
      </div>
    </motion.div>
  );
}