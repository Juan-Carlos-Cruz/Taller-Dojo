import React from 'react';

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPaginate,
}) {
  if (!totalItems) return null;

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);
  const pageNums = Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1);

  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="text-sm text-gray-700">
        Showing <span className="font-medium">{start}</span> to{' '}
        <span className="font-medium">{end}</span> of{' '}
        <span className="font-medium">{totalItems}</span> results
      </div>

      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPaginate(1)}
          className={`px-3 py-1 rounded text-sm ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
          disabled={currentPage === 1}
        >
          First
        </button>

        <button
          onClick={() => onPaginate(Math.max(1, currentPage - 1))}
          className={`px-3 py-1 rounded text-sm ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {pageNums.map((n) => (
          <button
            key={n}
            onClick={() => onPaginate(n)}
            className={`px-3 py-1 rounded text-sm ${
              currentPage === n
                ? 'bg-blue-500 text-white border border-blue-500'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            {n}
          </button>
        ))}

        <button
          onClick={() => onPaginate(Math.min(totalPages, currentPage + 1))}
          className={`px-3 py-1 rounded text-sm ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>

        <button
          onClick={() => onPaginate(totalPages)}
          className={`px-3 py-1 rounded text-sm ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
}
