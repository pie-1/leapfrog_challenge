import api from '../../utils/api';

export const weddingService = {


   // ✅ Budget Management
  addExpense: async (weddingId, expenseData) => {
    const wedding = await weddingService.getById(weddingId);
    const updatedExpenses = [...(wedding.budget?.expenses || []), expenseData];
    const totalSpent = updatedExpenses.reduce((sum, e) => sum + e.amount, 0);
    const response = await api.put(`/weddings/${weddingId}`, {
      ...wedding,
      budget: {
        ...wedding.budget,
        expenses: updatedExpenses,
        spent: totalSpent,
      },
    });
    return response.data;
  },

  removeExpense: async (weddingId, expenseIndex) => {
    const wedding = await weddingService.getById(weddingId);
    const updatedExpenses = wedding.budget?.expenses.filter((_, index) => index !== expenseIndex) || [];
    const totalSpent = updatedExpenses.reduce((sum, e) => sum + e.amount, 0);
    const response = await api.put(`/weddings/${weddingId}`, {
      ...wedding,
      budget: {
        ...wedding.budget,
        expenses: updatedExpenses,
        spent: totalSpent,
      },
    });
    return response.data;
  },

  updateExpense: async (weddingId, expenseIndex, expenseData) => {
    const wedding = await weddingService.getById(weddingId);
    const updatedExpenses = wedding.budget?.expenses.map((expense, index) =>
      index === expenseIndex ? { ...expense, ...expenseData } : expense
    ) || [];
    const totalSpent = updatedExpenses.reduce((sum, e) => sum + e.amount, 0);
    const response = await api.put(`/weddings/${weddingId}`, {
      ...wedding,
      budget: {
        ...wedding.budget,
        expenses: updatedExpenses,
        spent: totalSpent,
      },
    });
    return response.data;
  },
  
  // Create a new wedding
  create: async (weddingData) => {
    const response = await api.post('/weddings', weddingData);
    return response.data;
  },

  // Get all weddings for the current user
  getAll: async () => {
    const response = await api.get('/weddings');
    return response.data;
  },

  // Get a single wedding by ID
  getById: async (id) => {
    const response = await api.get(`/weddings/${id}`);
    return response.data;
  },

  // Update a wedding
  update: async (id, weddingData) => {
    const response = await api.put(`/weddings/${id}`, weddingData);
    return response.data;
  },

  // Delete a wedding
  delete: async (id) => {
    const response = await api.delete(`/weddings/${id}`);
    return response.data;
  },

  // Event Management
  addEvent: async (weddingId, eventData) => {
    const wedding = await weddingService.getById(weddingId);
    const updatedEvents = [...(wedding.events || []), eventData];
    const response = await api.put(`/weddings/${weddingId}`, {
      ...wedding,
      events: updatedEvents,
    });
    return response.data;
  },

  removeEvent: async (weddingId, eventIndex) => {
    const wedding = await weddingService.getById(weddingId);
    const updatedEvents = wedding.events.filter((_, index) => index !== eventIndex);
    const response = await api.put(`/weddings/${weddingId}`, {
      ...wedding,
      events: updatedEvents,
    });
    return response.data;
  },

  // ✅ NEW: Guest Management
  addGuest: async (weddingId, guestData) => {
    const wedding = await weddingService.getById(weddingId);
    const updatedGuests = [...(wedding.guests || []), guestData];
    const response = await api.put(`/weddings/${weddingId}`, {
      ...wedding,
      guests: updatedGuests,
    });
    return response.data;
  },

  updateGuest: async (weddingId, guestIndex, guestData) => {
    const wedding = await weddingService.getById(weddingId);
    const updatedGuests = wedding.guests.map((guest, index) => 
      index === guestIndex ? { ...guest, ...guestData } : guest
    );
    const response = await api.put(`/weddings/${weddingId}`, {
      ...wedding,
      guests: updatedGuests,
    });
    return response.data;
  },

  removeGuest: async (weddingId, guestIndex) => {
    const wedding = await weddingService.getById(weddingId);
    const updatedGuests = wedding.guests.filter((_, index) => index !== guestIndex);
    const response = await api.put(`/weddings/${weddingId}`, {
      ...wedding,
      guests: updatedGuests,
    });
    return response.data;
  },
};