import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeftIcon, 
  ClipboardDocumentCheckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { weddingService } from '../features/weddings/wedding.service';

const defaultTasks = [
  { id: 'venue', label: 'Book Venue', category: 'Venue' },
  { id: 'catering', label: 'Finalize Catering Menu', category: 'Catering' },
  { id: 'photographer', label: 'Hire Photographer', category: 'Photography' },
  { id: 'decor', label: 'Choose Wedding Decor', category: 'Decorations' },
  { id: 'attire', label: 'Select Wedding Attire', category: 'Attire' },
  { id: 'invitations', label: 'Send Invitations', category: 'Invitations' },
  { id: 'mehendi', label: 'Book Mehendi Artist', category: 'Mehendi' },
  { id: 'sangeet', label: 'Plan Sangeet Program', category: 'Events' },
  { id: 'transport', label: 'Arrange Transportation', category: 'Transport' },
  { id: 'guestlist', label: 'Finalize Guest List', category: 'Guests' },
];

export default function Checklist() {
  const [weddings, setWeddings] = useState([]);
  const [selectedWedding, setSelectedWedding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchWeddings();
  }, []);

  const fetchWeddings = async () => {
    try {
      const data = await weddingService.getAll();
      setWeddings(data);
      if (data.length > 0) {
        setSelectedWedding(data[0]);
        loadTasks(data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch weddings:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = (wedding) => {
    // Load tasks from localStorage or use defaults
    const savedTasks = localStorage.getItem(`checklist_${wedding._id}`);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(defaultTasks.map(task => ({ ...task, completed: false })));
    }
  };

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    if (selectedWedding) {
      localStorage.setItem(`checklist_${selectedWedding._id}`, JSON.stringify(updatedTasks));
    }
  };

  const toggleTask = (id) => {
    const updated = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updated);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const newTaskObj = {
      id: `custom_${Date.now()}`,
      label: newTask.trim(),
      category: 'Custom',
      completed: false,
    };
    saveTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    const updated = tasks.filter(task => task.id !== id);
    saveTasks(updated);
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Venue': return '🏛️';
      case 'Catering': return '🍽️';
      case 'Photography': return '📸';
      case 'Decorations': return '🎨';
      case 'Attire': return '👔';
      case 'Invitations': return '💌';
      case 'Mehendi': return '🌿';
      case 'Events': return '🎭';
      case 'Transport': return '🚗';
      case 'Guests': return '👥';
      default: return '📋';
    }
  };

  const progress = tasks.length > 0 ? (tasks.filter(t => t.completed).length / tasks.length) * 100 : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-rose-600">Loading checklist...</div>
      </div>
    );
  }

  if (weddings.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link to="/dashboard" className="inline-flex items-center text-gray-500 hover:text-rose-600 transition mb-4">
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <ClipboardDocumentCheckIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-serif text-gray-800">No weddings yet</h1>
          <p className="text-gray-500 mt-2">Plan your wedding to get a checklist!</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-6 py-10"
    >
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <Link to="/dashboard" className="inline-flex items-center text-gray-500 hover:text-rose-600 transition mb-2">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif text-gray-800">Wedding Checklist</h1>
        </div>
        {weddings.length > 1 && (
          <select
            value={selectedWedding?._id || ''}
            onChange={(e) => {
              const wedding = weddings.find(w => w._id === e.target.value);
              setSelectedWedding(wedding);
              loadTasks(wedding);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
          >
            {weddings.map(w => (
              <option key={w._id} value={w._id}>{w.title}</option>
            ))}
          </select>
        )}
      </div>

      {selectedWedding && (
        <>
          {/* Progress */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-medium text-amber-600">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8 }}
                className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {tasks.filter(t => t.completed).length} of {tasks.length} tasks completed
            </p>
          </div>

          {/* Add Task */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add custom task..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
              <button
                onClick={addTask}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition flex items-center gap-1"
              >
                <PlusIcon className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>

          {/* Task List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {tasks.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <ClipboardDocumentCheckIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p>No tasks yet</p>
                <p className="text-sm">Add your wedding tasks!</p>
              </div>
            ) : (
              tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center justify-between p-4 hover:bg-gray-50 transition ${
                    task.completed ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                        task.completed 
                          ? 'bg-emerald-500 border-emerald-500 text-white' 
                          : 'border-gray-300 hover:border-amber-500'
                      }`}
                    >
                      {task.completed && <CheckCircleIcon className="w-4 h-4" />}
                    </button>
                    <div>
                      <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {task.label}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-400">{getCategoryIcon(task.category)} {task.category}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-300 hover:text-red-500 transition"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}