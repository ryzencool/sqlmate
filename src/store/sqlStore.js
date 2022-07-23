import create from "zustand";

export const useSqlState = create((set, get) => ({
  db: {},
  setDB: (db) => {
    return set((state) => ({ db: db }));
  },
}));
