import React from 'react';

export default function ActionBar({
  searchTerm,
  onSearchChange,
  itemsPerPage,
  onItemsPerPageChange,
  onResetForm,
  loading,
}) {
  return (
    <div className="bg-white p-4 mb-6 rounded-lg shadow flex justify-between items-center">
      <div className="flex space-x-2">
        <button
          onClick={onResetForm}
          className="bg-blue-500 text-white px-4 py-2 rounded font-medium hover:bg-blue-600 transition-colors"
        >
          ➕ ADD NEW
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-medium hover:bg-gray-300 transition-colors">
          📤 EXPORT
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search Last name"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <button className="bg-gray-200 px-3 py-2 ml-1 rounded" aria-label="search" title="Search">
            🔎
          </button>
        </div>

        <div className="flex items-center ml-4">
          <span className="text-sm mr-2">Results</span>
          <select
            className="border border-gray-300 rounded px-2 py-2 text-sm"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(parseInt(e.target.value, 10))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="text-sm bg-green-500 px-3 py-1 rounded ml-4 text-white">
          {loading ? 'Loading...' : 'Connected'}
        </div>
      </div>
    </div>
  );
}
