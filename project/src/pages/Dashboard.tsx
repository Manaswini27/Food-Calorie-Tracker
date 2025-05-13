import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Plus, Minus, Calendar, TrendingUp, Scale, Pizza, Dumbbell } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:5000/api';

interface CalorieEntry {
  date: string;
  intake: number;
  burned: number;
}

function Dashboard() {
  const [view, setView] = useState('daily');
  const [showAddModal, setShowAddModal] = useState(false);
  const [entryType, setEntryType] = useState<'intake' | 'burned'>('intake');
  const [calories, setCalories] = useState('');
  const [data, setData] = useState<CalorieEntry[]>([]);
  const { logout } = useAuth();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/calories/${view}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [view]);

  const handleAddEntry = async () => {
    try {
      await axios.post(`${API_URL}/calories`, {
        type: entryType,
        calories: parseInt(calories),
      });
      setShowAddModal(false);
      setCalories('');
      fetchData();
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-600">CalorieTracker</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800">
              <Calendar className="h-6 w-6" />
            </button>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Today's Intake</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {data[data.length - 1]?.intake || 0}
                </p>
              </div>
              <Pizza className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Calories Burned</p>
                <p className="text-3xl font-bold text-green-600">
                  {data[data.length - 1]?.burned || 0}
                </p>
              </div>
              <Dumbbell className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Net Calories</p>
                <p className="text-3xl font-bold text-blue-600">
                  {(data[data.length - 1]?.intake || 0) - (data[data.length - 1]?.burned || 0)}
                </p>
              </div>
              <Scale className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                view === 'daily' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setView('daily')}
            >
              Daily
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                view === 'weekly' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setView('weekly')}
            >
              Weekly
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                view === 'monthly' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setView('monthly')}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Calorie Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="intake" stroke="#EAB308" strokeWidth={2} />
                <Line type="monotone" dataKey="burned" stroke="#22C55E" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
          <button
            onClick={() => {
              setEntryType('intake');
              setShowAddModal(true);
            }}
            className="bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600"
          >
            <Plus className="h-6 w-6" />
          </button>
          <button
            onClick={() => {
              setEntryType('burned');
              setShowAddModal(true);
            }}
            className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600"
          >
            <Minus className="h-6 w-6" />
          </button>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">
                Add {entryType === 'intake' ? 'Calorie Intake' : 'Calories Burned'}
              </h2>
              <input
                type="number"
                placeholder="Enter calories"
                className="w-full p-2 border rounded-lg mb-4"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setCalories('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEntry}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Add Entry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;