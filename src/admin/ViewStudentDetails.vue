<template>
    <div class="flex items-center gap-1 my-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-scroll-text">
            <path d="M15 12h-5" />
            <path d="M15 8h-5" />
            <path d="M19 17V5a2 2 0 0 0-2-2H4" />
            <path
                d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
        </svg>
        <div class="font-koulen">បញ្ចីសិស្ស</div>
    </div>

    <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
            <div class="p-1.5 min-w-full inline-block align-middle">
                <div class="bg-white border divide-y dark:border-gray-700 dark:divide-gray-700">
                    <!-- Search and Buttons -->
                    <div class="flex items-center justify-between px-4 py-3">
                        <div class="relative max-w-xs">
                            <label class="sr-only">Search</label>
                            <input v-model="searchText" type="text" name="hs-table-with-pagination-search"
                                id="hs-table-with-pagination-search"
                                class="block w-full px-3 py-2 text-sm border shadow-sm ps-9 placeholder:font-koulen focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                placeholder="ស្វែងរក...">
                            <div class="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                                <svg class="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                            </div>
                        </div>
                        <div class="space-x-2">
                            <button @click="handlePrint" class="flex items-center gap-2 btn_add " >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-printer"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>
                                <span>បោះពុម្ព</span></button>
                            <!-- <button class="btn_add" @click="handleAddReward('AddRewardModal')">+ បង្កើតថ្មី</button> -->
                        </div>
                    </div>

                    <!-- Table -->
                    <div class="overflow-hidden">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead class="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        ឈ្មោះសិស្ស
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        លេខរង្វាន់
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        លេខទូរស័ព្ទ
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        អុីម៉ែល
                                    </th>

                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        រង្វាន់(Reward)
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        អាស័យដ្ឋាន
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        កាលបរិច្ឆេត
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">

                                <template v-for="rewardDoc in filteredRewards" :key="rewardDoc">
                                    <tr v-for="reward in rewardDoc.students" :key="reward.id">
                                        <td
                                            class="px-6 py-4 text-sm font-medium text-gray-800 capitalize font-koulen whitespace-nowrap dark:text-gray-200">

                                            {{ reward.studentName }}
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm font-medium text-gray-800 capitalize whitespace-nowrap dark:text-gray-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="text-orange-500 size-5">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                            </svg>

                                            <p class="bg-green-500 w-[50px] text-white px-3 rounded-full">{{
                                                rewardDoc.rewardNo }}</p>
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                                            {{ reward.phone }}
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                                            {{ reward.email }}
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm font-medium text-gray-800 capitalize font-koulen whitespace-nowrap dark:text-gray-200">
                                            {{ rewardDoc.courseName }} (<span class="text-orange-500">{{ rewardDoc.rewardValue }} ភាគរយ</span>)
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                                            {{ reward.address }}
                                        </td>

                                        <td
                                            class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                                            {{ reward.createdAt ? new Date(reward.createdAt.seconds *
                                                1000).toLocaleDateString('en-US', {
                                                    weekday: 'short',
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                }) : 'N/A' }}
                                        </td>
                                        
                                    </tr>
                                </template>
                            </tbody>

                        </table>
                    </div>


                    <!-- Pagination -->
                  
                </div>
            </div>
        </div>
    </div>

    
    <component :is="currentComponent" @close="currentComponent = ''" :updateRewardType="updateRewardType"
        :showReatimeData="showReatimeData" />
</template>



<script>
import { ref, onMounted } from 'vue';
import getNestedSubcollection from '@/firebase/getNestedDocmentV2';
import { useRoute } from 'vue-router';
import AddStudentRewardModal from '@/components/admin/AddStudentRewardModal.vue';
import { onUnmounted } from 'vue';
import { computed } from 'vue';
export default {
    components: {
        AddStudentRewardModal
    },
    setup() {
        const route = useRoute();
        const rewards = ref([]);
        const isLoading = ref(true);
        const error = ref(null);
        const currentComponent = ref('');
        let unsubscribe = null; 
        const searchText = ref('');

        onMounted(() => {
            try {
                unsubscribe = getNestedSubcollection(
                    "rewardTypes",
                    route.params.id,
                    "rewards",
                    "students",
                    (updatedData) => {
                        rewards.value = updatedData;
                        isLoading.value = false;
                    }
                );
            } catch (err) {
                error.value = err.message;
                isLoading.value = false;
            }
        });

        onUnmounted(() => {
            if (unsubscribe) unsubscribe();
        });

         // Filter rewards based on searchText
         const filteredRewards = computed(() => {
            if (searchText.value) {
                return rewards.value.filter((rewardDoc) => 
                    rewardDoc.students.some((student) => 
                        student.studentName.toLowerCase().includes(searchText.value.toLowerCase())
                    )
                );
            }
            return rewards.value;
        });

        const handleAddStudentReward = (component) => {
            currentComponent.value = component
        }

        const handlePrint = () => {
            window.print();
        }

        return { rewards, isLoading, error, handleAddStudentReward, currentComponent,handlePrint,searchText,filteredRewards };
    }
};
</script> 