<template>
    <div class="flex flex-col h-screen ">
        <!-- Navbar (always visible on all screen sizes) -->
        <nav class="flex items-center justify-between p-4 text-black border print:hidden ">
            <div class="text-xl font-koulen font-[500] text-red-600 flex items-center gap-1">
                <img src="@/assets/icons8-reward.gif" class="w-10" alt="">
                <p>ម៉ាស្ទ័រអាយធីចាប់រង្វាន់</p>
            </div>
            <div class="hidden space-x-6 lg:flex">
                <CurrentDate />

            </div>
            <div class="flex items-center gap-2">
                <div class="flex gap-1">
                    <p class=" font-koulen">ប្រវត្តិរូប៖</p>
                    <span class="font-bold capitalize">{{ user?.displayName }}</span>
                </div>
                <div class="p-4 bg-gray-100 rounded-full">

                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-user">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </div>
            </div>
        </nav>

        <!-- Main content area -->
        <div class="flex flex-1 ">
            <!-- Sidebar (hidden on small screens) -->
            <div :class="{ 'block': isSidebarOpen, 'lg:block': true }"
                class="w-16 p-4 text-black transition-all duration-300 ease-in-out bg-white border-b border-r lg:w-64 print:hidden">
                <ul class="space-y-1">
                    <li class="block">
                        <RouterLink :to="{ name: 'reward' }"
                            class="flex items-center gap-3 px-4 py-2 font-thin rounded hover:bg-gray-200 '">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>
                            <span class="font-koulen">រង្វាន់</span>
                        </RouterLink>
                    </li>
                    
                    <li class="block">
                        <RouterLink :to="{ name: 'course' }"
                            class="flex items-center gap-3 px-4 py-2 font-thin rounded hover:bg-gray-200 '">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>
                            <span class="font-koulen">ឱកាសសំណាង</span>
                        </RouterLink>
                    </li>


                    <!-- <li class="block">
                        <RouterLink :to="{ name: 'studentlist' }"
                            class="flex items-center gap-3 px-4 py-2 font-thin rounded hover:bg-gray-200 '">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>
                            <span class="font-koulen">សិស្សចាប់រង្វាន់</span>
                        </RouterLink>
                    </li> -->

                    <li class="block">
                        <RouterLink :to="{ name: 'student' }"
                            class="flex items-center gap-3 px-4 py-2 font-thin rounded hover:bg-gray-200 '">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>
                            <span class="font-koulen">សិស្សចាប់រង្វាន់</span>
                        </RouterLink>
                    </li>

                    <li class="block">
                        <RouterLink :to="{ name: 'report' }"
                            class="flex items-center gap-3 px-4 py-2 font-thin rounded hover:bg-gray-200 font-koulen'">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>
                            <span class=" font-koulen">របាយការណ៍</span>
                        </RouterLink>
                    </li>
                    <!-- <li class="block">
                        <RouterLink :to="{ name: 'login' }"
                            class="flex items-center gap-3 px-4 py-2 font-thin rounded hover:bg-gray-200 font-koulen'">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                            </svg>
                            <span class=" font-koulen">អ្នកប្រើប្រាស់</span>
                        </RouterLink>
                    </li> -->
                </ul>
            </div>

            <!-- Content -->
            <div class="flex-1 p-6 bg-gray-200/60">
                <router-view />
            </div>
        </div>

        <div>
            <div class="fixed bottom-4 right-16">
                <button @click="handleCurrentComponent('CalandarComponent')"
                    class="p-3 font-bold text-white bg-green-500 rounded-full shadow-lg hover:bg-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-calendar-days">
                        <path d="M8 2v4" />
                        <path d="M16 2v4" />
                        <rect width="18" height="18" x="3" y="4" rx="2" />
                        <path d="M3 10h18" />
                        <path d="M8 14h.01" />
                        <path d="M12 14h.01" />
                        <path d="M16 14h.01" />
                        <path d="M8 18h.01" />
                        <path d="M12 18h.01" />
                        <path d="M16 18h.01" />
                    </svg>
                </button>
            </div>
        </div>

        <SignOutComponent />
    </div>

    <component :is="currentComponent" @close="currentComponent = ''" />
</template>

<script>
import { ref } from 'vue';
import CurrentDate from '@/components/admin/CurrentDate.vue';
import getUser from '@/firebase/getUser'
import SignOutComponent from '@/components/admin/SignOut.vue'
import CalandarComponent from '@/components/admin/CalandarComponent.vue'

export default {
    components: {
        CurrentDate,
        SignOutComponent,
        CalandarComponent
    },
    setup() {
        const currentComponent = ref("")
        const isSidebarOpen = ref(false);
        const { user } = getUser();
        const toggleSidebar = () => {
            isSidebarOpen.value = !isSidebarOpen.value;
        };

        const handleCurrentComponent = (component) => {
            currentComponent.value = component;
        };  

        return {
            isSidebarOpen,
            toggleSidebar,
            user,
            currentComponent,
            handleCurrentComponent
        };
    }
};
</script>

<style scoped>
/* Optional: Add custom styling for the sidebar and navbar */
</style>