<template>
    <div class="flex items-center gap-1 my-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-circle-alert">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
        <div class="font-koulen">របាយការណ៍</div>
    </div>

    <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
            <div class="p-1.5 min-w-full inline-block align-middle">
                <div class="bg-white border divide-y dark:border-gray-700 dark:divide-gray-700">
                    <!-- Search and Buttons -->
                    <div class="flex items-center justify-between px-4 py-3">
                        <div class="flex items-center gap-2">
                            <div class="relative max-w-xs">
                                <select name="hs-table-with-pagination-search" id="hs-table-with-pagination-search"
                                    class="block w-full px-3 py-2.5 text-sm font-bold capitalize border shadow-sm ps-9 placeholder:font-koulen focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 "
                                    placeholder="ស្វែងរក..." >

                                    <option value="">--ជ្រើសរើសរង្វាន់--</option>
                                    <option v-for="types in rewardTypes" :value="types.id" :key="types.id">{{
                                        types.rewardType }}</option>
                                </select>
                                <div
                                    class="absolute inset-y-0 flex items-center text-gray-600 pointer-events-none start-0 ps-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-gift">
                                        <rect x="3" y="8" width="18" height="4" rx="1" />
                                        <path d="M12 8v13" />
                                        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                                        <path
                                            d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
                                    </svg>
                                </div>
                            </div>

                            <div class="relative max-w-xs">
                                <input type="date" name="hs-table-with-pagination-search"
                                    id="hs-table-with-pagination-search"
                                    class="block w-full px-3 py-2 text-sm border shadow-sm ps-9 placeholder:font-koulen focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                    placeholder="ស្វែងរក..." :value="currentDate">
                                <div
                                    class="absolute inset-y-0 flex items-center text-gray-600 pointer-events-none start-0 ps-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-calendar-fold">
                                        <path d="M8 2v4" />
                                        <path d="M16 2v4" />
                                        <path d="M21 17V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11Z" />
                                        <path d="M3 10h18" />
                                        <path d="M15 22v-4a2 2 0 0 1 2-2h4" />
                                    </svg>
                                </div>
                            </div>

                            <div class="relative max-w-xs">
                                <input type="date" name="hs-table-with-pagination-search"
                                    id="hs-table-with-pagination-search"
                                    class="block w-full px-3 py-2 text-sm border shadow-sm ps-9 placeholder:font-koulen focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                    placeholder="ស្វែងរក..." :value="currentDate">
                                <div
                                    class="absolute inset-y-0 flex items-center text-gray-600 pointer-events-none start-0 ps-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-calendar-fold">
                                        <path d="M8 2v4" />
                                        <path d="M16 2v4" />
                                        <path d="M21 17V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11Z" />
                                        <path d="M3 10h18" />
                                        <path d="M15 22v-4a2 2 0 0 1 2-2h4" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <div class="space-x-2">

                                    <button class="flex items-center gap-1 btn_add">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="lucide lucide-arrow-down-narrow-wide">
                                            <path d="m3 16 4 4 4-4" />
                                            <path d="M7 20V4" />
                                            <path d="M11 4h4" />
                                            <path d="M11 8h7" />
                                            <path d="M11 12h10" />
                                        </svg>
                                        <span>ច្រោះ</span></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Table -->
                    <div class="overflow-hidden">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead class="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        វគ្គសិក្សា
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        ពិពណ៌នា
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        កាលបរិច្ឆេត
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-end font-koulen">
                                        សកម្មភាព
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div class="px-4 py-1">
                        <nav class="flex items-center space-x-1">
                            <!-- Previous Button -->
                            <button type="button"
                                class="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                <span aria-hidden="true">«</span>
                                <span class="sr-only">Previous</span>
                            </button>

                            <!-- Next Button -->
                            <button type="button"
                                class="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                <span aria-hidden="true">»</span>
                                <span class="sr-only">Next</span>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import getCollection from '@/firebase/getCollection';

export default {
    setup() {

        const { document: rewardTypes } = getCollection("rewardTypes")


        const getCurrentDate = () => {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const currentDate = getCurrentDate();

        return {
            currentDate,
            rewardTypes
        };
    },
};



</script>