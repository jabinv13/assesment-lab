import React from 'react';

//ICONS
import { X } from 'lucide-react';

//TYPES
import { TestMethod } from '../types/lab';

//COMPONENTS

import { TestMethodForm } from './TestMethodForm';


interface TestMethodModalProps {
  testMethod?: TestMethod;
  isOpen: boolean;
  onClose: () => void;
  onSave: (method: TestMethod) => void;
}

export const TestMethodModal: React.FC<TestMethodModalProps> = ({
  testMethod,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {testMethod ? 'Edit Test Method' : 'Add New Test Method'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <TestMethodForm
          testMethod={testMethod}
          onSubmit={onSave}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};