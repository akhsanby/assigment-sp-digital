<script setup>
import { useModalStore } from "@/stores";
import { storeToRefs } from "pinia";

const modalStore = useModalStore();
const { showRemove, tempRemove, closeRemove, confirmRemove } = storeToRefs(modalStore);
</script>

<template>
  <div id="remove-modal">
    <div v-if="showRemove" :class="showRemove ? 'flex' : 'hidden'" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 class="text-xl font-semibold text-gray-900">Confirm Delete</h3>
            <button type="button" @click="closeRemove" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5 space-y-4">
            <p class="text-base leading-relaxed text-gray-500">Remove Company {{ tempRemove.company.name }}</p>
          </div>
          <!-- Modal footer -->
          <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
            <button type="button" @click="() => confirmRemove(tempRemove.id)" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Confirm</button>
            <button type="button" @click="closeRemove" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
