import React, { useState } from 'react';
import { Users, UserCheck, UserX, Shield, Search, CheckCircle, XCircle, User, Calendar, Star } from 'lucide-react';
import { mockDoctors, mockPatients } from '../../data/mockData';
import { Doctor } from '../../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'patients'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  
  const pendingDoctors = mockDoctors.filter(doctor => !doctor.approved);
  const approvedDoctors = mockDoctors.filter(doctor => doctor.approved);

  const handleApproveDoctor = (doctorId: string) => {
    // In a real app, this would make an API call
    console.log('Approving doctor:', doctorId);
    alert('Doctor approved successfully!');
  };

  const handleRejectDoctor = (doctorId: string) => {
    // In a real app, this would make an API call
    console.log('Rejecting doctor:', doctorId);
    alert('Doctor rejected successfully!');
  };

  const filteredPendingDoctors = pendingDoctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApprovedDoctors = approvedDoctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const DoctorCard: React.FC<{ doctor: Doctor; isPending?: boolean }> = ({ doctor, isPending = false }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
            <p className="text-blue-600 font-medium">{doctor.specialty}</p>
            <p className="text-gray-600 text-sm">{doctor.qualification}</p>
          </div>
        </div>
        {!isPending && (
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
            <span className="text-sm text-gray-500">({doctor.reviews})</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Hospital</p>
          <p className="font-medium">{doctor.hospital}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Experience</p>
          <p className="font-medium">{doctor.experience} years</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Consultation Fee</p>
          <p className="font-medium">${doctor.consultationFee}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Phone</p>
          <p className="font-medium">{doctor.phone}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">Bio</p>
        <p className="text-sm text-gray-700 line-clamp-2">{doctor.bio}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Availability</p>
        <div className="flex flex-wrap gap-1">
          {doctor.availability.map(day => (
            <span key={day} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
              {day}
            </span>
          ))}
        </div>
      </div>

      {isPending && (
        <div className="flex space-x-3">
          <button
            onClick={() => handleApproveDoctor(doctor.id)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Approve</span>
          </button>
          <button
            onClick={() => handleRejectDoctor(doctor.id)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <XCircle className="h-4 w-4" />
            <span>Reject</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <p className="text-gray-600">Manage doctors, patients, and system settings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved Doctors</p>
                <p className="text-2xl font-bold text-gray-900">{approvedDoctors.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <UserX className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Doctors</p>
                <p className="text-2xl font-bold text-gray-900">{pendingDoctors.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{mockPatients.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'pending'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending Doctors ({pendingDoctors.length})
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'approved'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Approved Doctors ({approvedDoctors.length})
            </button>
            <button
              onClick={() => setActiveTab('patients')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'patients'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Patients ({mockPatients.length})
            </button>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Content */}
        {activeTab === 'pending' && (
          <div>
            {filteredPendingDoctors.length === 0 ? (
              <div className="text-center py-12">
                <UserCheck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pending doctors</h3>
                <p className="text-gray-600">
                  All doctor registrations have been reviewed.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPendingDoctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} isPending />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'approved' && (
          <div>
            {filteredApprovedDoctors.length === 0 ? (
              <div className="text-center py-12">
                <UserX className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No approved doctors</h3>
                <p className="text-gray-600">
                  No doctors have been approved yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredApprovedDoctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'patients' && (
          <div>
            {filteredPatients.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
                <p className="text-gray-600">
                  No patients match your search criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPatients.map(patient => (
                  <div key={patient.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                        <p className="text-gray-600">{patient.email}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{patient.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Date of Birth</p>
                        <p className="font-medium">{patient.dateOfBirth}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-medium">{patient.address}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;