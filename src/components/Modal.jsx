import React from 'react';

const ModalComponent = ({ isOpen, onClose, headings, tableData }) => {
  return (
    isOpen && (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
        <div className='bg-white p-4 rounded-lg w-225'>
          <h2 className='text-lg font-semibold mb-4'>All Users</h2>
          <div className='overflow-x-auto mr-4'>
            <table className='w-full'>
              <thead>
                <tr>
                  {headings.map((heading, index) => (
                    <th key={index} className='border px-4 py-2'>
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((rowData, rowIndex) => (
                  <tr key={rowIndex}>
                    {rowData.map((cellData, cellIndex) => (
                      <td key={cellIndex} className='border px-4 py-2 mr-4'>
                        {cellData}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={onClose} className='mt-4 px-4 py-2 bg-green-600 text-white rounded'>
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default ModalComponent;
