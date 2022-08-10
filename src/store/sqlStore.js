import create from "zustand";
import {atom, useAtom} from "jotai";

export const useSqlState = create((set, get) => ({
  db: {},
  setDB: (db) => {
    return set((state) => ({ db: db }));
  },
}));


export const dbAtom = atom({})
