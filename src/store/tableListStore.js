import create from "zustand";

export const useTableListState = create((set, get) => ({
    tableList: [],
    setTableList: (tableList) => {
        console.log(tableList)
        return set((state) => ({tableList: tableList}));
    },
}));


export const useActiveTable = create((set, get) => (
    {
        table: {},
        setTable: tab =>
            (set(state => ({table: tab})))
    }
))

