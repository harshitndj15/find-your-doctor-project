export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Patient extends User {
  phone: string;
  dateOfBirth: string;
  address: string;
}

export interface Doctor extends User {
  specialty: string;
  experience: number;
  qualification: string;
  hospital: string;
  consultationFee: number;
  availability: string[];
  rating: number;
  reviews: number;
  bio: string;
  approved: boolean;
  phone: string;
  address: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  reason: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}