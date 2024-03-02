<script setup>
import { ref } from "vue";
import { useModalStore, useTableDataStore, usePaginationStore } from "@/stores";
import { storeToRefs } from "pinia";
import TrashIcon from "@/assets/icons/trash.svg";
import PencilIcon from "@/assets/icons/pencil.svg";
import Paginate from "vuejs-paginate-next";

const sortAsc = ref(true);

const { tableData, setTableData } = storeToRefs(useTableDataStore());
const { countCheckedData } = useTableDataStore();
const { toggleRemove, toggleUpdate } = storeToRefs(useModalStore());
const { currentPage, totalPages, paginatedTableData } = storeToRefs(usePaginationStore());
const { goToPage } = usePaginationStore();

function sortByAscOrDesc() {
  if (sortAsc.value === true) {
    const ascendingData = tableData.value.sort((a, b) => a.company.name[0].localeCompare(b.company.name[0]));
    setTableData.value(ascendingData);
    sortAsc.value = false;
  } else if (sortAsc.value === false) {
    const descendingData = tableData.value.sort((a, b) => b.company.name[0].localeCompare(a.company.name[0]));
    setTableData.value(descendingData);
    sortAsc.value = true;
  }
}

function checkAllCheckbox(e) {
  const isChecked = e.target.checked;

  tableData.value.forEach((data) => {
    data.checked = isChecked;
  });

  countCheckedData();
}

function checkOneCheckbox(e, index) {
  const isChecked = e.target.checked;

  tableData.value.forEach((data, i) => {
    if (index === i) {
      data.checked = isChecked;
    }
  });

  countCheckedData();
}
</script>

<template>
  <div class="relative overflow-x-auto border border-gray-200 rounded-lg shadow">
    <table class="w-full text-left">
      <thead class="bg-gray-50">
        <tr class="text-[12px] text-gray-500">
          <th scope="col" class="p-4">
            <div class="flex items-center">
              <input id="checkbox-all" @click="(e) => checkAllCheckbox(e)" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <label for="checkbox-all" class="sr-only">checkbox</label>
            </div>
          </th>
          <th scope="col" class="px-6 py-3 flex items-center">
            Company
            <span class="cursor-pointer" @click="sortByAscOrDesc">
              <Icon icon="uil:arrow-down" width="1.5rem" v-if="sortAsc === false" />
              <Icon icon="uil:arrow-up" width="1.5rem" v-if="sortAsc === true" />
            </span>
          </th>
          <th scope="col" class="px-6 py-3">License use</th>
          <th scope="col" class="px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Users</th>
          <th scope="col" class="px-6 py-3">About</th>
          <th scope="col" class="px-6 py-3 text-transparent select-none">option</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b" v-for="(table, index) in paginatedTableData">
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input id="checkbox-table-1" v-model="table.checked" @click="(e) => checkOneCheckbox(e, index)" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
              <label for="checkbox-table-1" class="sr-only">checkbox</label>
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="flex gap-3 items-center">
              <img :src="table.company.logo" :alt="table.company.name" class="w-[40px] rounded-full" />
              <p class="flex flex-col">
                <span class="text-[14px] text-gray-900">{{ table.company.name }}</span>
                <span class="text-[14px] text-gray-500">{{ table.company.subname }}</span>
              </p>
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="w-full bg-[#f2f4f7] rounded-full h-2.5">
              <div class="bg-[#344054] h-2.5 rounded-full" :style="{ width: `${table.licenseUse}` }"></div>
            </div>
          </td>
          <td class="px-6 py-4">
            <span v-if="table.status === 'Customer'" class="bg-[#e6f8ef] text-green-800 text-xs font-medium px-[8px] py-[4px] rounded-full">Customer</span>
            <span v-if="table.status === 'Churned'" class="bg-[#eceff3] text-green-800 text-xs font-medium px-[8px] py-[4px] rounded-full">Churned</span>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center" v-if="table.users.length > 5">
              <img :src="user" alt="Avatar" v-for="user in table.users.slice(0, 5)" class="w-[24px] rounded-full -ms-2 border-2 border-white" />
              <div class="w-[24px] bg-white rounded-full -ms-2 border-2 border-white">+{{ table.users.length - 5 }}</div>
            </div>
            <div class="flex items-center" v-if="table.users.length <= 5">
              <img :src="user" alt="Avatar" v-for="user in table.users" class="w-[24px] rounded-full -ms-2 border-2 border-white" />
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center justify-between">
              <p class="flex flex-col">
                <span class="text-[14px] text-gray-900">{{ table.about.main }}</span>
                <span class="text-[14px] text-gray-500">{{ table.about.submain }}</span>
              </p>
            </div>
          </td>
          <td>
            <div class="flex items-center gap-3">
              <button @click="toggleRemove">
                <TrashIcon />
              </button>
              <button @click="toggleUpdate">
                <PencilIcon />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between items-center px-4 py-3">
      <p class="font-medium text-[14px]">Page {{ currentPage }} of {{ totalPages }}</p>
      <Paginate v-model="currentPage" :pageCount="totalPages" :clickHandler="goToPage" :prevText="''" :nextText="''" :prevClass="'flex items-center justify-center px-2 w-8 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700'" :nextClass="'flex items-center justify-center px-2 w-8 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700'" :prevLinkClass="'uil--arrow-left'" :nextLinkClass="'uil--arrow-right'" :containerClass="'flex items-center -space-x-px h-8 text-sm'" :pageLinkClass="'flex items-center justify-center px-2 w-8 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700'" :disabledClass="'bg-gray-300'"></Paginate>
    </div>
  </div>
</template>
