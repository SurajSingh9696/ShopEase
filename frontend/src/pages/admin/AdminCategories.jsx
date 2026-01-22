import { useState, useEffect } from 'react';
import { categoryAPI } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FolderTree, Plus, Edit2, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', parentId: null });
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryAPI.getAllCategories();
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      
      const submitData = {
        name: formData.name,
        parentId: formData.parentId || null
      };

      if (editingCategory) {
        const response = await categoryAPI.updateCategory(editingCategory._id, submitData);
        if (response.data.success) {
          toast.success('Category updated successfully');
        }
      } else {
        const response = await categoryAPI.createCategory(submitData);
        if (response.data.success) {
          toast.success('Category created successfully');
        }
      }
      
      closeModal();
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      const response = await categoryAPI.deleteCategory(id);
      if (response.data.success) {
        toast.success('Category deleted successfully');
        fetchCategories();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete category');
    }
  };

  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        parentId: category.parentId || null
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', parentId: null });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', parentId: null });
  };

  const getParentCategories = () => {
    return categories.filter(cat => !cat.parentId);
  };

  const getCategoryChildren = (parentId) => {
    return categories.filter(cat => cat.parentId === parentId);
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  const parentCategories = getParentCategories();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FolderTree className="w-8 h-8" />
            Category Management
          </h1>
          <p className="text-gray-600 mt-2">Organize your product categories</p>
        </div>
        <button
          onClick={() => openModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Categories</p>
              <p className="text-3xl font-bold text-gray-900">{categories.length}</p>
            </div>
            <FolderTree className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Parent Categories</p>
              <p className="text-3xl font-bold text-gray-900">{parentCategories.length}</p>
            </div>
            <FolderTree className="w-12 h-12 text-green-500" />
          </div>
        </div>
      </div>

      {/* Categories Display */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 space-y-4">
          {parentCategories.map((parentCat) => {
            const children = getCategoryChildren(parentCat._id);
            return (
              <div key={parentCat._id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <FolderTree className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold text-lg">{parentCat.name}</span>
                    <span className="text-sm text-gray-500">
                      ({children.length} subcategories)
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(parentCat)}
                      className="text-blue-600 hover:text-blue-800 p-2"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(parentCat._id)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {children.length > 0 && (
                  <div className="ml-8 mt-2 space-y-2">
                    {children.map((child) => (
                      <div key={child._id} className="flex items-center justify-between bg-gray-50 rounded p-2">
                        <span className="text-gray-700">└─ {child.name}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openModal(child)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDelete(child._id)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="e.g., Electronics"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Parent Category (Optional)
                </label>
                <select
                  value={formData.parentId || ''}
                  onChange={(e) => setFormData({ ...formData, parentId: e.target.value || null })}
                  className="input-field"
                >
                  <option value="">None (Top Level)</option>
                  {parentCategories
                    .filter(cat => cat._id !== editingCategory?._id)
                    .map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 btn-primary disabled:opacity-50"
                >
                  {actionLoading ? 'Saving...' : editingCategory ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
