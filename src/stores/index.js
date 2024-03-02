import { defineStore } from "pinia";

export const useTableDataStore = defineStore("tableData", {
  state: () => {
    return {
      tableData: [],
      searchResult: [],
      checkedData: 0,
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
  actions: {
    countCheckedData() {
      if (this.searchResult.length > 0) {
        this.checkedData = this.searchResult.filter((item) => item.checked).reduce((total) => total + 1, 0);
      } else {
        this.checkedData = this.tableData.filter((item) => item.checked).reduce((total) => total + 1, 0);
      }
    },
  },
  persist: {
    storage: sessionStorage,
  },
});

export const usePaginationStore = defineStore("pagination", {
  state: () => {
    return {
      initialPage: 1,
      itemsPerPage: 10,
      tableDataStore: useTableDataStore(),
    };
  },
  getters: {
    currentPage(state) {
      return state.initialPage;
    },
    totalPages(state) {
      if (state.tableDataStore.searchResult.length > 0) {
        return Math.ceil(state.tableDataStore.searchResult.length / state.itemsPerPage);
      } else {
        return Math.ceil(state.tableDataStore.tableData.length / state.itemsPerPage);
      }
    },
    paginatedTableData(state) {
      if (state.tableDataStore.searchResult.length > 0) {
        const startIndex = (state.initialPage - 1) * state.itemsPerPage;
        const endIndex = startIndex + state.itemsPerPage;
        return state.tableDataStore.searchResult.slice(startIndex, endIndex);
      } else {
        const startIndex = (state.initialPage - 1) * state.itemsPerPage;
        const endIndex = startIndex + state.itemsPerPage;
        return state.tableDataStore.tableData.slice(startIndex, endIndex);
      }
    },
  },
  actions: {
    goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.initialPage = pageNumber;
      }
    },
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
