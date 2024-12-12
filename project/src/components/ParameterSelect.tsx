import React from 'react';

//HOOK-FORM
import  type { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

//CONSTANTS 
import { PARAMETER_OPTIONS } from '../data/parameterOptions';



interface ParameterSelectProps {
  sampleType: string;
  value: string;
  onChange: (value: string) => void;
  register:UseFormRegister<FieldValues>
  errors:FieldErrors<FieldValues>
}

const ParameterSelect: React.FC<ParameterSelectProps> = ({
  sampleType,
  onChange,
  register,
  errors
}) => {
  const options = sampleType.toLowerCase() === 'water' 
    ? PARAMETER_OPTIONS.water 
    : sampleType.toLowerCase() === 'oil'
    ? PARAMETER_OPTIONS.oil
    : sampleType.toLowerCase() === 'air'
    ? PARAMETER_OPTIONS.air
    : sampleType.toLowerCase() === 'metal'
    ? PARAMETER_OPTIONS.metal
    : [];

    const parameterField = register("parameter", { required: true });


  return (
    <>
    
    <select
     {
      ...register("parameter",{
        required:"Please Select Paramter"
      })
     }
      // value={value}
      onChange={(e) => {
        parameterField.onChange(e)
        onChange(e.target.value)
      
      }}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      disabled={!sampleType}
    >
      <option value="">Select parameter...</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {
  errors.parameter && <p className='text-red-700'>{`${errors.parameter?.message}`}</p>
   }
    </>
    
    
  );
}

export default ParameterSelect;