import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

let store = (set) => ({
  registration: [],
  setRegistration: (add) => set((state) => ({ registration: [add] })),
});

store = devtools(store);
store = persist(store, { name: "login_setting" });

const useStore = create(store);

export default useStore;
