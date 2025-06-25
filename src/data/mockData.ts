import { Doctor, Patient, Appointment } from '../types';

export const mockPatients: Patient[] = [
  {
    id: '1',
    email: 'patient@example.com',
    name: 'John Smith',
    role: 'patient',
    phone: '+1234567890',
    dateOfBirth: '1990-05-15',
    address: '123 Main St, New York, NY'
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    email: 'dr.wilson@example.com',
    name: 'Dr. Sarah Wilson',
    role: 'doctor',
    specialty: 'Cardiology',
    experience: 12,
    qualification: 'MD, FACC',
    hospital: 'Manhattan Medical Center',
    consultationFee: 200,
    availability: ['Monday', 'Wednesday', 'Friday'],
    rating: 4.9,
    reviews: 156,
    bio: 'Dr. Wilson is a board-certified cardiologist with over 12 years of experience treating heart conditions. She specializes in interventional cardiology and has performed over 1000 cardiac procedures.',
    approved: true,
    phone: '+1234567891',
    address: '456 Medical Ave, New York, NY'
  },
  {
    id: '2',
    email: 'dr.johnson@example.com',
    name: 'Dr. Michael Johnson',
    role: 'doctor',
    specialty: 'Dermatology',
    experience: 8,
    qualification: 'MD, FAAD',
    hospital: 'City Dermatology Clinic',
    consultationFee: 150,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    rating: 4.7,
    reviews: 89,
    bio: 'Dr. Johnson specializes in medical and cosmetic dermatology. He has extensive experience in treating skin conditions and performing cosmetic procedures.',
    approved: true,
    phone: '+1234567892',
    address: '789 Skin Care Blvd, New York, NY'
  },
  {
    id: '3',
    email: 'dr.davis@example.com',
    name: 'Dr. Emily Davis',
    role: 'doctor',
    specialty: 'Pediatrics',
    experience: 15,
    qualification: 'MD, FAAP',
    hospital: 'Children\'s Hospital',
    consultationFee: 120,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    rating: 4.8,
    reviews: 203,
    bio: 'Dr. Davis is a dedicated pediatrician with 15 years of experience caring for children from newborns to adolescents. She specializes in preventive care and childhood development.',
    approved: true,
    phone: '+1234567893',
    address: '321 Kids Health St, New York, NY'
  },
  {
    id: '4',
    email: 'dr.pending@example.com',
    name: 'Dr. Robert Pending',
    role: 'doctor',
    specialty: 'Orthopedics',
    experience: 10,
    qualification: 'MD, FAAOS',
    hospital: 'Orthopedic Specialists',
    consultationFee: 180,
    availability: ['Monday', 'Wednesday', 'Friday'],
    rating: 0,
    reviews: 0,
    bio: 'Dr. Pending is an orthopedic surgeon specializing in sports medicine and joint replacement procedures.',
    approved: false,
    phone: '+1234567894',
    address: '654 Bone St, New York, NY'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    date: '2024-01-15',
    time: '10:00',
    status: 'confirmed',
    reason: 'Regular checkup'
  }
];

export const adminCredentials = {
  email: 'admin@findyourdoctor.com',
  password: 'admin123'
};