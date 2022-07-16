import create from "zustand";

export const useTableListState = create((set, get) => ({
  tableList: [],
  setTableList: (tableList) => {
    console.log("store", tableList);
    return set((state) => ({ tableList: tableList }));
  },
}));
