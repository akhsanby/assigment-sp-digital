<script setup>
import HomeIcon from "@/assets/icons/home.svg";
import LayerIcon from "@/assets/icons/layer.svg";
import BookIcon from "@/assets/icons/book.svg";
import PeopleIcon from "@/assets/icons/people.svg";
import BriefCaseIcon from "@/assets/icons/brief-case.svg";
import TagIcon from "@/assets/icons/tag.svg";
import UserIcon from "@/assets/icons/user.svg";
import ExitIcon from "@/assets/icons/exit.svg";
</script>

<template>
  <div class="absolute top-0 w-[280px] text-white capitalize px-[1rem]">
    <p class="text-[28px] font-bold my-[24px]">visa indonesia</p>
    <ul class="space-y-2">
      <li class="p-2 bg-[#344054] rounded-md flex gap-x-2 cursor-pointer">
        <HomeIcon />
        <span>dashboard</span>
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
    <div class="fixed bottom-[32px]">
      <hr class="h-px mb-4 bg-gray-200 border-0" />
      <div class="flex gap-x-3 justify-between">
        <img src="../assets/Avatar.png" alt="avatar" width="40" />
        <p class="flex flex-col">
          <span class="font-semibold text-[14px]">Administrator</span>
          <span class="text-[14px]">admin@spdigital.com</span>
        </p>
        <ExitIcon />
      </div>
    </div>
  </div>
</template>
