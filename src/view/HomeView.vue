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
                <div class="border-2 border-red-500 shadow-xl">
                    <img src="@/assets/Lucky-Draw_bg.png" alt="Lucky Draw" class="object-cover w-full h-full">
                </div>

                <!-- Students for Today -->
                <div class="p-6 mt-6 bg-white border-2 border-red-500 shadow-xl">
                    <h3 class="mb-4 text-xl font-bold font-koulen">ស្វែងរកអ្នកឈ្នះថ្ងៃនេះ</h3>
                    <div v-if="showStudents">
                        <div v-if="currentWinner.length === 0">
                            <p>No students found for today.</p>
                        </div>
                        <div v-else class="relative">
                            <div v-for="student in currentWinner" :key="student?.id" class="mb-4">
                                <p class=" font-koulen"><strong>សិស្សឈ្មោះ:</strong> {{ student?.studentName }}</p>
                                <!-- <p><strong>Reward Type ID:</strong> {{ student.rewardTypeId }}</p> -->
                                <p class=" font-koulen"><strong>ឈ្នះរង្វាន់:</strong> {{ student?.rewardCourseName }}
                                    <span class="text-green-500">{{ student?.rewardValue }} ភាគរយ</span>
                                </p>

                                <p class="font-koulen"><strong>បានរង្វាន់:</strong> {{
                                    new Date(student?.createdAt.seconds * 1000).toLocaleDateString('en-GB')
                                    }}</p>
                                <!-- <div v-if="!isLoading" class="absolute -top-10 ">
                                    <img src="@/assets/congradulation.gif" alt="">
                                </div> -->
                            </div>

                        </div>
                    </div>
                    <!-- Show message to select reward type and reward if not selected -->
                    <div v-else>
                        <p class=" font-koulen">ជ្រើសរើសរង្វាន់ដើម្បីស្វែងរកអ្នកឈ្នះថ្ងៃនេះ</p>
                    </div>

                    <!-- Button to fetch and display students -->

                    <div class="space-x-2">

                        <!-- Button that shows "Find Winner" or "No Winners" based on isButtonDisabled -->
                        <!-- <button v-if="!isLoading"
                            :class="isButtonDisabled ? 'cursor-not-allowed bg-gray-400' : 'bg-red-500 hover:bg-red-400'"
                            class="p-2 mt-3 text-white font-koulen" @click="handleShowStudents"
                            :disabled="isButtonDisabled">
                            {{ isButtonDisabled ? 'មិនមានអ្នកឈ្នះទេ' : 'ស្វែងរកអ្នកឈ្នះ' }}
                        </button> -->


                        <button v-if="!isLoading" class="p-2 mt-3 text-white bg-red-500 font-koulen hover:bg-red-400"
                            @click="handleShowStudents">
                            {{ isButtonDisabled ? 'មិនមានអ្នកឈ្នះទេ' : 'ស្វែងរកអ្នកឈ្នះ' }}
                        </button>


                        <!-- Loading state button -->
                        <button v-else class="p-2 mt-3 text-white bg-red-400 cursor-not-allowed font-koulen">
                            កំពុងស្វែងរកអ្នកឈ្នះ...
                        </button>


                        <button class="p-2 mt-3 text-white bg-blue-500 hover:bg-blue-400 font-koulen"
                            @click="clearData">
                            ជម្រះទិន្ន័យ
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
                        currentWinner.length }}</span>
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
    <div v-if="isModalOpen" class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-top sm:h-screen"></span>
            <div
                class="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white shadow-xl sm:my-8 sm:align-middle sm:p-6 w-full md:w-[45%]">
                <div>
                    <div class="my-4">
                        <div class="text-lg font-medium leading-6 text-gray-900 font-koulen"> សិស្សឈ្នះនៅថ្ងៃនេះ <span
                                class="text-green-600">{{ itemQty?.courseName }}</span>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="bg-white ">
                            <div v-if="showStudents">
                                <div v-if="displayedStudents.length === 0">
                                    <p>No students found for today.</p>
                                </div>
                                <div v-else class="relative">
                                    <div v-for="student in currentWinner" :key="student.id" class="mb-4">
                                        <p class=" font-koulen"><strong>សិស្សឈ្មោះ:</strong> {{ student.studentName }}
                                        </p>
                                        <!-- <p><strong>Reward Type ID:</strong> {{ student.rewardTypeId }}</p> -->
                                        <p class=" font-koulen"><strong>ឈ្នះរង្វាន់:</strong> {{
                                            student.rewardCourseName }}
                                            <span class="text-green-500">{{ student.rewardValue }} ភាគរយ</span>
                                        </p>

                                        <p class="font-koulen"><strong>បានរង្វាន់:</strong> {{
                                            new Date(student.createdAt.seconds * 1000).toLocaleDateString('en-GB')
                                            }}</p>
                                        <div v-if="!isLoading" class="absolute -top-10 ">
                                            <img src="@/assets/congradulation.gif" alt="">
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <!-- Show message to select reward type and reward if not selected -->
                            <div v-else>
                                <p class="text-center">មិនទាន់មានអ្នកឈ្នះថ្ងៃនេះ</p>
                            </div>

                        </div>


                    </div>

                    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">


                        <span class="flex w-full mt-3 space-x-2 rounded-md shadow-sm sm:mt-0 sm:w-auto">
                            <button type="button" @click="handleIsDropdown"
                                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm font-koulen hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5">
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
                                        <img class="object-contain w-[100px] " src="@/assets/Animation - 1738583895418.gif" alt="">
                                    </div>
                                    <!-- Loop through all students -->
                                    <div v-for="(student, index) in displayedStudents" :key="index" class="mb-4 text-center">
                                        <p class="text-2xl font-koulen">អប់អរសារទរ <span class="text-orange-600">{{ student.studentName }}</span>
                                        </p>
                                        <p class="space-x-1 font-koulen"><strong>លេខទូរស័ព្ទអ្នកឈ្នះ:</strong> 
                                            <span class="text-xl text-green-500">{{ student.phone }} </span>
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
import { handleMessageError } from '@/message';

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

        const currentWinner = ref([])

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

        // Call the fetch functions onMounted


        // onMounted(() => {
        //     // Fetch reward types (existing logic)
        //     fetchRewardTypes();

        //     // Restore data from localStorage if available
        //     const storedStudents = localStorage.getItem('displayedStudents');
        //     const storecurrentWinner = localStorage.getItem('currentWinner');
        //     const storedClickCount = localStorage.getItem('clickCount');
        //     const storedRewardTypeId = localStorage.getItem('rewardTypeId');
        //     const storedRewardId = localStorage.getItem('rewardId');
        //     const storedIsButtonDisabled = localStorage.getItem('isButtonDisabled'); // Restore the isButtonDisabled state

        //     if (storedStudents) {
        //         displayedStudents.value = JSON.parse(storedStudents);
        //         showStudents.value = true;
        //     }

        //     if (storedClickCount) {
        //         clickCount.value = parseInt(storedClickCount, 10);
        //     }

        //     if (storedRewardTypeId) {
        //         rewardTypeId.value = storedRewardTypeId;
        //     }

        //     if (storedRewardId) {
        //         rewardId.value = storedRewardId;
        //     }

        //     if (storecurrentWinner) {
        //         currentWinner.value = JSON.parse(storecurrentWinner);
        //         showStudents.value = true;
        //     }

        //     // Restore button disabled state from localStorage, default to false if not found
        //     if (storedIsButtonDisabled !== null) {
        //         isButtonDisabled.value = JSON.parse(storedIsButtonDisabled);
        //     } else {
        //         // Set it to a default disabled state if needed, for example if the button should be disabled by default
        //         isButtonDisabled.value = true; // or false, based on your logic
        //     }

        //     console.log("Button Disabled State:", isButtonDisabled.value);
        // });


        onMounted(() => {
            // Get today's date
            const todayDate = new Date().toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
            const storedDate = localStorage.getItem('lastDisplayedDate');

            // Check if today's data has already been displayed
            if (storedDate === todayDate) {
                // If the date is the same, clear all localStorage related data
                localStorage.removeItem('displayedStudents');
                localStorage.removeItem('clickCount');
                localStorage.removeItem('rewardTypeId');
                localStorage.removeItem('rewardId');
                localStorage.removeItem("currentWinner");
                localStorage.removeItem('lastDisplayedDate'); // Remove lastDisplayedDate

                // Reset all necessary states
                currentWinner.value = [];
                displayedStudents.value = [];
                studentsToday.value = [];
                rewardTypeId.value = '';
                rewardId.value = '';
                clickCount.value = 1;
                isButtonDisabled.value = false;
                isLoading.value = false;
                showStudents.value = false;
            }

            // Otherwise, fetch and display the data as usual
            else {
                fetchRewardTypes();

                // Restore data from localStorage if available
                const storedStudents = localStorage.getItem('displayedStudents');
                const storecurrentWinner = localStorage.getItem('currentWinner');
                const storedClickCount = localStorage.getItem('clickCount');
                const storedRewardTypeId = localStorage.getItem('rewardTypeId');
                const storedRewardId = localStorage.getItem('rewardId');
                const storedIsButtonDisabled = localStorage.getItem('isButtonDisabled'); // Restore the isButtonDisabled state

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



                // Restore button disabled state from localStorage, default to false if not found
                if (storedIsButtonDisabled !== null) {
                    isButtonDisabled.value = JSON.parse(storedIsButtonDisabled);
                } else {
                    isButtonDisabled.value = true; // or false, based on your logic
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
            return rewardDocs.value.filter(reward => reward.rewardTypeId === rewardTypeId.value);
        });

        // Handle button click to fetch and display students once one





        // const handleShowStudents = async () => {
        //     if (!rewardTypeId.value || !rewardId.value) {
        //         alert('Please select both Reward Type and Reward.');
        //         return;
        //     }
        //     isLoading.value = true;

        //     await fetchStudentToday(); // Fetch students

        //     const filteredStudents = studentsToday.value.filter(student =>
        //         student.rewardTypeId === rewardTypeId.value && student.rewardId === rewardId.value
        //     );

        //     if (filteredStudents.length === 0) {
        //         handleMessageError(`មិនមានអ្នកឈ្នះ ${rewardDocs.value.find(reward => reward.id === rewardId.value)?.courseName || ''} នេះទេ`);
        //         isLoading.value = false;
        //         return;
        //     }

        //     // Append the new student to the displayedStudents list
        //     displayedStudents.value.push(filteredStudents[studentIndex.value]);

        //     // Store data
        //     localStorage.setItem('displayedStudents', JSON.stringify(displayedStudents.value));
        //     localStorage.setItem('clickCount', clickCount.value);
        //     localStorage.setItem('rewardTypeId', rewardTypeId.value);
        //     localStorage.setItem('rewardId', rewardId.value);

        //     showStudents.value = true;
        //     isLoading.value = false;

        //     localStorage.setItem('isButtonDisabled', JSON.stringify(isButtonDisabled.value));
        //     isDropdownCongrate.value = true;

        //     // Move to the next student or reset index
        //     studentIndex.value = (studentIndex.value + 1) % filteredStudents.length;
        // };







        const handleShowStudents = async () => {
            if (!rewardTypeId.value || !rewardId.value) {
                handleMessageError('សូមជ្រើសរើសរង្វាន់ដើម្បីស្វែងរកសិស្សឈ្នះថ្ងៃនេះ.');
                return;
            }
            isLoading.value = true;

            await fetchStudentToday(); // Fetch students

            const filteredStudents = studentsToday.value.filter(student =>
                student.rewardTypeId === rewardTypeId.value && student.rewardId === rewardId.value
            );

            if (filteredStudents.length === 0) {
                handleMessageError(`មិនមានអ្នកឈ្នះ ${rewardDocs.value.find(reward => reward.id === rewardId.value)?.courseName || ''} នេះទេ`);
                isLoading.value = false;
                return;
            }

            // Prevent adding duplicate student to currentWinner
            const studentToAdd = filteredStudents[studentIndex.value];
            if (!currentWinner.value.some(student => student.id === studentToAdd.id)) {
                // Show the first student
                displayedStudents.value = [studentToAdd];
                currentWinner.value.push(studentToAdd);

                // Store data in localStorage
                localStorage.setItem('displayedStudents', JSON.stringify(displayedStudents.value));
                localStorage.setItem("currentWinner", JSON.stringify(currentWinner.value));
                localStorage.setItem('clickCount', clickCount.value);
                localStorage.setItem('rewardTypeId', rewardTypeId.value);
                localStorage.setItem('rewardId', rewardId.value);

                showStudents.value = true;
                isLoading.value = false;

                // Store disabled state
                localStorage.setItem('isButtonDisabled', JSON.stringify(isButtonDisabled.value));

                // Enable the congratulatory dropdown
                isDropdownCongrate.value = true;

                // Move to the next student or reset index
                if (studentIndex.value + 1 < filteredStudents.length) {
                    studentIndex.value++;
                } else {
                    // Disable the button if no students left
                    isButtonDisabled.value = true;
                }
            } else {
                handleMessageError('This student has already been added to currentWinner.');
                isLoading.value = false;
            }
        };



        const handleCurrentComponent = (component) => {
            currentComponent.value = component
        }

        const clearData = () => {
            localStorage.removeItem('displayedStudents');
            localStorage.removeItem('clickCount');
            localStorage.removeItem('rewardTypeId');
            localStorage.removeItem('rewardId');
            localStorage.removeItem("currentWinner")

            currentWinner.value = []
            displayedStudents.value = [];
            studentsToday.value = [];
            rewardTypeId.value = '';
            rewardId.value = '';
            clickCount.value = 1;
            isButtonDisabled.value = false;
            isLoading.value = false;
            showStudents.value = false;
        };

        const handleIsDropdown = () => {
            isModalOpen.value = !isModalOpen.value
        }

        const handleCloseCongrate = () => {
            isDropdownCongrate.value = false; // Close the modal

            // Clear displayed students when modal is closed
            // displayedStudents.value = [];

            // Optionally, clear localStorage or handle state reset
            // localStorage.removeItem('displayedStudents');
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
            isLoading,
            handleCurrentComponent,
            currentComponent,
            isButtonDisabled,
            clearData,
            isModalOpen,
            handleIsDropdown,
            isDropdownCongrate,
            handleCloseCongrate,
            currentWinner
        };
    }
};
</script>