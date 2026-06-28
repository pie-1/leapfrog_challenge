import { motion } from 'framer-motion';

export default function TimelineResult({ timeline }) {
  if (!timeline) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📅</span>
        <h2 className="font-serif text-lg text-gray-800">Wedding Timeline</h2>
      </div>
      <div className="prose prose-sm max-w-none max-h-[500px] overflow-y-auto">
        <div className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
          {timeline}
        </div>
      </div>
    </motion.div>
  );
}