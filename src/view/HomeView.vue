<template>
    <div class="flex flex-col h-screen bg-gray-100">
        <!-- Navbar -->
        <div>
            <NavbarView />
        </div>

        <!-- Main Content -->
        <div class="flex-1 p-3 overflow-y-auto md:p-4">
            <div class="w-full xl:w-[45%]  mx-auto">
                <div class="grid grid-cols-2 gap-3 my-3">
                    <!-- Reward Type Dropdown -->
                    <div class="mt-2 space-y-1">
                        <label for="" class="font-koulen">ប្រភេទរង្វាន់: *</label>
                        <select required v-model="rewardTypeId"
                            class="w-full px-3 py-2 capitalize border border-gray-300 rounded-md font-koulen placeholder:text-sm">
                            <option selected disabled value="">--ជ្រើសរើស--</option>
                            <option v-for="types in rewardTypesDoc" :key="types?.id" :value="types?.id">
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
                            <option v-for="reward in filteredRewardDocs" :key="reward?.id" :value="reward?.id">
                                {{ reward.courseName }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- Background Image -->
                <div class="">
                    <img src="@/assets/Lucky-Draw_bg.png" alt="Lucky Draw" class="object-cover w-full h-full]">
                </div>

                <!-- Students for Today -->
                <div class="h-full p-6 bg-white shadow-xl">
                    <h3 class="flex items-center gap-1 text-xl font-bold font-koulen">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-user-search">
                            <circle cx="10" cy="7" r="4" />
                            <path d="M10.3 15H7a4 4 0 0 0-4 4v2" />
                            <circle cx="17" cy="17" r="3" />
                            <path d="m21 21-1.9-1.9" />
                        </svg>
                        <span>ស្វែងរកអ្នកឈ្នះថ្ងៃនេះ</span>
                    </h3>
                    <div class="flex justify-center ">
                        <div v-if="showStudents">
                            <div class="relative">
                                
                                <div v-for="student in displayedStudents" :key="student?.id" class="mb-4 space-y-2">
                                    <div class="flex justify-center">
                                    <img class="w-[100px]" src="@/assets/Animation - 1738659514470.gif" alt="">
                                </div>
                                    <div class="flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="lucide lucide-chevrons-right">
                                            <path d="m6 17 5-5-5-5" />
                                            <path d="m13 17 5-5-5-5" />
                                        </svg>
                                        <p class="text-md md:text-xl font-koulen"><strong>អប់អរសារទរ:🎉 </strong> <span class="text-red-500">{{ student?.studentName }}</span>
                                        </p>

                                    </div>
                                    <div class="flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="lucide lucide-chevrons-right">
                                            <path d="m6 17 5-5-5-5" />
                                            <path d="m13 17 5-5-5-5" />
                                        </svg>
                                        <div class="flex gap-2 text-md md:text-xl font-koulen"><strong>ឈ្នះរង្វាន់:🏅</strong> 
                                            <div class="text-red-500">
                                                {{
                                            student?.rewardCourseName
                                            }}
                                            <span class="">{{ student?.rewardValue }} ភាគរយ</span>
                                            </div>
                                       
                                        </div>

                                    </div>

                                    <div class="flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="lucide lucide-chevrons-right">
                                            <path d="m6 17 5-5-5-5" />
                                            <path d="m13 17 5-5-5-5" />
                                        </svg>
                                        <p class="text-md md:text-xl font-koulen"><strong>លេខទូរស័ព្ទអ្នកឈ្នះ:</strong> <span class="text-red-500">{{ student?.phone}}</span>
                                        </p>

                                    </div>
                                </div>

                                <div class="absolute top-0 right-10">
                                    <img src="@/assets/congradulation.gif" alt="">
                                </div>
                                <div class="absolute top-0 translate-x-2 left-16">
                                    <img src="@/assets/congradulation.gif" alt="">
                                </div>
                            </div>
                        </div>
                        <!-- Show message to select reward type and reward if not selected -->
                        <div v-else>
                            <p class="my-3 text-gray-500 font-koulen ">🚫 មិនមានអ្នកឈ្នះថ្ងៃនេះ</p>
                        </div>

                    </div>
                    <!-- Button to fetch and display students -->

                    <div class="flex justify-center space-x-2">

                        <!-- Button that shows "Find Winner" or "No Winners" based on isButtonDisabled -->
                        <!-- <button v-if="!isLoading"
                            :class="isButtonDisabled ? 'cursor-not-allowed bg-gray-400' : 'bg-red-500 hover:bg-red-400'"
                            class="p-2 mt-3 text-white font-koulen" @click="handleShowStudents"
                            :disabled="isButtonDisabled">
                            {{ isButtonDisabled ? 'មិនមានអ្នកឈ្នះទេ' : 'ស្វែងរកអ្នកឈ្នះ' }}
                        </button> -->


                        <button v-if="!isLoading"
                            class="flex items-center gap-1 p-2 mt-3 text-white bg-red-500 font-koulen hover:bg-red-400"
                            @click="handleShowStudents">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-scan-search">
                                    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                                    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                                    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                                    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="m16 16-1.9-1.9" />
                                </svg>

                            </span>
                            <span class="">{{ isButtonDisabled ? 'ស្វែងរកអ្នកឈ្នះម្តងទៀត' : 'ស្វែងរកអ្នកឈ្នះ' }}</span>
                        </button>



                        <!-- Loading state button -->
                        <button v-else
                            class="flex items-center gap-1 p-2 mt-3 text-white bg-red-400 cursor-not-allowed font-koulen">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-scan-search">
                                    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                                    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                                    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                                    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="m16 16-1.9-1.9" />
                                </svg>
                            </span>
                            <span>កំពុងស្វែងរកអ្នកឈ្នះ...</span>
                        </button>



                    </div>
                </div>
            </div>
        </div>

        <!-- Fixed Button -->


        <div class="relative">
            <div class="fixed bottom-4 right-20">
                <button @click="handleIsDropdown"
                    class="p-3 font-bold text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-list-check">
                        <path d="M11 18H3" />
                        <path d="m15 18 2 2 4-4" />
                        <path d="M16 12H3" />
                        <path d="M16 6H3" />
                    </svg>
                </button>
                <div class="absolute right-0 cursor-pointer -top-2">
                    <span class="px-2.5 text-white bg-red-500 rounded-full font-koulen text-sm">{{
                        uniqueCurrentStudentList.length }}</span>
                </div>
            </div>

        </div>

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




    <!-- modal list student get reward -->
    <div v-if="isModalOpen"  class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-top sm:h-screen"></span>
            <div v-motion-pop-visible
                class="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all rounded-md transform bg-white shadow-xl sm:my-8 sm:align-middle sm:p-6 w-full md:w-[45%]">
                <div>
                    <div class="my-4">
                        <div class="text-lg font-medium leading-6 text-gray-900 font-koulen"> សិស្សឈ្នះនៅថ្ងៃនេះ <span
                                class="text-green-600">{{ itemQty?.courseName }}</span>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="bg-white ">
                            <div v-if="showStudents">
                                <div v-if="currentStudentList.length === 0">
                                    <p>មិនមានទិន្ន័យថ្ងៃនេះទេ.</p>
                                </div>
                                <div v-else class="grid grid-cols-1 gap-3 md:grid-cols-2 ">
                                    <div v-for="student in uniqueCurrentStudentList" :key="student.id"
                                        class="relative p-4 space-y-1 border">
                                        <div>
                                            <img class="w-[120px]" src="@/assets/Animation - 1738597397298.gif" alt="">
                                        </div>
                                        <p class="font-koulen">
                                            <strong>សូមអបអរសាទរ🥳 </strong>
                                            <span class="text-red-500">{{ student.studentName }}</span>
                                        </p>
                                        <p class="font-koulen">
                                            <strong>លេខទូរស័ព្ទអ្នកឈ្នះ:</strong> <span class="text-red-500">{{ student.phone }}</span>
                                        </p>
                                        <p class="space-x-1 font-koulen">
                                            <strong>ឈ្នះរង្វាន់🏅 </strong> <span class="text-red-500">{{ student.rewardCourseName }}</span>
                                            <span class="text-red-500">{{ student.rewardValue }} ភាគរយ</span>
                                        </p>
                                        <p class="font-koulen">
                                            <strong>អាស័យដ្ឋាន </strong> 
                                            <span class="text-red-500">{{ student.address }}</span>
                                        </p>
                                        <p class="font-koulen">
                                            <strong>កាលបរិច្ឆេតរង្វាន់: </strong>
                                            <span class="text-lg text-red-500"> {{ new Date(student.createdAt.seconds * 1000).toLocaleDateString('en-GB') }}
                                            </span>
                                        </p>
                                        <div class="absolute right-0 top-1">
                                            <img src="@/assets/congradulation.gif" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <p class="text-center">មិនទាន់មានអ្នកឈ្នះថ្ងៃនេះ</p>
                            </div>

                        </div>


                    </div>

                    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">


                        <span class="flex w-full mt-3 space-x-2 rounded-md shadow-sm sm:mt-0 sm:w-auto">
                            <button class="p-2 mt-3 text-sm text-white bg-blue-500 hover:bg-blue-400 font-koulen"
                                @click="clearData">
                                ជម្រះទិន្ន័យ
                            </button>
                            <button class="p-2 px-4 mt-3 text-sm text-white bg-red-500 hover:bg-red-400 font-koulen"
                                @click="handleIsDropdown">
                                បិទ
                            </button>

                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>




    <!-- modal congradulation -->
    <div v-if="isDropdownCongrate" class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-500 opacity-75 cursor-pointer " @click="handleCloseCongrate"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div v-motion-pop-visible
                class="inline-block px-4 pt-5 rounded-md pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white shadow-xl sm:my-8 sm:align-middle sm:p-6 w-full md:w-[40%] lg:w-[25%]">
                <div>

                    <div class="w-full">
                        <div class="bg-white">
                            <!-- Show all winners in the modal -->
                            <div v-if="showStudents">
                                <div v-if="displayedStudents.length === 0">
                                    <p>No students found for today.</p>
                                </div>
                                <div v-else>
                                    <div class="flex justify-center">
                                        <img class="object-contain w-[100px] "
                                            src="@/assets/Animation - 1738583895418.gif" alt="">
                                    </div>
                                    <!-- Loop through all students -->
                                    <div v-for="(student, index) in displayedStudents" :key="index"
                                        class="mb-4 space-y-2 text-center">
                                        <p class="text-2xl font-koulen">សូមអបអរសាទរ🥳 <span class="text-orange-600">{{
                                            student.studentName }}</span> 🥳
                                        </p>
                                        <p class="space-x-1 text-xl font-koulen"><strong>លេខទូរស័ព្ទអ្នកឈ្នះ:</strong>
                                            <span class="text-xl text-red-500">{{ student.phone }} </span>
                                        </p>

                                        <div v-if="!isLoading" class="absolute top-20 ">
                                            <img src="@/assets/firework.gif" alt="Congratulations GIF">
                                        </div>
                                        <div v-if="!isLoading" class="absolute right-0 top-20 ">
                                            <img src="@/assets/firework.gif" alt="Congratulations GIF">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Display all students on the homepage -->
                        </div>
                    </div>

                    <!-- <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <span class="flex w-full mt-3 space-x-2 rounded-md shadow-sm sm:mt-0 sm:w-auto">
                            <button type="button" @click="handleCloseCongrate"
                                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm font-koulen hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5">
                                បោះបង់
                            </button>
                        </span>
                    </div> -->
                </div>
            </div>
        </div>
    </div>



    





    <component :is="currentComponent" @close="currentComponent = ''" />

</template>




<script>
import { ref, onMounted, computed } from 'vue';
import { projectFirestore } from '@/config/config';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import NavbarView from '@/components/client/NavbarView.vue';
import CalandarComponent from '@/components/admin/CalandarComponent.vue';
import { handleMessageError, handleMessageSuccess } from '@/message';

export default {
    components: {
        NavbarView,
        CalandarComponent
    },
    setup() {

        const isModalOpen = ref(false);
        const currentComponent = ref('');
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

        const clickCount = ref(1); // Track button clicks
        const isButtonDisabled = ref(false);
        const isDropdownCongrate = ref(false);
        const studentIndex = ref(0);
        const lastSelectedRewardId = ref('');

        const currentWinner = ref([])
        const currentStudentList = ref([])

        const warningErrorMsg = ref("")

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
                            studentName: rewardDoc.data().studentName,
                            ...doc.data(),
                        });
                    });
                }
            }
        };

        onMounted(() => {

            // Get today's date in 'YYYY-MM-DD' format
            const todayDate = new Date().toISOString().split('T')[0];
            const storedDate = localStorage.getItem('lastDisplayedDate');

            // If today's date is different, clear previous day's data
            if (storedDate !== todayDate) {
                localStorage.removeItem('displayedStudents');
                localStorage.removeItem('clickCount');
                localStorage.removeItem('rewardTypeId');
                localStorage.removeItem('rewardId');
                localStorage.removeItem("currentWinner");
                localStorage.removeItem('isButtonDisabled');

                // Reset state variables
                currentWinner.value = [];
                currentStudentList.value = [];
                displayedStudents.value = [];
                studentsToday.value = [];
                rewardTypeId.value = '';
                rewardId.value = '';
                clickCount.value = 1;
                isButtonDisabled.value = false;
                isLoading.value = false;
                showStudents.value = false;

                // Store today's date in localStorage
                localStorage.setItem('lastDisplayedDate', todayDate);
            } else {
                // If it's the same date, restore data from localStorage
                fetchRewardTypes();

                const storedStudents = localStorage.getItem('displayedStudents');
                const storecurrentWinner = localStorage.getItem('currentWinner');
                const storecurrentStudentList = localStorage.getItem("currentStudentList")
                const storedClickCount = localStorage.getItem('clickCount');
                const storedRewardTypeId = localStorage.getItem('rewardTypeId');
                const storedRewardId = localStorage.getItem('rewardId');
                const storedIsButtonDisabled = localStorage.getItem('isButtonDisabled');

                if (storedStudents) {
                    displayedStudents.value = JSON.parse(storedStudents);
                    showStudents.value = true;
                }

                if (storedClickCount) {
                    clickCount.value = parseInt(storedClickCount, 10);
                }

                if (storedRewardTypeId) {
                    rewardTypeId.value = storedRewardTypeId;
                }

                if (storedRewardId) {
                    rewardId.value = storedRewardId;
                }

                if (storedIsButtonDisabled !== null) {
                    isButtonDisabled.value = JSON.parse(storedIsButtonDisabled);
                } else {
                    isButtonDisabled.value = false;
                }

                if (storecurrentStudentList) {
                    currentStudentList.value = JSON.parse(storecurrentStudentList);
                    showStudents.value = true;
                }

                if (storecurrentWinner) {
                    currentWinner.value = JSON.parse(storecurrentWinner);
                    showStudents.value = true;
                }
                console.log("Button Disabled State:", isButtonDisabled.value);
            }


        });


        // Filtered rewards based on selected rewardTypeId
        const filteredRewardDocs = computed(() => {
            try {
                return rewardDocs.value.filter(reward => reward.rewardTypeId === rewardTypeId.value);
            } catch (err) {
                console.error("Error filtering rewardDocs:", err);
                return []; // Return an empty array to prevent undefined issues
            }
        });





        const handleShowStudents = async () => {
            if (!rewardTypeId.value || !rewardId.value) {
                handleMessageError('សូមជ្រើសរើសរង្វាន់ដើម្បីស្វែងរកសិស្សឈ្នះថ្ងៃនេះ.');
                return;
            }

            isLoading.value = true;

            // Fetch students for today
            await fetchStudentToday();

            // Filter students based on selected reward type and reward
            const filteredStudents = studentsToday.value.filter(student =>
                student.rewardTypeId === rewardTypeId.value && student.rewardId === rewardId.value
            );

            if (filteredStudents.length === 0) {
                handleMessageError(`មិនមានសិស្សឈ្នះរង្វាន់ ${rewardDocs.value.find(reward => reward.id === rewardId.value)?.courseName || ''}ទេ`);
                // isModalWarning.value = true
                isLoading.value = false;
                displayedStudents.value = []
                return;
            }

            // ✅ Reset selections ONLY when switching rewards AND students exist
            if (lastSelectedRewardId.value !== rewardId.value) {
                currentWinner.value = [];
                // displayedStudents.value = [];
                studentIndex.value = 0;
                isButtonDisabled.value = false;

                localStorage.setItem("currentWinner", JSON.stringify([]));
                localStorage.setItem("displayedStudents", JSON.stringify([]));
                localStorage.setItem("currentStudentList", JSON.stringify([]));
                localStorage.setItem("isButtonDisabled", JSON.stringify(false));

                lastSelectedRewardId.value = rewardId.value;
            }

            // Reset studentIndex if it's out of bounds
            if (studentIndex.value >= filteredStudents.length) {
                studentIndex.value = 0;
            }

            const studentToAdd = filteredStudents[studentIndex.value];

            if (!studentToAdd) {
                console.error("Error: studentToAdd is undefined.");
                isLoading.value = false;
                return;
            }

            // Check for duplicate
            const isDuplicate = currentWinner.value.some(student => student.id === studentToAdd.id);
            if (isDuplicate) {
                handleMessageError('សិស្សទាំងអស់បានបង្ហាញនៅលើផ្ទាំងរួចរាល់ហើយ។​​ព្យាយាមម្តងទៀត');
                isLoading.value = false;
                return;
            }

            // Add student to lists
            displayedStudents.value = [studentToAdd];
            currentWinner.value.push(studentToAdd);
            currentStudentList.value.push(studentToAdd);
            

            // Update localStorage
            localStorage.setItem('displayedStudents', JSON.stringify(displayedStudents.value));
            localStorage.setItem('currentWinner', JSON.stringify(currentWinner.value));
            localStorage.setItem('currentStudentList', JSON.stringify(currentStudentList.value));

            localStorage.setItem('clickCount', clickCount.value);
            localStorage.setItem('rewardTypeId', rewardTypeId.value);
            localStorage.setItem('rewardId', rewardId.value);
            localStorage.setItem('isButtonDisabled', JSON.stringify(isButtonDisabled.value));

            showStudents.value = true;
            isLoading.value = false;
            isDropdownCongrate.value = true;

            // Move to next student or disable button
            if (studentIndex.value + 1 < filteredStudents.length) {
                studentIndex.value++;
            } else {
                isButtonDisabled.value = true;
                localStorage.setItem('isButtonDisabled', JSON.stringify(true));
            }
        };



        const handleCurrentComponent = (component) => {
            currentComponent.value = component
        }

        const clearData = () => {

            if (window.confirm("តើអ្នកចង់សម្អាត់ទិន្ន័យទាំងអស់មែនទេ?")) {
                localStorage.removeItem('displayedStudents');
                localStorage.removeItem('clickCount');
                localStorage.removeItem('rewardTypeId');
                localStorage.removeItem('rewardId');
                localStorage.removeItem("currentWinner")
                localStorage.removeItem("currentStudentList")

                currentStudentList.value = [];
                currentWinner.value = []
                displayedStudents.value = [];
                studentsToday.value = [];
                // rewardTypeId.value = '';
                // rewardId.value = '';
                clickCount.value = 1;
                isButtonDisabled.value = false;
                isLoading.value = false;
                // showStudents.value = false;

                handleMessageSuccess("អ្នកបានសម្អាតទិន្ន័យទាំងអស់")
                handleCloseCongrate();
            }
        };

        const handleIsDropdown = () => {
            isModalOpen.value = !isModalOpen.value
        }

        const handleCloseCongrate = () => {
            isDropdownCongrate.value = false; // Close the modal
        };



        const uniqueCurrentStudentList = computed(() => {
            const uniqueStudents = [];
            const seenIds = new Set();

            for (const student of currentStudentList.value) {
                if (!seenIds.has(student.id)) {
                    seenIds.add(student.id);
                    uniqueStudents.push(student);
                }
            }


            return uniqueStudents;
        });



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
            isLoading,
            handleCurrentComponent,
            currentComponent,
            isButtonDisabled,
            clearData,
            isModalOpen,
            handleIsDropdown,
            isDropdownCongrate,
            handleCloseCongrate,
            currentWinner,
            currentStudentList,
            uniqueCurrentStudentList,
            warningErrorMsg
        };
    }
};
</script>