
import { LabGrid } from './components/LabGrid';
// import { labData } from './data/labData';
import { Microscope } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1500PX] mx-auto">
        <div className="mb-8 flex items-center gap-3">
          <Microscope className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Lab Management</h1>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Laboratory Locations</h2>
          <LabGrid  />
        </div>
      </div>
    </div>
  );
}

export default App;