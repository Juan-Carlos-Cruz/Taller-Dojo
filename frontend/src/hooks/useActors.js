import { useEffect, useState } from 'react';
import {
  listActors,
  getActor,
  createActor,
  updateActor,
  deleteActorById,
} from '../services/actorsService';

export function useActors() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ firstName: '', lastName: '' });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await listActors({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
      });
      setItems(Array.isArray(data?.data) ? data.data : []);
      setTotalPages(Number(data?.pages) || 1);
      setTotalItems(Number(data?.total) || 0);
    } catch (err) {
      showNotification('Failed to load actors from database', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm, itemsPerPage]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateActor(editingId, formData);
        showNotification('Actor updated successfully!', 'success');
      } else {
        await createActor(formData);
        showNotification('Actor created successfully!', 'success');
      }
      resetForm();
      loadItems();
    } catch (err) {
      showNotification('An error occurred while saving to database', 'error');
      console.error(err);
    }
  };

  const startEdit = async (actor) => {
    try {
      const data = await getActor(actor.id);
      setFormData({ firstName: data.firstName, lastName: data.lastName });
      setEditingId(actor.id);
    } catch {
      showNotification('Failed to load actor data', 'error');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Are you sure you want to delete this actor? This action cannot be undone.')) {
      return;
    }
    try {
      await deleteActorById(id);
      showNotification('Actor deleted successfully!', 'success');
      loadItems();
    } catch (err) {
      showNotification('Failed to delete actor from database', 'error');
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({ firstName: '', lastName: '' });
    setEditingId(null);
  };

  const onSearchChange = (val) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const onItemsPerPageChange = (num) => {
    setItemsPerPage(num);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return {
    // state
    items, formData, editingId, searchTerm, notification,
    currentPage, totalPages, totalItems, loading, itemsPerPage,
    // actions
    setFormData, submit, startEdit, remove, resetForm,
    onSearchChange, onItemsPerPageChange, paginate,
  };
}
