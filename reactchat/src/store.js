import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

let store = (set) => ({
  registration: [],
  setRegistration: (add) =>
    set((state) => ({ registration: [...state.registration, add] })),
});

store = devtools(store);
store = persist(store, { name: "Signin_setting" });

const useStore = create(store);

export default useStore;
