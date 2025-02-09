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
                                <select v-model="rewardTypeId" name="hs-table-with-pagination-search"
                                    id="hs-table-with-pagination-search"
                                    class="block w-full px-3 py-2.5 text-sm font-bold capitalize border shadow-sm ps-9 placeholder:font-koulen focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                    placeholder="ស្វែងរក...">
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

                            <!-- Date Filter Inputs (only show when a rewardType is selected) -->
                            <div v-if="rewardTypeId" class="flex gap-2">
                                <div class="relative max-w-xs">
                                    <input type="date" v-model="startDate" name="hs-table-with-pagination-search"
                                        id="hs-table-with-pagination-search"
                                        class="block w-full px-3 py-2 text-sm border shadow-sm ps-9 placeholder:font-koulen focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                        placeholder="ស្វែងរក...">
                                    <div
                                        class="absolute inset-y-0 flex items-center text-gray-600 pointer-events-none start-0 ps-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="lucide lucide-calendar-fold">
                                            <path d="M8 2v4" />
                                            <path d="M16 2v4" />
                                            <path d="M21 17V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11Z" />
                                            <path d="M3 10h18" />
                                            <path d="M15 22v-4a2 2 0 0 1 2-2h4" />
                                        </svg>
                                    </div>
                                </div>

                                <div class="relative max-w-xs">
                                    <input type="date" v-model="endDate" name="hs-table-with-pagination-search"
                                        id="hs-table-with-pagination-search"
                                        class="block w-full px-3 py-2 text-sm border shadow-sm ps-9 placeholder:font-koulen focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                        placeholder="ស្វែងរក...">
                                    <div
                                        class="absolute inset-y-0 flex items-center text-gray-600 pointer-events-none start-0 ps-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="lucide lucide-calendar-fold">
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
                                        <button @click="handleFilterDate" class="flex items-center gap-1 btn_add">
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
                                            <span>ច្រោះ</span>
                                        </button>
                                    </div>
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
                                        រង្វាន់សំណាង
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        ឈ្មោះសិស្ស
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
                                        កាលបរិច្ឆេត
                                    </th>

                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-end font-koulen">
                                        សកម្មភាព
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                <!-- Render rewards dynamically -->

                                <tr v-for="re in rewards" :key="re">
                                   
                                    <td
                                        class="px-6 py-4 text-sm font-medium text-green-500 font-koulen whitespace-nowrap dark:text-gray-400">
                                        {{ re.courseName }}
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm font-medium text-gray-900 capitalize font-koulen whitespace-nowrap dark:text-gray-400">
                                        {{ re.studentName }}
                                    </td>
                                   
                                  
                                    <td
                                        class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-400">
                                        {{ re.phone }}
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-400">
                                        {{ re.email }}
                                    </td>
                                    
                                    <td
                                        class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                                        {{ re.createdAt ? new Date(re.createdAt.seconds *
                                            1000).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            }) : 'N/A' }}
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-gray-400 text-end">
                                        <!-- <button @click="handleCurrentViewDetails(re)"
                                            class="p-2 text-xs text-white bg-green-500 rounded-full font-koulen hover:bg-green-600">
                                            មើល
                                        </button> -->
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Display Total Students -->
                    <div class="px-4 py-3">
                        <p class="font-koulen">សរុបសិស្ស: <span class="text-red-500">{{ rewards.length }}</span> នាក់</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <component :is="currentComponent" @close="currentComponent = ''" :rewardDoc="rewardDoc" :studentDoc="studentDoc" />
</template>

<script>
import { projectFirestore } from '@/config/config';
import { handleMessageError } from '@/message';
import { collection, query, where, getDocs, orderBy, doc, Timestamp } from 'firebase/firestore';
import { computed } from 'vue';
import { onMounted } from 'vue';
import ViewStudentRewardDetailsModal from '@/components/admin/ViewStudentRewardDetailModal.vue';
import { ref } from 'vue';

export default {
    components: {
        ViewStudentRewardDetailsModal
    },
    setup() {
        const rewardTypeId = ref("");
        const startDate = ref("");
        const endDate = ref("");
        const rewardTypes = ref([]);
        const rewards = ref([]);

        const currentComponent = ref("")

        const rewardDoc = ref("")
        const studentDoc = ref("")

        // Fetch the reward types from Firestore
        const getRewardTypes = async () => {
            const rewardTypesCollection = collection(projectFirestore, "rewardTypes");
            const rewardTypesSnapshot = await getDocs(rewardTypesCollection);
            rewardTypes.value = rewardTypesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
        };

        const fetchRewards = async () => {
            try {
                if (!rewardTypeId.value) return;

                const rewardTypeDocRef = doc(projectFirestore, "rewardTypes", rewardTypeId.value);
                const rewardsSubcollection = collection(rewardTypeDocRef, "rewards");

                let rewardsQuery = query(rewardsSubcollection, orderBy("createdAt", "desc"));

                if (startDate.value && endDate.value) {
                    const start = Timestamp.fromDate(new Date(startDate.value));
                    const end = Timestamp.fromDate(new Date(endDate.value + "T23:59:59"));

                    rewardsQuery = query(
                        rewardsQuery,
                        where("createdAt", ">=", start),
                        where("createdAt", "<=", end)
                    );
                }

                const rewardsSnapshot = await getDocs(rewardsQuery);

                if (rewardsSnapshot.empty) {
                    handleMessageError(`មិនមានទិន្ន័យសិស្សចន្លោះ ${startDate.value} ដល់ ${endDate.value}ទេ។ ព្យាយាមម្តងទៀត`);
                    rewards.value = [];
                } else {
                    rewards.value = rewardsSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                }
            } catch (error) {
                console.error("Error fetching rewards:", error);
                handleMessageError("កំហុសក្នុងការទាញយកទិន្ន័យ។ សូមព្យាយាមម្តងទៀត។");
            }
        };

        // Call this function when the component is mounted
        onMounted(() => {
            getRewardTypes();

        });

        // Handle the date filter click
        const handleFilterDate = () => {
            fetchRewards();
        };

        // Computed property to calculate the total number of students
        const totalStudents = computed(() => {
            return rewards.value.reduce((total, reward) => {
                const validStudents = reward.students
                    ? reward.students.filter(student => student.studentName) // Count only students with a name
                    : [];
                return total + validStudents.length;
            }, 0);
        });



        const getCurrentDate = () => {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(today.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        //handle View Student Modal

        const handleCurrentViewDetails = (reward) => {
            rewardDoc.value = reward
            currentComponent.value = "ViewStudentRewardDetailsModal"
        };

        return {
            rewardTypeId,
            startDate,
            endDate,
            rewardTypes,
            rewards,
            handleFilterDate,
            getCurrentDate,
            totalStudents,
            handleCurrentViewDetails,
            currentComponent,
            rewardDoc,
            studentDoc
        };
    },
};
</script>