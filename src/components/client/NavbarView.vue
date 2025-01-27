<template>
    <div class="flex flex-col">
        <!-- Navbar (always visible on all screen sizes) -->
        <nav class="bg-white  border text-black p-4 flex justify-between items-center">
            <div class="text-xl font-koulen font-[500] text-red-600 flex items-center gap-1">
                <img src="@/assets/icons8-reward.gif" class="w-10" alt="">
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