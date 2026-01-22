import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { User, Mail, Phone, Calendar, MapPin, Plus, Edit2, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, checkAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressFormData, setAddressFormData] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
  });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        age: user.age || '',
      });
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const response = await userAPI.getAddresses();
      if (response.data.success) {
        setAddresses(response.data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch addresses');
      setAddresses([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await userAPI.updateProfile(formData);
      if (response.data.success) {
        toast.success('Profile updated successfully');
        await checkAuth();
        setEditing(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingAddress) {
        const response = await userAPI.updateAddress(editingAddress._id, addressFormData);
        if (response.data.success) {
          toast.success('Address updated successfully');
        }
      } else {
        const response = await userAPI.addAddress(addressFormData);
        if (response.data.success) {
          toast.success('Address added successfully');
        }
      }
      closeAddressModal();
      fetchAddresses();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm('Are you sure you want to delete this address?')) {
      return;
    }
    try {
      const response = await userAPI.deleteAddress(id);
      if (response.data.success) {
        toast.success('Address deleted successfully');
        fetchAddresses();
      }
    } catch (error) {
      toast.error('Failed to delete address');
    }
  };

  const openAddressModal = (address = null) => {
    if (address) {
      setEditingAddress(address);
      setAddressFormData({
        line1: address.line1,
        line2: address.line2 || '',
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
      });
    } else {
      setEditingAddress(null);
      setAddressFormData({
        line1: '',
        line2: '',
        city: '',
        state: '',
        postalCode: '',
      });
    }
    setShowAddressModal(true);
  };

  const closeAddressModal = () => {
    setShowAddressModal(false);
    setEditingAddress(null);
  };

  if (!user) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {/* Profile Header */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b">
            <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  user.role === 'admin'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {user.role === 'admin' ? 'Administrator' : 'Customer'}
              </span>
            </div>
          </div>

          {/* Profile Form */}
          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  min="13"
                  max="120"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={loading} className="btn-primary flex-1">
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
              </div>

              {user.phone && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{user.phone}</p>
                  </div>
                </div>
              )}

              {user.age && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="font-medium text-gray-900">{user.age} years</p>
                  </div>
                </div>
              )}

              <button onClick={() => setEditing(true)} className="w-full btn-primary mt-6">
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Addresses Section */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              My Addresses
            </h2>
            <button
              onClick={() => openAddressModal()}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Address
            </button>
          </div>

          {!addresses || addresses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No addresses added yet</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {addresses?.map((address) => (
                <div key={address._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{address.line1}</p>
                      {address.line2 && <p className="text-gray-600">{address.line2}</p>}
                      <p className="text-gray-600">
                        {address.city}, {address.state} - {address.postalCode}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openAddressModal(address)}
                        className="text-blue-600 hover:text-blue-800 p-2"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address._id)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Address Modal */}
        {showAddressModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </h2>
                <button onClick={closeAddressModal} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressFormData.line1}
                    onChange={(e) =>
                      setAddressFormData({ ...addressFormData, line1: e.target.value })
                    }
                    className="input-field"
                    placeholder="House/Flat No., Street"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={addressFormData.line2}
                    onChange={(e) =>
                      setAddressFormData({ ...addressFormData, line2: e.target.value })
                    }
                    className="input-field"
                    placeholder="Area, Landmark"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={addressFormData.city}
                      onChange={(e) =>
                        setAddressFormData({ ...addressFormData, city: e.target.value })
                      }
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={addressFormData.state}
                      onChange={(e) =>
                        setAddressFormData({ ...addressFormData, state: e.target.value })
                      }
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressFormData.postalCode}
                    onChange={(e) =>
                      setAddressFormData({ ...addressFormData, postalCode: e.target.value })
                    }
                    className="input-field"
                    placeholder="e.g., 110001"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : editingAddress ? 'Update' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={closeAddressModal}
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
    </div>
  );
};

export default Profile;
