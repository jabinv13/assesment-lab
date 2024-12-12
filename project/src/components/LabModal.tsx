import React from 'react';
//ICONS 
import { X } from 'lucide-react';

//COMPONENTS
import { LabForm } from './LabForm';

//STORE
import { useLabDataStore } from '../store';



export const LabModal: React.FC= (
  
  
  
) => {

  const setModel=useLabDataStore((state)=>state.setModal)
  const openModel=useLabDataStore((state)=>state.isModelOpen)
  const lab=useLabDataStore((state)=>state.selectedLab)


  if (!openModel) return null;

  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {lab ? 'Edit Laboratory' : 'Add New Laboratory'}
          </h2>
          <button
            onClick={()=>{setModel(false)}}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <LabForm
         
        />
      </div>
    </div>
  );
};