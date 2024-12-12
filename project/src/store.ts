import { create } from 'zustand'
import { Lab } from './types/lab';
import { labData } from './data/labData';

type LabDataStore={
    labs:Lab[];
    updateLab:(updatedLabData:Partial<Lab>,selectedLab:Lab)=>void;
    addnew:(updatedLabData:Partial<Lab>)=>void;
    selectedLab:Lab|null;
    setLabToEdit:(lab:Lab|null)=>void;
    isModelOpen:boolean;
    setModal:(open:boolean)=>void
    

}


export const useLabDataStore = create<LabDataStore>((set) => ({
  labs: labData,
  updateLab:(updatedLabData,selectedLab)=>set((state)=>({
   labs: state.labs.map(lab => (lab.id === selectedLab.id ? { ...selectedLab, ...updatedLabData } : lab))
  })),
  addnew:(updatedLabData:Partial<Lab>)=>set((state)=>({
   
  labs:[
    ...state.labs,{
        id: Math.max(...state.labs.map(lab => lab.id)) + 1,
        ...updatedLabData as Omit<Lab, 'id'> 
    }
  ]

  })) ,
  selectedLab:null,
  setLabToEdit:(lab:Lab | null)=>set(()=>({

    selectedLab:lab

  })),
  isModelOpen:false,
  setModal:(open:boolean)=>set(()=>({

    
    isModelOpen:open
   
  }))
  
}))



