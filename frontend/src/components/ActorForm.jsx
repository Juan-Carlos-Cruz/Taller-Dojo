import React from 'react';

export default function ActorForm({ formData, onChange, onSubmit, editingId, onCancel }) {
  return (
    <div className="bg-white rounded-lg shadow mb-6 p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        {editingId ? 'Edit Actor' : 'Add New Actor'}
      </h2>
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => onChange({ ...formData, firstName: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => onChange({ ...formData, lastName: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter last name"
          />
        </div>
        <div className="md:col-span-2 flex space-x-2">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 font-medium">
            {editingId ? 'Update Actor' : 'Create Actor'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
