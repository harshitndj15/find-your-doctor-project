import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Shield, Clock, Users, Star, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Heart className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Find Your Perfect
              <span className="block text-blue-600">Healthcare Provider</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with qualified doctors, book appointments, and manage your healthcare journey with ease. 
              Our platform makes finding the right medical care simple and convenient.
            </p>
            
            {user ? (
              <Link
                to={`/${user.role}`}
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/patient"
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Find Doctors
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Why Choose FindYourDoctor?
            </h2>
            <p className="text-xl text-gray-600">
              Experience healthcare like never before with our comprehensive platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Search className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Search</h3>
              <p className="text-gray-600">
                Find doctors by specialty, location, availability, and more with our advanced search filters.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Doctors</h3>
              <p className="text-gray-600">
                All doctors are thoroughly verified and approved by our admin team for your safety.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Clock className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Book appointments instantly with real-time availability and confirmation.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Patient Reviews</h3>
              <p className="text-gray-600">
                Read authentic reviews from other patients to make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-100">Qualified Doctors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-blue-100">Happy Patients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">Medical Specialties</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of patients who trust FindYourDoctor for their healthcare needs.
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Register as Patient
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
              >
                Register as Doctor
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;