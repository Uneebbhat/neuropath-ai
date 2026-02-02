import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  userId: string | null;
  token: string | null;
  name: string | null;
  email: string | null;
  login: (userData: {
    userId: string;
    token: string;
    name: string;
    email: string;
  }) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userId: null,
      token: null,
      name: null,
      email: null,
      login: (userData) =>
        set({
          userId: userData.userId,
          token: userData.token,
          name: userData.name,
          email: userData.email,
        }),
      logout: () =>
        set({
          userId: null,
          token: null,
          name: null,
          email: null,
        }),
    }),
    {
      name: "user-storage",
    },
  ),
);

export default useUserStore;
