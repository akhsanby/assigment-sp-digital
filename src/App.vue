<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";

import HomeIcon from "@/assets/icons/home.svg";
import LayerIcon from "@/assets/icons/layer.svg";
import BookIcon from "@/assets/icons/book.svg";
import PeopleIcon from "@/assets/icons/people.svg";
import BriefCaseIcon from "@/assets/icons/brief-case.svg";
import TagIcon from "@/assets/icons/tag.svg";
import UserIcon from "@/assets/icons/user.svg";

function closeNavbarMenu() {
  document.getElementById("menu-navbar").classList.add("hidden");
  document.getElementById("menu-navbar").classList.remove("block");
}
</script>

<template>
  <div class="bg-[#101828] fixed w-[20rem] h-screen top-0 z-40 p-[1rem] hidden sm:hidden" id="menu-navbar">
    <span class="material-symbols--close" @click="closeNavbarMenu"></span>
    <ul class="space-y-2 text-white capitalize">
      <li class="p-2 bg-[#344054] rounded-md flex items-center gap-x-2 cursor-pointer">
        <HomeIcon />
        <spa>dashboard</spa>
      </li>
      <li class="p-2 rounded-md flex gap-x-2 cursor-pointer">
        <LayerIcon />
        <span>service</span>
      </li>
      <li class="p-2 rounded-md flex gap-x-2 cursor-pointer">
        <BookIcon />
        <span>order</span>
      </li>
      <li class="p-2 rounded-md flex gap-x-2 cursor-pointer">
        <PeopleIcon />
        <span>customer</span>
      </li>
      <li class="p-2 rounded-md flex gap-x-2 cursor-pointer">
        <BriefCaseIcon />
        <span>customer identity</span>
      </li>
      <li class="p-2 rounded-md flex gap-x-2 cursor-pointer">
        <TagIcon />
        <span>promo code</span>
      </li>
      <li class="p-2 rounded-md flex gap-x-2 cursor-pointer">
        <UserIcon />
        <span>admin user</span>
      </li>
    </ul>
  </div>
  <RouterView />
</template>
