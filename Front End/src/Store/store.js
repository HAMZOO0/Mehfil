import { create } from "zustand";
// create: This function is used to create a Zustand store.
import { persist, createJSONStorage } from "zustand/middleware";
//persist: This middleware function allows Zustand to persist state in a storage solution (like localStorage).

// createJSONStorage: This function creates a JSON-compatible storage instance. It is used to specify which storage to use (e.g., localStorage, sessionStorage).

// Create the Zustand store with persist middleware
export const useStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "user-store", // Unique name for the localStorage item
      storage: createJSONStorage(() => localStorage), // Optional: you can use sessionStorage or other storage types
    }
  )
);
