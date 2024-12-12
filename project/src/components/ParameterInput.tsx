import React from 'react';

//ICONS 
import {Wind,Wrench,Droplet, Flame } from 'lucide-react';

interface ParameterInputProps {
  parameters: string[] | undefined;
  onRemove: (index: number) => void;
  sampleType: string;
}

const ParameterInput: React.FC<ParameterInputProps> = ({ parameters, onRemove, sampleType }) => {
  const getIcon = () => {
    switch (sampleType.toLowerCase()) {
      case 'water':
        return <Droplet className="h-4 w-4 text-blue-500" />;
      case 'oil':
        return <Flame className="h-4 w-4 text-orange-500" />;
      case 'metal':
        return <Wrench className="h-4 w-4 text-green-400" />;
      case 'air':
        return <Wind className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getParameterStyle = () => {
    switch (sampleType.toLowerCase()) {
      case 'water':
        return 'bg-blue-50 border-blue-200';
      case 'oil':
        return 'bg-orange-50 border-orange-200';
      case 'air':
        return 'bg-green-50 border-blue-200';
      case 'metal':
        return 'bg-red-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-2">
      {parameters?.map((param, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-2 rounded-md border ${getParameterStyle()}`}
        >
          <div className="flex items-center gap-2">
            {getIcon()}
            <span>{param}</span>
          </div>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ParameterInput;