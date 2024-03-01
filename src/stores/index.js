import { defineStore } from "pinia";

export const useTableDataStore = defineStore("tableData", {
  state: () => {
    return {
      tableData: [],
    };
  },
  getters: {
    setTableData(state) {
      return (data) => (state.tableData = data);
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
