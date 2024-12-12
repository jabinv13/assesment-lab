//AG-GRID
import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

//TYPES
import { TestMethod } from '../types/lab';


interface TestMethodsGridProps {
  data: TestMethod[];
}

export const TestMethodsGrid: React.FC<TestMethodsGridProps> = ({ data }) => {
  const columnDefs = useMemo<ColDef[]>(() => [
    {
      field: 'method',
      headerName: 'Test Method',
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: 'parameters',
      headerName: 'Parameters',
      flex: 1.5,
      sortable: true,
      filter: true,
      valueFormatter: (params) => params.value.join(', ')
    },
    {
      field: 'sampleType',
      headerName: 'Sample Type',
      flex: 1,
      sortable: true,
      filter: true,
    }
  ], []);

  const defaultColDef = useMemo(() => ({
    resizable: true,
  }), []);

  return (
    <div className="ag-theme-alpine h-[200px] w-full">
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
      />
    </div>
  );
};