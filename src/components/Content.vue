<script setup>
import { ref, onMounted } from "vue";
import { faker } from "@faker-js/faker";
import _ from "lodash";
import uuid from "@/utils/uuid";
import { useTableDataStore } from "@/stores";
import { storeToRefs } from "pinia";
import Dots3Icon from "@/assets/icons/3-dots.svg";
import Book2Icon from "@/assets/icons/book-2.svg";
import MessageIcon from "@/assets/icons/message.svg";
import FakeChartIcon from "@/assets/icons/fake-chart.svg";
import ExitIcon from "@/assets/icons/exit.svg";

import RemoveModalVue from "@/components/modals/Remove.vue";
import UpdateModalVue from "@/components/modals/Update.vue";
import TableVue from "@/components/Table.vue";
import ToastVue from "@/components/Toast.vue";

const searchKeyword = ref("");
const { tableData, setTableData, setSearchResult } = storeToRefs(useTableDataStore());

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
      id: uuid(),
      checked: false,
      company: {
        logo: faker.image.avatar(),
        name: faker.company.name(),
        subname: faker.lorem.words(2),
      },
      licenseUse: generateRandomPercent(),
      status: faker.helpers.arrayElement(["Customer", "Churned"]),
      users: generateAvatar(),
      about: {
        main: faker.lorem.words(3),
        submain: faker.lorem.words({ min: 3, max: 4 }),
      },
    });
  }

  if (tableData.value.length === 0) {
    setTableData.value(data);
  }
}

function handleSearch() {
  if (!searchKeyword.value) {
    setSearchResult.value([]);
    return;
  }

  const result = _.filter(tableData.value, (item) => {
    return _.some(item, (val) => {
      if (_.isObject(val)) {
        return _.some(val, (v) => _.includes(_.toLower(v), _.toLower(searchKeyword.value)));
      } else {
        return _.includes(_.toLower(val), _.toLower(searchKeyword.value));
      }
    });
  });

  setSearchResult.value(result);
}

function showNavbarMenu() {
  document.getElementById("menu-navbar").classList.remove("hidden");
  document.getElementById("menu-navbar").classList.add("block");
}

onMounted(() => {
  generateTableData(100);
});
</script>

<template>
  <div class="lg:hidden flex items-center justify-between mx-[20px]">
    <div class="flex items-center gap-3">
      <span @click="showNavbarMenu" class="quill--hamburger sm:hidden"></span>
      <p class="text-[28px] font-bold my-[24px] capitalize text-white">visa indonesia</p>
    </div>
    <div class="flex items-center gap-3">
      <div class="flex gap-x-3 justify-between">
        <img src="../assets/Avatar.png" alt="avatar" width="40" />
        <p class="sm:flex flex-col text-white hidden">
          <span class="font-semibold text-[14px]">Administrator</span>
          <span class="text-[14px]">admin@spdigital.com</span>
        </p>
      </div>
      <ExitIcon />
    </div>
  </div>
  <div class="bg-white sm:w-[calc(100%-70px)] lg:w-[calc(100%-280px)] rounded-tl-3xl absolute sm:left-[70px] lg:left-[280px] top-[90px] lg:top-[15px] p-[30px]">
    <p class="font-bold text-[30px]">Welcome back, Administrator</p>
    <p>Track, manage and forecast your platform information here.</p>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:h-[9rem] lg:h-[10rem] mt-[28px] sm:mb-[5rem] lg:mb-0">
      <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between">
        <div class="flex justify-between items-center">
          <p class="text-[1rem] font-medium">Revenue in Percentage</p>
          <Dots3Icon class="sm:hidden lg:block" />
        </div>
        <div class="flex justify-between">
          <div class="flex items-end text-gray-500">
            <p class="flex items-center">
              <Icon icon="uil:arrow-up" width="1.5rem" class="text-green-400" />
              <span class="block text-green-400 mx-1">40%</span>
              <span class="block">vs last month</span>
            </p>
          </div>
          <FakeChartIcon class="sm:hidden lg:block" />
        </div>
      </div>
      <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between">
        <div class="flex justify-between items-center">
          <p class="text-[1rem] font-medium">Total Order</p>
          <Book2Icon />
        </div>
        <p class="font-semibold lg:text-[2rem] md:text-[1.5rem]">400 Orders</p>
      </div>
      <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between">
        <div class="flex justify-between items-center">
          <p class="text-[1rem] font-medium">Pending Customer</p>
          <MessageIcon />
        </div>
        <p class="font-semibold lg:text-[2rem] md:text-[1.5rem]">20 Customer</p>
      </div>
    </div>
    <div class="flex justify-between">
      <div></div>
      <form class="w-[20rem] my-5" @submit.prevent="handleSearch">
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <Icon icon="iconamoon:search" />
          </div>
          <input type="text" v-model="searchKeyword" id="email-address-icon" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Search" />
        </div>
      </form>
    </div>
    <TableVue />
  </div>
  <RemoveModalVue />
  <UpdateModalVue />
  <ToastVue />
</template>
