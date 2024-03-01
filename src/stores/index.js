import { defineStore } from "pinia";

export const useTableDataStore = defineStore("tableData", {
  state: () => {
    return {
      tableData: [],
      searchResult: [],
    };
  },
  getters: {
    setTableData(state) {
      return (data) => (state.tableData = data);
    },
    setSearchResult(state) {
      return (data) => (state.searchResult = data);
    },
  },
  persist: {
    storage: sessionStorage,
  },
});

export const useModalStore = defineStore("modal", {
  state: () => {
    return {
      showRemove: false,
      showUpdate: false,
    };
  },
  getters: {
    closeRemove(state) {
      return (data) => {
        state.showRemove = false;
        document.querySelector("#remove-modal").classList.remove("bg-gray-900/50");
        document.querySelector("#remove-modal").classList.remove("fixed");
        document.querySelector("#remove-modal").classList.remove("inset-0");
        document.querySelector("#remove-modal").classList.remove("z-40");
      };
    },
    closeUpdate(state) {
      return (data) => {
        state.showUpdate = false;
        document.querySelector("#update-modal").classList.remove("bg-gray-900/50");
        document.querySelector("#update-modal").classList.remove("fixed");
        document.querySelector("#update-modal").classList.remove("inset-0");
        document.querySelector("#update-modal").classList.remove("z-40");
      };
    },
    toggleRemove(state) {
      return (data) => {
        state.showRemove = !state.showRemove;
        document.querySelector("#remove-modal").classList.toggle("bg-gray-900/50");
        document.querySelector("#remove-modal").classList.toggle("fixed");
        document.querySelector("#remove-modal").classList.toggle("inset-0");
        document.querySelector("#remove-modal").classList.toggle("z-40");
      };
    },
    toggleUpdate(state) {
      return (data) => {
        state.showUpdate = !state.showUpdate;
        document.querySelector("#update-modal").classList.toggle("bg-gray-900/50");
        document.querySelector("#update-modal").classList.toggle("fixed");
        document.querySelector("#update-modal").classList.toggle("inset-0");
        document.querySelector("#update-modal").classList.toggle("z-40");
      };
    },
  },
});
