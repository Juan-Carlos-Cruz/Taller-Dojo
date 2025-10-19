import React from 'react';
import { formatDateTime } from '../utils/date';

export default function ActorTable({ items, onEdit, onDelete, loading }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actor id</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">First name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Last name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Last update</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Film</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600" title="View">
                      👁️
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600"
                      onClick={() => onEdit(item)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                      onClick={() => onDelete(item.id)}
                      title="Delete"
                    >
                      ❌
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDateTime(item.lastUpdate)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    {item.filmCount || 0} Show
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {items.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">📭</div>
          <h3 className="text-xl font-semibold mb-2">No actors found</h3>
          <p>Create your first actor using the form above</p>
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading data from database...</p>
        </div>
      )}
    </div>
  );
}
