<script setup>
import { useTableDataStore } from "@/stores";
import { storeToRefs } from "pinia";

const { checkedData } = storeToRefs(useTableDataStore());
</script>

<template>
  <div :class="checkedData > 0 ? 'flex' : 'hidden'" id="toast-top-right" class="fixed items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
    <div class="text-sm font-normal">{{ checkedData }} selected</div>
  </div>
</template>
