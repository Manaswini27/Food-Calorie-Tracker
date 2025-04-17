import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-600">CalorieTracker</h1>
          <div className="space-x-4">
            <Link to="/login" className="text-yellow-600 hover:text-yellow-700">Login</Link>
            <Link to="/register" className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-20">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Track Your Health Journey
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Monitor your calorie intake and burning activities with our comprehensive tracking system.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600"
            >
              Get Started <ArrowRight className="ml-2" />
            </Link>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061"
              alt="Healthy Food"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src="https://images.unsplash.com/photo-1498837167922-ddd27525d352"
              alt="Food Tracking"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Track Food Intake</h3>
            <p className="text-gray-600">Log your meals and track your daily calorie intake easily.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
              alt="Exercise"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Monitor Activities</h3>
            <p className="text-gray-600">Track your exercises and calories burned throughout the day.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8"
              alt="Progress"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">View Progress</h3>
            <p className="text-gray-600">Analyze your progress with detailed charts and insights.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;