<script setup>
import { ref, onMounted } from "vue";
import { faker } from "@faker-js/faker";
import Dots3Icon from "@/assets/icons/3-dots.svg";
import Book2Icon from "@/assets/icons/book-2.svg";
import MessageIcon from "@/assets/icons/message.svg";
import FakeChartIcon from "@/assets/icons/fake-chart.svg";
import TrashIcon from "@/assets/icons/trash.svg";
import PencilIcon from "@/assets/icons/pencil.svg";

const tableData = ref([]);
const sortAsc = ref(true);

function generateAvatar() {
  let total = faker.number.int({ min: 3, max: 10 });

  let avatars = [];
  for (let i = 1; i <= total; i++) {
    avatars.push(faker.image.avatarLegacy());
  }

  return avatars;
}

function generateRandomPercent() {
  let usagePercent = faker.number.int({ min: 15, max: 80 });
  return `${usagePercent}%`;
}

function generateTableData(total = 10) {
  let data = [];
  for (let i = 1; i <= total; i++) {
    data.push({
      company: {
        logo: faker.image.avatar(),
        name: [faker.company.name(), faker.lorem.words(2)],
      },
      licenseUse: generateRandomPercent(),
      status: faker.helpers.arrayElement(["Customer", "Churned"]),
      users: generateAvatar(),
      about: [faker.lorem.words(3), faker.lorem.words({ min: 3, max: 4 })],
    });
  }

  if (!localStorage.getItem("data")) {
    localStorage.setItem("data", JSON.stringify(data));
    tableData.value = data;
  } else {
    tableData.value = JSON.parse(localStorage.getItem("data"));
  }
}

function sortByAscOrDesc() {
  if (sortAsc.value === true) {
    const ascendingData = tableData.value.sort((a, b) => a.company.name[0].localeCompare(b.company.name[0]));
    tableData.value = ascendingData;
    sortAsc.value = false;
  } else if (sortAsc.value === false) {
    const descendingData = tableData.value.sort((a, b) => b.company.name[0].localeCompare(a.company.name[0]));
    tableData.value = descendingData;
    sortAsc.value = true;
  }
}

onMounted(() => {
  generateTableData();
});
</script>

<template>
  <div class="bg-white w-[calc(100%-280px)] rounded-tl-3xl absolute left-[280px] top-[15px] p-[30px]">
    <p class="font-bold text-[30px]">Welcome back, Administrator</p>
    <p>Track, manage and forecast your platform information here.</p>
    <div class="grid grid-cols-3 gap-x-6 h-[170px] mt-[28px]">
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between">
        <div class="flex justify-between items-center">
          <p class="text-[1rem] font-medium">Revenue in Percentage</p>
          <Dots3Icon />
        </div>
        <div class="flex justify-between">
          <div class="flex items-end text-gray-500">
            <p class="flex items-center">
              <Icon icon="uil:arrow-up" width="1.5rem" class="text-green-400" />
              <span class="text-green-400 mx-1">40%</span>
              <span>vs last month</span>
            </p>
          </div>
          <FakeChartIcon />
        </div>
      </div>
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between">
        <div class="flex justify-between items-center">
          <p class="text-[1rem] font-medium">Total Order</p>
          <Book2Icon />
        </div>
        <p class="font-semibold text-[36px]">400 Orders</p>
      </div>
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between">
        <div class="flex justify-between items-center">
          <p class="text-[1rem] font-medium">Pending Customer</p>
          <MessageIcon />
        </div>
        <p class="font-semibold text-[36px]">20 Customer</p>
      </div>
    </div>

    <div class="flex justify-between">
      <div></div>
      <form class="w-[20rem] my-5">
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <Icon icon="iconamoon:search" />
          </div>
          <input type="text" id="email-address-icon" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Search" />
        </div>
      </form>
    </div>
    <div class="relative overflow-x-auto border border-gray-200 rounded-lg shadow">
      <table class="w-full text-left">
        <thead class="bg-gray-50">
          <tr class="text-[12px] text-gray-500">
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input id="checkbox-all" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
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
          <tr class="bg-white border-b" v-for="table in tableData">
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                <label for="checkbox-table-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex gap-3 items-center">
                <img :src="table.company.logo" :alt="table.company.name[0]" class="w-[40px] rounded-full" />
                <p class="flex flex-col">
                  <span class="text-[14px] text-gray-900">{{ table.company.name[0] }}</span>
                  <span class="text-[14px] text-gray-500">{{ table.company.name[1] }}</span>
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
                <div class="w-[24px] bg-white rounded-full -ms-2 border-2 border-white">+{{ table.users.length }}</div>
              </div>
              <div class="flex items-center" v-if="table.users.length <= 5">
                <img :src="user" alt="Avatar" v-for="user in table.users" class="w-[24px] rounded-full -ms-2 border-2 border-white" />
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center justify-between">
                <p class="flex flex-col">
                  <span class="text-[14px] text-gray-900">{{ table.about[0] }}</span>
                  <span class="text-[14px] text-gray-500">{{ table.about[1] }}</span>
                </p>
              </div>
            </td>
            <td>
              <div class="flex items-center gap-3">
                <TrashIcon />
                <PencilIcon />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-between items-center px-4 py-3">
        <p class="font-medium text-[14px]">Page 1 of 10</p>
        <ul class="flex items-center -space-x-px h-8 text-sm">
          <li>
            <a href="#" class="flex items-center justify-center px-2 w-8 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
              <span class="sr-only">Previous</span>
              <Icon icon="uil:arrow-left" width="1.5rem" />
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center justify-center px-3 w-8 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">1</a>
          </li>
          <li>
            <a href="#" class="flex items-center justify-center px-3 w-8 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">2</a>
          </li>
          <li>
            <a href="#" class="flex items-center justify-center px-3 w-8 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">...</a>
          </li>
          <li>
            <a href="#" class="flex items-center justify-center px-3 w-8 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">4</a>
          </li>
          <li>
            <a href="#" class="flex items-center justify-center px-3 w-8 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">5</a>
          </li>
          <li>
            <a href="#" class="flex items-center justify-center px-2 w-8 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
              <span class="sr-only">Next</span>
              <Icon icon="uil:arrow-right" width="2rem" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
