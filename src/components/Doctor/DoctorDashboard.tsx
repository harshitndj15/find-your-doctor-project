import React, { useState } from 'react';
import { User, Calendar, Clock, Phone, MapPin, Star, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockDoctors } from '../../data/mockData';
import { Doctor } from '../../types';

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Find the current doctor's data
  const doctorData = mockDoctors.find(doc => doc.email === user?.email) || mockDoctors[0];
  
  const [formData, setFormData] = useState({
    name: doctorData.name,
    specialty: doctorData.specialty,
    qualification: doctorData.qualification,
    hospital: doctorData.hospital,
    experience: doctorData.experience,
    consultationFee: doctorData.consultationFee,
    phone: doctorData.phone,
    address: doctorData.address,
    bio: doctorData.bio,
    availability: doctorData.availability
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvailabilityChange = (day: string) => {
    const newAvailability = formData.availability.includes(day)
      ? formData.availability.filter(d => d !== day)
      : [...formData.availability, day];
    
    setFormData({
      ...formData,
      availability: newAvailability
    });
  };

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log('Saving profile:', formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      name: doctorData.name,
      specialty: doctorData.specialty,
      qualification: doctorData.qualification,
      hospital: doctorData.hospital,
      experience: doctorData.experience,
      consultationFee: doctorData.consultationFee,
      phone: doctorData.phone,
      address: doctorData.address,
      bio: doctorData.bio,
      availability: doctorData.availability
    });
    setIsEditing(false);
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Dashboard</h1>
              <p className="text-gray-600">Manage your profile and appointments</p>
            </div>
            <div className="flex items-center space-x-4">
              {!doctorData.approved && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  Pending Approval
                </span>
              )}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Edit3 className="h-4 w-4" />
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-6 mb-6">
            <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-blue-600" />
            </div>
            <div>
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    className="text-blue-600 font-medium border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{formData.name}</h2>
                  <p className="text-blue-600 font-medium">{formData.specialty}</p>
                </div>
              )}
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900">{doctorData.rating}</span>
                  <span className="text-sm text-gray-500">({doctorData.reviews} reviews)</span>
                </div>
                <span className="text-sm text-gray-500">{formData.experience} years experience</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qualification
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.qualification}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hospital/Clinic
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.hospital}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.phone}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience (years)
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.experience}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Consultation Fee ($)
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">${formData.consultationFee}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.address}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{formData.bio}</p>
            )}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            {isEditing ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {weekDays.map(day => (
                  <label key={day} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.availability.includes(day)}
                      onChange={() => handleAvailabilityChange(day)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{day.substring(0, 3)}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {formData.availability.map(day => (
                  <span key={day} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {day}
                  </span>
                ))}
              </div>
            )}
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">127</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{doctorData.rating}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Appointments</h3>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No recent appointments</p>
              <p className="text-sm text-gray-400 mt-1">
                Appointments will appear here once patients start booking
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;