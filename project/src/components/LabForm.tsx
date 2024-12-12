//HOOKS
import React, { useState } from 'react';
import { useForm, } from "react-hook-form"
import  type { FieldValues } from "react-hook-form"

//ICONS
import { Plus, Trash2 } from 'lucide-react';

//COMPONENTS
import { TestMethodModal } from './TestMethodModal';

//TYPES
import { Lab, TestMethod } from '../types/lab';

//STORE
import { useLabDataStore } from '../store';




export const LabForm: React.FC = (
) => {

  //REACT HOOK FORM

  const {register,handleSubmit,formState:{errors }}=useForm();

  //ZUSTAND STORE DATA
  const selectedLabZus=useLabDataStore((state)=>state.selectedLab)
  const updateLab=useLabDataStore((state)=>state.updateLab)
  const addnew=useLabDataStore((state)=>state.addnew)
  const setModel=useLabDataStore((state)=>state.setModal)
  const lab=useLabDataStore((state)=>state.selectedLab)
 

  //LOCAL STATE MANAGEMENT

  const [testMethods, setTestMethods] = useState<TestMethod[]>(lab?.testMethods || []);
  const [isTestMethodModalOpen, setIsTestMethodModalOpen] = useState(false);
  const [selectedTestMethod, setSelectedTestMethod] = useState<TestMethod | undefined>();
  const [testMethodError,setTestMethodError]=useState(false)

  const handleFormSubmit = (data:FieldValues) => {

    // e.preventDefault();
    // const formData = new FormData(e.target as HTMLFormElement);

   

    if(testMethods.length === 0){
      setTestMethodError(true)
      return;
      
    }
    
    const labData: Partial<Lab> = {
      labName: data.labName as string,
      location: data.location as string,
      contactPerson: data.contactPerson as string,
      contactNumber: data.contactNumber as string,
      servicesOffered: (data.servicesOffered as string).split(',').map(s => s.trim()),
      status: data.status as string,
      testMethods: testMethods
    };

    //DISPLATCHING LAB ADDITION AND UPDATION

    if (selectedLabZus) {
      updateLab(labData,selectedLabZus)
    } else {
     
      addnew(labData);
    }
    setModel(false);

  };




  const handleAddTestMethod = () => {
    setSelectedTestMethod(undefined);
    setIsTestMethodModalOpen(true);
  };

  const handleEditTestMethod = (method: TestMethod) => {  
    setSelectedTestMethod(method);
    setIsTestMethodModalOpen(true);
  };

  const handleSaveTestMethod = (method: TestMethod) => {
    if (selectedTestMethod) {
      setTestMethods(prev => 
        prev.map(m => m === selectedTestMethod ? method : m)
      );
    } else {
      setTestMethods(prev => [...prev, method]);
    }
    setIsTestMethodModalOpen(false);
  };

  const handleDeleteTestMethod = (method: TestMethod) => {
    setTestMethods(prev => prev.filter(m => m !== method));
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {
          testMethodError &&<p className='text-red-900'>Please Add Test Method Before Proceeding</p>
        }
        <div className="grid grid-cols-2 gap-4">
       
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Laboratory Name
            </label>
            <input
              {
                ...register("labName",{
                  required:"labname is Required"
                })
              }
              type="text"
              name="labName"
              defaultValue={lab?.labName}
              className="w-full p-2 border rounded-md"
              // required
            />
            {
              errors.labName && <p className='text-red-700'>{`${errors.labName.message}`}</p>
            }
            
            
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
             {
              ...register("location",{
                required:"Location is Required"
              })
            }
              type="text"
              name="location"
              defaultValue={lab?.location}
              className="w-full p-2 border rounded-md"
              
            />
           { errors.location && <p className='text-red-700'>{`${errors?.location?.message}`}</p>}

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Person
            </label>
            <input 
              {
                ...register("contactPerson",{
                  required:"ContactPerson is Required"
                })
              }
              
              type="text"
              name="contactPerson"
              defaultValue={lab?.contactPerson}
              className="w-full p-2 border rounded-md"
            
            />

{ errors.contactPerson && <p className='text-red-700'>{`${errors?.contactPerson?.message}`}</p>}

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              {
                ...register("contactNumber" ,{
                  required:"Contact Number Is Requires"
                })
              }
              type="text"
              name="contactNumber"
              defaultValue={lab?.contactNumber}
              className="w-full p-2 border rounded-md"
            
            />
            { errors.contactNumber && <p className='text-red-700'>{`${errors?.contactNumber?.message}`}</p>}

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Services Offered (comma-separated)
            </label>
            <input
              {
                ...register("servicesOffered" ,{
                  required:"Serivces Offeres is Required Field"
                })
              }
              type="text"
              name="servicesOffered"
              defaultValue={lab?.servicesOffered.join(', ')}
              className="w-full p-2 border rounded-md"
             
            />
   { errors.servicesOffered && <p className='text-red-700'>{`${errors?.servicesOffered?.message}`}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              {
                ...register("status",{
                  required:"status is required"
                })
              }
              
              name="status"
              defaultValue={lab?.status || 'Active'}
              className="w-full p-2 border rounded-md"
              
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Test Methods</h3>
            <button
              type="button"
              onClick={handleAddTestMethod}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4" />
              Add Method
            </button>
          </div>

          <div className="space-y-3">
            {testMethods.map((method, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-3 bg-gray-50 rounded-md"
              >
                <div>
                  <div className="font-medium text-gray-900">{method.method}</div>
                  <div className="text-sm text-gray-600">
                    Parameters: {method.parameters.join(', ')}
                  </div>
                  <div className="text-sm text-gray-600">
                    Sample Type: {method.sampleType}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditTestMethod(method)}
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTestMethod(method)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={()=>setModel(false)}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {lab ? 'Save Changes' : 'Add Laboratory'}
          </button>
        </div>
      </form>

      <TestMethodModal
        testMethod={selectedTestMethod}
        isOpen={isTestMethodModalOpen}
        onClose={() => setIsTestMethodModalOpen(false)}
        onSave={handleSaveTestMethod}
      />
    </>
  );
};