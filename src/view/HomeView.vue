<template>
    <div class="flex flex-col h-screen bg-gray-100">
        <!-- Navbar -->
        <div>
            <NavbarView />
        </div>

        <!-- Main Content -->
        <div class="flex-1 p-3 overflow-y-auto md:p-0">
            <div class="w-full xl:w-[50%] mx-auto">
                <div class="grid grid-cols-2 gap-3 my-3">
                    <!-- Reward Type Dropdown -->
                    <div class="mt-2 space-y-1">
                        <label for="" class="font-koulen">ប្រភេទរង្វាន់: *</label>
                        <select required v-model="rewardTypeId"
                            class="w-full px-3 py-2 capitalize border border-gray-300 rounded-md font-koulen placeholder:text-sm">
                            <option selected disabled value="">--ជ្រើសរើស--</option>
                            <option v-for="types in rewardTypesDoc" :key="types.id" :value="types.id">
                                {{ types.rewardType }}
                            </option>
                        </select>
                    </div>

                    <!-- Reward Dropdown -->
                    <div class="mt-2 space-y-1">
                        <label for="" class="font-koulen">ឱកាសឈ្មះ: *</label>
                        <select required v-model="rewardId"
                            class="w-full px-3 py-2 capitalize border border-gray-300 rounded-md font-koulen placeholder:text-sm">
                            <option selected disabled value="">--ជ្រើសរើស--</option>
                            <option v-for="reward in filteredRewardDocs" :key="reward.id" :value="reward.id">
                                {{ reward.courseName }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- Background Image -->
                <div class="border-2 border-red-500 shadow-xl">
                    <img src="@/assets/Lucky-Draw_bg.png" alt="Lucky Draw" class="object-cover w-full h-full">
                </div>

                <!-- Students for Today -->
                <div class="p-6 mt-6 bg-white border-2 border-red-500 shadow-xl">
                    <h3 class="mb-4 text-xl font-bold font-koulen">ស្វែងរកអ្នកឈ្នះថ្ងៃនេះ</h3>
                    <div v-if="showStudents">
                        <div v-if="displayedStudents.length === 0">
                            <p>No students found for today.</p>
                        </div>
                        <div v-else class="relative">
                            <div v-for="student in displayedStudents" :key="student.id" class="mb-4">
                                <p class=" font-koulen"><strong>សិស្សឈ្មោះ:</strong> {{ student.studentName }}</p>
                                <!-- <p><strong>Reward Type ID:</strong> {{ student.rewardTypeId }}</p> -->
                                <p class=" font-koulen"><strong>ឈ្នះរង្វាន់:</strong> {{ student.rewardCourseName }}
                                    <span class="text-green-500">{{ student.rewardValue }} ភាគរយ</span>
                                </p>
                                <p class=" font-koulen"><strong>បានរង្វាន់:</strong> {{
                                    student.createdAt.toDate().toLocaleString() }}</p>
                                <div v-if="!isLoading" class="absolute -top-10 ">
                                    <img src="@/assets/congradulation.gif" alt="">
                                </div>
                            </div>


                        </div>
                    </div>
                    <!-- Show message to select reward type and reward if not selected -->
                    <div v-else>
                        <p>ជ្រើសរើសរង្វាន់ដើម្បីស្វែងរកអ្នកឈ្នះថ្ងៃនេះ</p>
                    </div>

                    <!-- Button to fetch and display students -->
                    <button v-if="!isLoading" class="p-2 mt-3 text-white bg-blue-500 hover:bg-blue-400 font-koulen"
                        @click="handleShowStudents">
                        ស្វែងរកអ្នកឈ្នះ
                    </button>
                    <button v-else class="p-2 mt-3 text-white bg-blue-400 font-koulen " @click="handleShowStudents">
                        កំពុងស្វែងរកអ្នកឈ្នះ...
                    </button>
                </div>
            </div>
        </div>

        <!-- Fixed Button -->
        <div class="fixed bottom-4 right-8">
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
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { projectFirestore } from '@/config/config';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import NavbarView from '@/components/client/NavbarView.vue';

export default {
    components: {
        NavbarView
    },
    setup() {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Start of today
        const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // End of today
        const studentsToday = ref([]);
        const rewardTypeId = ref('');
        const rewardId = ref('');
        const rewardTypesDoc = ref([]);
        const rewardDocs = ref([]);
        const showStudents = ref(false); // Controls whether to show students or not
        const displayedStudents = ref([]); // Stores the students to display
        const isLoading = ref(false); // Loading state

        // Get today's date as Firestore Timestamp
        const startTimestamp = Timestamp.fromDate(startOfDay);
        const endTimestamp = Timestamp.fromDate(endOfDay);

        // Fetch Reward Types and Rewards
        const fetchRewardTypes = async () => {
            const rewardTypesRef = collection(projectFirestore, "rewardTypes");
            const rewardTypesSnapshot = await getDocs(rewardTypesRef);
            rewardTypesDoc.value = rewardTypesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Fetch rewards for each reward type
            for (const rewardTypeDoc of rewardTypesSnapshot.docs) {
                const rewardsSubcollectionRef = collection(rewardTypeDoc.ref, "rewards");
                const rewardsSnapshot = await getDocs(rewardsSubcollectionRef);
                rewardDocs.value = [
                    ...rewardDocs.value,
                    ...rewardsSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                        rewardTypeId: rewardTypeDoc.id
                    }))
                ];
            }
        };

        // Fetch Students for Today
        const fetchStudentToday = async () => {
            studentsToday.value = []; // Clear students list before fetching
            const rewardTypesRef = collection(projectFirestore, "rewardTypes");
            const rewardTypesSnapshot = await getDocs(rewardTypesRef);

            for (const rewardTypeDoc of rewardTypesSnapshot.docs) {
                const rewardTypeId = rewardTypeDoc.id;
                const rewardsSubcollectionRef = collection(rewardTypeDoc.ref, "rewards");
                const rewardsSnapshot = await getDocs(rewardsSubcollectionRef);

                for (const rewardDoc of rewardsSnapshot.docs) {
                    const rewardId = rewardDoc.id;
                    const studentsSubcollectionRef = collection(rewardDoc.ref, "students");

                    const studentsQuery = query(
                        studentsSubcollectionRef,
                        where("createdAt", ">=", startTimestamp),
                        where("createdAt", "<=", endTimestamp)
                    );

                    const studentsSnapshot = await getDocs(studentsQuery);

                    studentsSnapshot.docs.forEach(doc => {
                        studentsToday.value.push({
                            id: doc.id,
                            rewardTypeId,
                            rewardId,
                            rewardCourseName: rewardDoc.data().courseName,
                            rewardValue: rewardDoc.data().rewardValue,
                            ...doc.data(),
                        });
                    });
                }
            }
        };

        // Call the fetch functions onMounted
        onMounted(() => {
            fetchRewardTypes();
        });

        // Filtered rewards based on selected rewardTypeId
        const filteredRewardDocs = computed(() => {
            return rewardDocs.value.filter(reward => reward.rewardTypeId === rewardTypeId.value);
        });

        // Handle button click to fetch and display students
        const handleShowStudents = async () => {
            if (rewardTypeId.value && rewardId.value) {
                isLoading.value = true; // Set loading state to true
                await fetchStudentToday(); // Fetch students
                // Manually filter students based on selected rewardTypeId and rewardId
                displayedStudents.value = studentsToday.value.filter(student => {
                    return (
                        student.rewardTypeId === rewardTypeId.value &&
                        student.rewardId === rewardId.value
                    );
                });

                if (displayedStudents.value.length === 0) {
                    alert(`មិនមានអ្នកឈ្នះ ${rewardDocs.value.find(reward => reward.id === rewardId.value).courseName} នេះទេ`);
                    isLoading.value = false; // Reset loading state
                } else {
                    showStudents.value = true; // Show students section if data is available
                    isLoading.value = false; // Reset loading state
                }

            } else {
                alert('Please select both Reward Type and Reward.');
            }
        };

        return {
            studentsToday,
            rewardTypesDoc,
            rewardDocs,
            rewardTypeId,
            rewardId,
            filteredRewardDocs,
            displayedStudents,
            showStudents,
            handleShowStudents,
            isLoading
        };
    }
};
</script>
