import Create from "./components/Create";
import Read from "./components/Read";

const App = () => {
  return (
    <div className="min-h-screen bg-[#16233d] px-20 py-16">
      <div className="flex justify-between gap-20">
        {/* Left Side - Create Note */}
        <Create />

        {/* Right Side - My Notes */}
        <Read />
      </div>
    </div>
  );
};

export default App;