const Pagination = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="flex justify-center items-center gap-6 mt-16">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
        className="border border-gray-400 px-8 py-3.5 rounded-xl hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
      >
        ← Previous
      </button>

      <div className="text-2xl font-light px-8 py-3 bg-[#0d1a33] rounded-xl border border-gray-700">
        Page <span className="text-violet-400">{currentPage}</span>
      </div>

      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="border border-gray-400 px-8 py-3.5 rounded-xl hover:bg-white hover:text-black transition-all text-lg"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
