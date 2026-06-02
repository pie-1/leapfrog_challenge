import Create from "./components/Create";
import Read from "./components/Read";

const App = () => {
  return (
    <div className="min-h-screen bg-black px-20 py-16">
      <div className="flex justify-between gap-20">
        <Create />
        <Read />
      </div>
    </div>
  );
};

export default App;