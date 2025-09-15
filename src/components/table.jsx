// src/components/CustomTable.jsx
import React from "react";
import Button from "./button"; // tu componente de botones

const CustomTable = ({ title = "Lista", columns = [], data = [], onEdit, onDelete }) => {
  return (
    <div className="w-full">
      <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
        <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        </div>

        <div className="p-0 overflow-x-auto">
          <table className="w-full mt-4 text-left table-auto">
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className="p-4 border-y border-slate-200 bg-slate-50 text-sm font-normal text-slate-500"
                  >
                    {col}
                  </th>
                ))}
                <th className="p-4 border-y border-slate-200 bg-slate-50 text-sm font-normal text-slate-500">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="p-4 border-b border-slate-200">
                      {row[col]}
                    </td>
                  ))}

                  <td className="p-4 border-b border-slate-200 flex gap-2">
                    <Button variant="editar" onClick={() => {
                      console.log('🔧 Botón Editar clickeado para fila:', row);
                      onEdit(row);
                    }}>
                      Editar
                    </Button>
                    <Button variant="cancelar" onClick={() => {
                      console.log('🗑️ Botón Eliminar clickeado para ID:', row.id);
                      if (!row.id || row.id === "" || row.id === null) {
                        console.error('❌ ID inválido para eliminar:', row.id);
                        alert('Error: No se puede eliminar este elemento porque no tiene un ID válido');
                        return;
                      }
                      onDelete(row.id);
                    }}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
