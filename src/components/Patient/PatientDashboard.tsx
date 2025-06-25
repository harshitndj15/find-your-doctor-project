import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Calendar, Phone, Clock, User } from 'lucide-react';
import { mockDoctors } from '../../data/mockData';
import { Doctor } from '../../types';

const PatientDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const approvedDoctors = mockDoctors.filter(doctor => doctor.approved);
  const specialties = [...new Set(approvedDoctors.map(doctor => doctor.specialty))];
  const availabilityOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const filteredDoctors = approvedDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    const matchesAvailability = !selectedAvailability || doctor.availability.includes(selectedAvailability);

    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  const handleBookAppointment = (doctor: Doctor) => {
    alert(`Booking appointment with ${doctor.name}. This would open a booking modal in a real application.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Doctor</h1>
          <p className="text-gray-600">Search and book appointments with qualified healthcare providers</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by doctor name, specialty, or hospital..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Filter className="h-5 w-5" />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialty
                  </label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Specialties</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Any Day</option>
                    {availabilityOptions.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                    <p className="text-gray-600 text-sm">{doctor.qualification}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
                  <span className="text-sm text-gray-500">({doctor.reviews})</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{doctor.hospital}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{doctor.experience} years experience</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Available: {doctor.availability.join(', ')}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">${doctor.consultationFee} consultation fee</span>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                {doctor.bio}
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleBookAppointment(doctor)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Book Appointment
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters to find more doctors.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;