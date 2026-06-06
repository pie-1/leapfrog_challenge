import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const useTaskStore = create((set) => ({
  tasks: [],
  isLoading: false,

  fetchTasks: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(API_URL);
      set({ tasks: res.data });
    } catch (error) {
      console.error("Failed to fetch tasks:", error.response?.data || error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  addTask: async (newTask) => {
    try {
      const res = await axios.post(API_URL, newTask);
      set((state) => ({ tasks: [...state.tasks, res.data] }));
      return true;
    } catch (error) {
      console.error("Failed to add task:", error.response?.data || error.message);
      alert("Failed to create task!");
      return false;
    }
  },

  updateTask: async (id, updatedData) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedData);
      set((state) => ({
        tasks: state.tasks.map((task) => 
          task._id === id ? res.data : task
        )
      }));
      return true;
    } catch (error) {
      console.error("Failed to update task:", error);
      return false;
    }
  },

  deleteTask: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id)
      }));
      return true;
    } catch (error) {
      console.error("Failed to delete task:", error);
      return false;
    }
  },
}));