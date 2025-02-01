<template>
    <div class="flex flex-col">
        <!-- Navbar (always visible on all screen sizes) -->
        <nav class="flex items-center justify-between p-4 text-black bg-white border">
            <div class="text-xl font-koulen font-[500] text-red-600 flex items-center gap-1">
                <img src="@/assets/icons8-reward.gif" class="w-10" alt="">
                <p>រង្វាន់ផ្សងសំណាង</p>
            </div>
           
            <div>
                <CurrentDate/>
            </div>
        </nav>

     
    </div>
</template>

<script>
import { ref } from 'vue';
import CurrentDate from '../admin/CurrentDate.vue';
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