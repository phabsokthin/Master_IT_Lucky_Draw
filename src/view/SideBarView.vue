<template>
    <div class="flex flex-col h-screen">
        <!-- Navbar (always visible on all screen sizes) -->
        <nav class="bg-white  border text-black p-4 flex justify-between items-center">
            <div class="text-xl font-koulen font-[500] text-red-600 flex items-center gap-1">
                <img src="../assets/icons8-reward.gif" class="w-10" alt="">
                <p>រង្វាន់ផ្សងសំណាង</p>
            </div>
            <div class="hidden lg:flex space-x-6">
                <RouterLink to="/" class="hover:bg-gray-700 rounded px-4 py-2">Home</RouterLink>
                <RouterLink to="/about" class="hover:bg-gray-700 rounded px-4 py-2">About</RouterLink>
                <!-- Add more links as needed -->
            </div>
            <!-- Mobile menu toggle button -->
            <!-- <button
          class="lg:hidden p-2 text-white bg-gray-800 rounded-md"
          @click="toggleSidebar"
        >
          Toggle Sidebar
        </button> -->
        </nav>

        <!-- Main content area -->
        <div class="flex flex-1">
            <!-- Sidebar (hidden on small screens) -->
            <div :class="{ 'block': isSidebarOpen, 'lg:block': true }"
                class="lg:w-64 w-16 bg-white border-b border-r  text-black  p-4 transition-all duration-300 ease-in-out">
                <ul>
                    <li class="block">
                        <RouterLink to="/" class=" py-2 px-4 hover:bg-gray-200 rounded font-koulen font-thin flex items-center gap-3'">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>
                            <span>បង្កើតរង្វាន់</span>
                        </RouterLink>
                    </li>
                    <li class="block">
                        <RouterLink to="/about" class=" py-2 px-4 hover:bg-gray-200 rounded font-koulen font-thin flex items-center gap-3'">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>
                            <span>សិស្សផ្សងសំណាង</span>
                        </RouterLink>
                    </li>
                    <li class="block">
                        <RouterLink to="/about" class=" py-2 px-4 hover:bg-gray-200 rounded font-koulen font-thin flex items-center gap-3'">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>
                            <span>របាយការណ៍</span>
                        </RouterLink>
                    </li>
                    <!-- Add more links as needed -->
                </ul>
            </div>

            <!-- Content -->
            <div class="flex-1 p-6 bg-gray-200/60">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
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