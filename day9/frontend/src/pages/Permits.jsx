import PageLayout from "../components/PageLayout";
import { FileText, Download, MapPin } from "lucide-react";

const Permits = () => {
  const permitsData = [
    {
      trek: "Everest Base Camp",
      permits: [
        { name: "Sagarmatha National Park Permit", cost: "NPR 3000", where: "Kathmandu or Monjo" },
        { name: "Khumbu Pasang Lhamu Permit", cost: "NPR 2000", where: "Kathmandu" },
        { name: "TIMS Card", cost: "NPR 2000", where: "TAAN/NTB office" }
      ]
    },
    {
      trek: "Annapurna Circuit",
      permits: [
        { name: "ACAP Permit", cost: "NPR 3000", where: "Kathmandu or Pokhara" },
        { name: "TIMS Card", cost: "NPR 2000", where: "TAAN/NTB office" }
      ]
    },
    {
      trek: "Manaslu Circuit",
      permits: [
        { name: "Manaslu Restricted Permit", cost: "USD 100/week", where: "Kathmandu only" },
        { name: "ACAP Permit", cost: "NPR 3000", where: "Kathmandu" },
        { name: "TIMS Card", cost: "NPR 2000", where: "TAAN office" }
      ]
    },
    {
      trek: "Langtang Valley",
      permits: [
        { name: "Langtang National Park Permit", cost: "NPR 3000", where: "Kathmandu or Dhunche" },
        { name: "TIMS Card", cost: "NPR 2000", where: "TAAN/NTB office" }
      ]
    }
  ];

  return (
    <PageLayout 
      title="📋 Trekking Permits" 
      subtitle="All required permits for popular treks in Nepal"
    >
      <div className="space-y-6">
        {permitsData.map((trek, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-4">
              <h2 className="text-xl font-bold text-white">{trek.trek}</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {trek.permits.map((permit, i) => (
                  <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{permit.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <MapPin size={14} />
                        <span>Get at: {permit.where}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {permit.cost}
                      </span>
                      <button className="text-green-600 hover:text-green-700">
                        <FileText size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <h3 className="font-bold text-yellow-800 mb-2">💡 Important Notes</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Permits can be obtained in Kathmandu (Nepal Tourism Board office)</li>
          <li>• Carry 2-3 passport-size photos for permits</li>
          <li>• Some restricted areas require a licensed guide</li>
          <li>• Prices may change - verify before your trek</li>
        </ul>
      </div>
    </PageLayout>
  );
};

export default Permits;