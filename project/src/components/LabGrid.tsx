//HOOKS
import React, { useMemo } from 'react';

//AG-GRID
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

//ICONS
import { CircleDot } from 'lucide-react';

//COMPONENTS
import { Lab, TestMethod } from '../types/lab';
import { LabModal } from './LabModal';

//ZUSTAND STORE
import { useLabDataStore } from '../store';

// interface LabGridProps {
//   data: Lab[];
// }

const TestMethodsRenderer: React.FC<ICellRendererParams> = (props) => {
  const lab = props.data as Lab;
  
  return (
    <div className="p-2">
      {lab.testMethods.map((method: TestMethod, index: number) => (
        <div key={index} className="mb-3 last:mb-0">
          <div className="flex items-start gap-2">
            <CircleDot className="w-4 h-4 mt-1 text-indigo-600 flex-shrink-0" />
            <div>
              <div className="font-medium text-gray-900">{method.method}</div>
              <div className="text-sm text-gray-600">
                Parameters: {method.parameters.join(', ')}
              </div>
              <div className="text-sm text-gray-600">
                Sample Type: {method.sampleType}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const LabGrid: React.FC = () => {


  // const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [labData, setLabData] = useState<Lab[]>(data);
  // const updateLab=useLabDataStore((state)=>state.updateLab)
  // const addnew=useLabDataStore((state)=>state.addnew)
    // const ismodelOpen=useLabDataStore((state)=>state.isModelOpen)

  const labs=useLabDataStore((state)=>state.labs);
  const setLabToEdit=useLabDataStore((state)=>state.setLabToEdit)
  const setModel=useLabDataStore((state)=>state.setModal)
  
  const handleIdClick = (lab: Lab) => {
    setLabToEdit(lab);
    setModel(true);
  };

  const handleAddNew = () => {
    setLabToEdit(null);
    setModel(true);
  };

  // const handleSave = (updatedLabData: Partial<Lab>) => {
  //   if (selectedLabZus) {
  //     updateLab(updatedLabData,selectedLabZus)
  //   } else {
  //     // Add new lab
  //     addnew(updatedLabData);
  //     // const newLab: Lab = {
  //     //   id: Math.max(...labData.map(lab => lab.id)) + 1,
  //     //   ...updatedLabData as Omit<Lab, 'id'>
  //     // };
  //     // setLabData(prevData => [...prevData, newLab]);
  //   }
  //   setIsModalOpen(false);
  // };

  const columnDefs = useMemo<ColDef[]>(() => [
    {
      field: 'id',
      headerName: 'ID',
      sortable: true,
      filter: true,
      width: 80,
      cellStyle: { 
        fontWeight: '500',
        cursor: 'pointer',
        color: '#4f46e5'
      },
      onCellClicked: (params) => handleIdClick(params.data)
    },
    { 
      field: 'labName',
      headerName: 'Laboratory Name',
      sortable: true,
      filter: true,
      flex: 1
    },
    {
      field: 'location',
      sortable: true,
      filter: true,
      flex: 1
    },
    {
      field: 'contactPerson',
      headerName: 'Contact Person',
      sortable: true,
      filter: true,
      flex: 1
    },
    {
      field: 'contactNumber',
      headerName: 'Contact Number',
      sortable: true,
      filter: true,
      flex: 1
    },
    {
      field: 'servicesOffered',
      headerName: 'Services',
      sortable: true,
      filter: true,
      flex: 1.5,
      valueFormatter: (params) => params.value.join(', ')
    },
    {
      field: 'status',
      sortable: true,
      filter: true,
      flex: 0.8,
      cellStyle: (params) => ({
        color: params.value === 'Active' ? '#16a34a' : '#dc2626',
        fontWeight: 'bold'
      })
    },
    {
      headerName: 'Test Methods',
      field: 'testMethods',
      flex: 1.5,
      sortable: false,
      filter: false,
      cellRenderer: TestMethodsRenderer,
      autoHeight: true,
      wrapText: true
    }
  ], []);

  const defaultColDef = useMemo(() => ({
    resizable: true,
  }), []);

  return (
    <>
      <div className="mb-4 flex justify-end">
        {/* <button
          onClick={handleAddNew}
          className="text-white flex gap-2 items-center bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <Plus className="w-4 h-4" />
          AddNew Lab
        </button> */}

        <button 
         onClick={handleAddNew}
        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-green-400 bg-white rounded-md hover:text-gray-900 group-hover:bg-opacity-0">
Add Lab
</span>
</button>
      </div>

      <div className="ag-theme-alpine w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
        <AgGridReact
          rowData={labs}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          pagination={true}
          paginationPageSize={10}
          domLayout="autoHeight"
        />
      </div>
      
      <LabModal     
      />
    </>
  );
};