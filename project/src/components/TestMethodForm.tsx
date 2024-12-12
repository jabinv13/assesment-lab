//HOOKS
import React, { useEffect } from 'react';
import { useForm, } from "react-hook-form"
import  type { FieldValues } from "react-hook-form"

//COMPONENTS
import ParameterSelect from './ParameterSelect';

//TYPES
import { TestMethod } from '../types/lab';




import { PARAMETER_OPTIONS } from '../data/parameterOptions';
import ParameterInput from './ParameterInput';

interface TestMethodFormProps {
  testMethod?: TestMethod;
  onSubmit: (method: TestMethod) => void;
  onCancel: () => void;
}

export const TestMethodForm: React.FC<TestMethodFormProps> = ({
  testMethod,
  onSubmit,
  onCancel,
}) => {

  const {register,handleSubmit,formState:{
    errors
  }}=useForm();

  // const [method, setMethod] = React.useState('');
  const [parameters, setParameters] = React.useState<string[]>( []);
  const [sampleType, setSampleType] = React.useState('');
  const [selectedParameter, setSelectedParameter] = React.useState('');

  useEffect(()=>{

    if(testMethod){
      setParameters(()=>testMethod.parameters);
      setSampleType(()=>testMethod.sampleType)
    }
  },[testMethod])

  

  const handleSampleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParameters([])
    setSampleType(e.target.value);
    setSelectedParameter('');
    setParameters([]);
  };

  

  

  const addParameter = () => {
    
    if (selectedParameter) {
      const parameterOption = PARAMETER_OPTIONS[sampleType.toLowerCase() as keyof typeof PARAMETER_OPTIONS]
        .find(option => option.value === selectedParameter);
      
      if (parameterOption && !parameters.includes(parameterOption.label)) {
        setParameters([...parameters, parameterOption.label]);
        setSelectedParameter('');
      }
    }
  };

  const handleFormSubmit = (data:FieldValues) => {

    console.log(data)

   
  
    onSubmit({
      method:data.method,
      parameters,
      sampleType
    });
    // setMethod('');
    setParameters([]);
    setSampleType('');
    setSelectedParameter('');
  };

  const removeParameter=(index:number)=>{

   
    const  newArray = parameters.filter((_, i) => i !== index);
    // const newParams=parameters.splice(index, 1);
    setParameters(newArray)
    // console.log(newArray)
   
    
  }


  const sampleTypeField = register("sampleType", { required: true });


  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Test Method
          </label>
          <input 
            {
              ...register("method",{
                required:"A Test Method is Required",
                

              })
            }
            // onChange={(e) => setMethod(e.target.value)}
            type="text"
            name="method"
            defaultValue={testMethod?.method}
            placeholder="e.g., ASTM D445"
            className="w-full p-2 border rounded-md"
           
          />
          {
  errors.method && <p className='text-red-700'>{`${errors?.method?.message}`}</p>
   }
          
        </div>

           <div>
              <label className="block text-sm font-medium text-gray-700">Sample Type</label>
              <select
              {
                ...register("sampleType",{
                  required:"Sample Type is Required"
                })
              }
                
                value={sampleType}
                onChange={(e)=>{
                  sampleTypeField.onChange(e)
                  handleSampleTypeChange(e)
                
                }}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                
              >
                <option  value="">Select type...</option>
                <option value="Water">Water</option>
                <option value="Oil">Oil</option>
                <option value="Metal">Metal</option>
                <option value="Air">Air</option>
              </select>
              {
  errors.sampleType && <p className='text-red-700'>{`${errors.sampleType?.message}`}</p>
   }
            </div>


        <div>
              <label className="block text-sm font-medium text-gray-700">Parameters</label>
              <div className="flex gap-2">
                <ParameterSelect
                  errors={errors}         
                  register={register}
                  sampleType={sampleType}
                  value={selectedParameter}
                  onChange={setSelectedParameter}
                />
                <button
                  type="button"
                  onClick={addParameter}
                  disabled={!selectedParameter}
                  className="mt-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="mt-2">
              <ParameterInput
              parameters={ parameters }
              onRemove={removeParameter}
              sampleType={sampleType}
              />
            </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {testMethod ? 'Update Method' : 'Add Method'}
        </button>
      </div>
    </form>
  );
};