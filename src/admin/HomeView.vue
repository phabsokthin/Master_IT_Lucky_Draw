<template>
    <div class="flex flex-col h-screen">
        <!-- Navbar (always visible on all screen sizes) -->
        <nav class="bg-white  border text-black p-4 flex justify-between items-center">
            <div class="text-xl font-koulen font-[500] text-red-600 flex items-center gap-1">
                <img src="@/assets/icons8-reward.gif" class="w-10" alt="">
                <p>ម៉ាស្ទ័រអាយធីផ្សងសំណាង</p>
            </div>
            <div class="hidden lg:flex space-x-6">
                <CurrentDate />

            </div>
            <div class="bg-gray-100 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-user">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            </div>

        </nav>

        <!-- Main content area -->
        <div class="flex flex-1">
            <!-- Sidebar (hidden on small screens) -->
            <div :class="{ 'block': isSidebarOpen, 'lg:block': true }"
                class="lg:w-64 w-16 bg-white border-b border-r  text-black  p-4 transition-all duration-300 ease-in-out">
                <ul class="space-y-1">
                    <li class="block">
                        <RouterLink :to="{ name: 'dashboard' }"
                            class=" py-2 px-4 hover:bg-gray-200 rounded font-koulen font-thin flex items-center gap-3'">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>
                            <span>បង្កើតរង្វាន់</span>
                        </RouterLink>
                    </li>
                    <li class="block">
                        <router-link :to="{ name: 'reward' }"
                            class=" py-2 px-4 hover:bg-gray-200 rounded font-koulen font-thin flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>
                            <span>សិស្សផ្សងសំណាង</span>
                        </router-link>
                    </li>
                    <li class="block">
                        <RouterLink :to="{ name: 'dashboard' }"
                            class=" py-2 px-4 hover:bg-gray-200 rounded font-koulen font-thin flex items-center gap-3'">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>
                            <span>របាយការណ៍</span>
                        </RouterLink>
                    </li>
                    <li class="block">
                        <RouterLink :to="{ name: 'login' }"
                            class=" py-2 px-4 hover:bg-gray-200 rounded font-koulen font-thin flex items-center gap-3'">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>
                            <span>អ្នកប្រើប្រាស់</span>
                        </RouterLink>
                    </li>
                </ul>
            </div>

            <!-- Content -->
            <div class="flex-1 p-6 bg-gray-200/60">
                <router-view />

            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import CurrentDate from '@/components/admin/CurrentDate.vue';

export default {
    components: {
        CurrentDate
    },
    setup() {
        const isSidebarOpen = ref(false);

        const toggleSidebar = () => {
            isSidebarOpen.value = !isSidebarOpen.value;
        };

        return {
            isSidebarOpen,
            toggleSidebar
        };
    }
};
</script>

<style scoped>
/* Optional: Add custom styling for the sidebar and navbar */
</style>