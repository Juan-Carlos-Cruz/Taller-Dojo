import React from 'react';
import Notification from './components/Notification';
import ActionBar from './components/ActionBar';
import ActorForm from './components/ActorForm';
import ActorTable from './components/ActorTable';
import Pagination from './components/Pagination';
import { useActors } from './hooks/useActors';

export default function App() {
  const {
    // state
    items, formData, editingId, searchTerm, notification,
    currentPage, totalPages, totalItems, loading, itemsPerPage,
    // actions
    setFormData, submit, startEdit, remove, resetForm,
    onSearchChange, onItemsPerPageChange, paginate,
  } = useActors();

  return (
    <div className="min-h-screen bg-gray-100">
      <Notification show={notification.show} message={notification.message} type={notification.type} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="bg-blue-500 text-white p-4 mb-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Actor Management</h1>
              <p className="text-sm opacity-90">CRUD Operations with PostgreSQL</p>
            </div>
          </div>
        </header>

        {/* Action Bar */}
        <ActionBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          onResetForm={resetForm}
          loading={loading}
        />

        {/* Form */}
        <ActorForm
          formData={formData}
          onChange={setFormData}
          onSubmit={submit}
          editingId={editingId}
          onCancel={resetForm}
        />

        {/* Table */}
        <ActorTable items={items} onEdit={startEdit} onDelete={remove} loading={loading} />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPaginate={paginate}
        />
      </div>
    </div>
  );
}
