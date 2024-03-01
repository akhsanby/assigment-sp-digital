import { defineStore } from "pinia";

export const useTableDataStore = defineStore("tableData", {
  state: () => {
    return {
      tableData: [],
      searchResult: [],
      currentPage: 1,
      itemsPerPage: 10,
      currentPageSearchResult: 1,
      itemsPerPageSearchResult: 10,
    };
  },
  getters: {
    setTableData(state) {
      return (data) => (state.tableData = data);
    },
    setSearchResult(state) {
      return (data) => (state.searchResult = data);
    },
    totalPages(state) {
      return Math.ceil(state.tableData.length / state.itemsPerPage);
    },
    totalPagesSearchResult(state) {
      return Math.ceil(state.searchResult.length / state.itemsPerPageSearchResult);
    },
    paginatedTableData(state) {
      const startIndex = (state.currentPage - 1) * state.itemsPerPage;
      const endIndex = startIndex + state.itemsPerPage;
      return state.tableData.slice(startIndex, endIndex);
    },
    paginatedSearchResult(state) {
      const startIndex = (state.currentPageSearchResult - 1) * state.itemsPerPageSearchResult;
      const endIndex = startIndex + state.itemsPerPageSearchResult;
      return state.searchResult.slice(startIndex, endIndex);
    },
  },
  actions: {
    goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      }
    },
    goToPageSearchResult(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPagesSearchResult) {
        this.currentPageSearchResult = pageNumber;
      }
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
