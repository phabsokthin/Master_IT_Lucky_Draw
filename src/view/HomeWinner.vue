<template>
    <div>
        <NavbarView />
    </div>
    <div class="w-[90%] h-full p-6 mx-auto bg-gradient-to-r from-rose-400 to-red-500 pb-10">
        <div class="my-2">
            <h1 class=" text-[40px] text-center text-white font-koulen">ឱកាសសំណាង</h1>
            <p class="text-[30px] text-center text-white font-koulen">Lucky Draw</p>
        </div>

        <div class="flex justify-center">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-[80%] lg:w-[80%] h-full">

                <div class="h-full">
                    <div class=" w-full max-w-[900px] mx-auto shadow-lg">
                        <div class="relative flex justify-center border border-red-500 rounded-t-xl">
                            <p
                                class="w-full px-6 py-2 text-xl text-center text-orange-600 bg-white border-r border-red-500 font-koulen">
                                ឱកាសសំណាងឈ្នះ
                            </p>
                            <p
                                class="w-[40%] max-w-[400px] px-6 py-2 text-center text-orange-600 bg-white font-koulen text-xl">
                                ចំនួនសំណាង
                            </p>
                        </div>

                        <div class="flex justify-center">
                            <div class="flex flex-col w-full border border-t-0 border-red-500 rounded-b-xl">
                                <div v-for="reward in courseDocReward" :key="reward.id">
                                    <div v-if="reward.qty !== 0" class="flex border-t border-red-500">
                                        <p
                                            class="w-full px-5 py-2 text-lg text-red-500 bg-white border-r border-red-500 font-koulen">
                                            {{ reward?.courseName }}
                                        </p>
                                        <p
                                            class="px-5 py-2 text-red-500 bg-white w-[40%] max-w-[400px] font-koulen text-xl">
                                            {{ reward?.qty }} <span class="text-sm">សំណាង</span>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <!-- Card 2 -->
                <div class="relative flex justify-center h-full">
                    <div class="bg-white  w-full md:w-[80%] lg:w-[50%] h-auto mx-auto shadow-lg">
                        <div class="text-center">
                            <p
                                class="w-full px-6 py-2 text-xl text-center text-orange-600 bg-white border-b border-red-500 font-koulen">
                                ម្ចាស់សំណាងថ្ងៃនេះ
                            </p>
                        </div>

                        <div class="flex flex-col items-center justify-center">
                            <div class="w-[300px]">
                                <img class="" src="@/assets/luckyDraw.png" alt="Lucky Draw" />
                            </div>

                            <div class="absolute flex justify-center mt-4 bottom-24">
                                <button v-if="!isLoading" @click="handleRandomFindRewardToday"
                                    class="shadow-2xl bg-reward">
                                    ឈ្នះសំណាងរៀនឥតគិតថ្លៃ
                                </button>
                                <button v-else disabled class="shadow-2xl bg-reward">
                                    ឈ្នះសំណាងរៀនឥតគិតថ្លៃ....
                                </button>
                            </div>
                        </div>

                        <button @click="clearCurrentStudentFromLocalStorage"
                            class="p-2 bg-red-500 hover:bg-red-600">Clear Data</button>
                    </div>
                </div>

            </div>
        </div>

        <div v-for="reward in currentStudent" :key="reward.id">
            <div>studentName {{ reward?.studentName }}</div>
            <div>phone {{ reward?.phone }}</div>
            <div>email {{ reward?.email }}</div>
            <div>qty: {{ reward?.qty }}</div>
            <div>qty: {{ reward?.courseName }}</div>
        </div>
    </div>
</template>





<script>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { collection, onSnapshot, query, where, Timestamp, getDocs, doc, updateDoc, increment } from "firebase/firestore";
import { projectFirestore } from "@/config/config";

export default {
    setup() {
        const rewards = ref([]);
        const isLoading = ref(false);
        const currentStudent = ref(null);
        const studentIndex = ref(0);
        const courseDocReward = ref([]);
        const todaysRewards = ref([]);
        let unsubscribe = null;

        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));
        const startTimestamp = Timestamp.fromDate(startOfDay);
        const endTimestamp = Timestamp.fromDate(endOfDay);

        const fetchCourse = () => {
            try {
                const queryRef = collection(projectFirestore, "courses");
                unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
                    courseDocReward.value = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                });
            } catch (error) {
                console.error("Error fetching courses: ", error);
            }
        };

        const fetchTodaysRewards = async () => {
            try {
                const rewardTypesQuery = query(collection(projectFirestore, "rewardTypes"));
                const rewardTypesSnapshot = await getDocs(rewardTypesQuery);
                const allRewards = [];

                for (let rewardType of rewardTypesSnapshot.docs) {
                    const rewardsQuery = query(
                        collection(projectFirestore, "rewardTypes", rewardType.id, "rewards"),
                        where("createdAt", ">=", startTimestamp),
                        where("createdAt", "<=", endTimestamp)
                    );
                    const rewardsSnapshot = await getDocs(rewardsQuery);
                    rewardsSnapshot.docs.forEach(doc => {
                        allRewards.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                }

                todaysRewards.value = allRewards;
            } catch (error) {
                console.error("Error fetching today's rewards: ", error);
            }
        };














        const saveCurrentStudentToLocalStorage = () => {
            if (currentStudent.value) {
                const data = {
                    student: currentStudent.value,
                    date: new Date().toISOString().split('T')[0] // Store only YYYY-MM-DD
                };
                localStorage.setItem('currentStudent', JSON.stringify(data));
            }
        };

        const saveStudentIndexToLocalStorage = () => {
            const data = {
                index: studentIndex.value,
                date: new Date().toISOString().split('T')[0] // Store only YYYY-MM-DD
            };
            localStorage.setItem('studentIndex', JSON.stringify(data));
        };

        const loadCurrentStudentFromLocalStorage = () => {
            const storedData = localStorage.getItem('currentStudent');
            if (storedData) {
                const { student, date } = JSON.parse(storedData);
                const today = new Date().toISOString().split('T')[0];

                if (date === today) {
                    currentStudent.value = student;
                } else {
                    clearCurrentStudentFromLocalStorage(); // Clear old data
                }
            }
        };

        const loadStudentIndexFromLocalStorage = () => {
            const storedData = localStorage.getItem('studentIndex');
            if (storedData) {
                const { index, date } = JSON.parse(storedData);
                const today = new Date().toISOString().split('T')[0];

                if (date === today) {
                    studentIndex.value = parseInt(index, 10);
                } else {
                    clearCurrentStudentFromLocalStorage(); // Clear old index
                }
            }
        };

        const clearCurrentStudentFromLocalStorage = () => {
            localStorage.removeItem('currentStudent');
            localStorage.removeItem('studentIndex');
            currentStudent.value = null;
            studentIndex.value = 0;
        };

        // Call these in onMounted
        onMounted(() => {
            fetchCourse();
            fetchTodaysRewards();
            loadCurrentStudentFromLocalStorage();
            loadStudentIndexFromLocalStorage();
        });



        const handleRandomFindRewardToday = async () => {
            isLoading.value = true;
            try {
                if (todaysRewards.value.length === 0) {
                    alert("No rewards available for today.");
                    return;
                }

                if (studentIndex.value >= todaysRewards.value.length) {
                    alert("All rewards for today have been shown.");
                    return;
                }

                const selectedReward = todaysRewards.value[studentIndex.value];

                if (!selectedReward || !selectedReward.id) {
                    console.error("Selected reward is missing 'id' or is undefined.");
                    return;
                }

                currentStudent.value = [{
                    id: selectedReward.id,
                    studentName: selectedReward.studentName,
                    phone: selectedReward.phone,
                    email: selectedReward.email,
                    qty: selectedReward.qty,
                    courseName: selectedReward.courseName,
                }];

                saveCurrentStudentToLocalStorage();

                await decreaseCourseQty(selectedReward.courseName);

                studentIndex.value++; // Increment index
                saveStudentIndexToLocalStorage(); // Save updated index

            } catch (error) {
                console.error("Error fetching rewards: ", error);
            } finally {
                isLoading.value = false;
            }
        };

        const decreaseCourseQty = async (courseName) => {
            if (!courseName) {
                console.warn("Course name is missing. Skipping quantity update.");
                return;
            }

            try {
                const coursesQuery = query(collection(projectFirestore, "courses"), where("courseName", "==", courseName));
                const coursesSnapshot = await getDocs(coursesQuery);

                if (coursesSnapshot.empty) {
                    console.warn(`Course '${courseName}' not found.`);
                    return;
                }

                const courseDoc = coursesSnapshot.docs[0];
                const courseRef = doc(projectFirestore, "courses", courseDoc.id);
                const currentQty = courseDoc.data().qty;

                if (currentQty <= 0) {
                    console.warn(`Course '${courseName}' has no stock left.`);
                    return;
                }

                await updateDoc(courseRef, {
                    qty: increment(-1)
                });

                console.log(`Updated course '${courseName}': qty -1 (New qty: ${currentQty - 1})`);

            } catch (error) {
                console.error("Error updating course quantity:", error);
            }
        };

        onMounted(() => {
            fetchCourse();
            fetchTodaysRewards();
            loadCurrentStudentFromLocalStorage();
            loadStudentIndexFromLocalStorage(); // Load studentIndex from localStorage
        });

        onUnmounted(() => {
            if (unsubscribe) unsubscribe();
        });

        watch(studentIndex, saveStudentIndexToLocalStorage); // Watch studentIndex changes

        return {
            rewards,
            isLoading,
            currentStudent,
            studentIndex,
            courseDocReward,
            todaysRewards,
            handleRandomFindRewardToday,
            clearCurrentStudentFromLocalStorage
        };
    },
};
</script>
