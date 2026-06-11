import { create } from "zustand";

export const useAuthStore = create((set) => ({
  // =========================
  // STATE
  // =========================

  user: null,
  isAuthenticated: false,

  isLoading: false,
  isCheckingAuth: true,

  // =========================
  // LOGIN
  // =========================

  login: async (userData) => {
    set({
      isLoading: true,
    });

    try {
      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      set({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Login Error:", error);

      set({
        isLoading: false,
      });
    }
  },

  // =========================
  // LOGOUT
  // =========================

  logout: () => {
    localStorage.removeItem("user");

    set({
      user: null,
      isAuthenticated: false,
    });
  },

  // =========================
  // LOAD USER
  // =========================

  loadUser: () => {
    try {
      const storedUser =
        localStorage.getItem("user");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        set({
          user,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error(
        "Failed to load user:",
        error
      );
    } finally {
      set({
        isCheckingAuth: false,
      });
    }
  },

  // =========================
  // UPDATE PROFILE
  // =========================

  updateUser: (updatedData) => {
    set((state) => {
      const updatedUser = {
        ...state.user,
        ...updatedData,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      return {
        user: updatedUser,
      };
    });
  },

  // =========================
  // FUTURE BACKEND READY
  // =========================

  setLoading: (value) =>
    set({
      isLoading: value,
    }),
}));