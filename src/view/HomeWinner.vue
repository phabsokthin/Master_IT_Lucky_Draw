<template>
    <div>
        <NavbarView />
    </div>

    <div class="h-screen header finisher-header">

        <div class="emoji-container">
            <span v-for="(emoji, index) in emojis" :key="index" class="emoji" :style="getEmojiStyle()">
                {{ emoji }}
            </span>
        </div>
        <div class="md:w-[90%] lg:w-[90%] xl:w-[60%] h-full p-6 mx-auto md:-mt-28">
            <div class="hidden md:block">
                <!-- <h1 class=" text-[40px] text-center text-orange-400 font-koulen">ឱកាសសំណាង</h1>
    <p class="text-[20px] text-center text-white font-koulen">Lucky Draw</p> -->
                <div class="flex justify-center space-x-4 leading-10 ">
                    <div class="z-40">
                        <img src="@/assets/opotunity.png" class="w-[400px] h-auto object-contain" alt="">
                        <div class="-mt-[18rem] ml-24">
                            <img src="@/assets/luckydrawLogo.png" class="w-[240px] h-auto object-contain" alt="">
                        </div>
                        <div class="-mt-[8.5rem] ml-36">
                            <img src="@/assets/second.png" class="w-[150px] h-auto object-contain" alt="">
                        </div>
                    </div>

                </div>
            </div>


            <div class="w-full ">
                <div class="grid grid-cols-1 gap-3 md:flex">

                    <div class="z-40 w-full mx-auto overflow-hidden bg-white border rounded-lg shadow-xl">
                        <table class="w-full border border-separate rounded-t-lg">
                            <thead>
                                <tr class="bg-white">
                                    <th
                                        class="px-6 py-2 text-xl text-orange-600 border border-red-500 rounded-tl-lg bg-gray-50 font-koulen">
                                        ឱកាសសំណាងឈ្នះ
                                    </th>
                                    <th
                                        class="px-6 py-2 text-xl text-orange-600 border bg-gray-50 border-red-500 font-koulen w-[40%] max-w-[400px] rounded-tr-lg">
                                        ចំនួនសំណាង
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(reward, index) in courseDocReward" :key="reward.id"
                                    :class="index === courseDocReward.length - 1 ? 'rounded-bl-lg rounded-br-lg overflow-hidden' : ''">
                                    <template v-if="reward.qty !== 0">
                                        <td align="start"
                                            class="px-5 py-2 text-lg text-red-500 border border-red-500 font-koulen">
                                            {{ toKhmerNumberIndex(index + 1) }}. {{ reward?.courseName }}
                                        </td>
                                        <td align="center"
                                            class="px-5 py-2 text-xl text-red-500 border border-red-500 font-koulen w-[40%] max-w-[400px]">
                                            {{ toKhmerNumber(reward?.qty) }}<span class="text-[14px]">សំណាង</span>
                                        </td>
                                    </template>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div class="z-40">
                        <div class="h-full bg-white rounded-lg shadow-xl">
                            <div class="">
                                <div class="text-center border-b border-red-500">
                                    <p class="w-full px-6 py-2 text-xl text-center text-orange-600 font-koulen">
                                        ម្ចាស់សំណាងថ្ងៃនេះ
                                    </p>
                                </div>

                                <div class="relative flex flex-col items-center justify-center ">
                                    <div class="w-[300px] p-7">
                                        <img class="" src="@/assets/opened-gift-box-surprise-png.webp"
                                            alt="Lucky Draw" />
                                    </div>

                                    <div class="absolute top-24">
                                        <div v-if="!isLoading">
                                            <img v-if="!currentStudent" class="w-16"
                                                src="@/assets/Animation - 1738921236754.gif" alt="Loaded animation">
                                            <div v-else class="relative">
                                                <div v-for="reward in currentStudent" :key="reward.id">
                                                    <h2 v-motion-pop-visible
                                                        class="mt-0 text-[32px] font-moul_regular  text text-center font-[400]"
                                                        :style="reward.studentName.includes(' ') || reward.studentName.includes('\n') ? 'text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.4);' : ''">
                                                        <span v-html="formatName(reward.studentName)"></span>
                                                    </h2>
                                                </div>

                                                <div class="absolute -top-32 -left-28">

                                                    <Vue3Lottie :animationData="congratedAnimate" :height="300"
                                                        :width="300" />

                                                </div>



                                            </div>
                                        </div>

                                        <!-- Show loading animation if still loading -->
                                        <div v-else class="-mt-3">
                                            <!-- <img class="w-16" src="@/assets/Animation - 1738921532229.gif"
                                                alt="Loading animation"> -->
                                            <Vue3Lottie :animationData="searchPeople" :height="100" :width="200" />

                                        </div>
                                    </div>


                                    <div class="absolute bottom-7">
                                        <button v-if="!isLoading" @click="handleRandomFindRewardToday"
                                            class="shadow-xl bg-reward">
                                            ឈ្នះសំណាងរៀនឥតគិតថ្លៃ
                                        </button>
                                        <button v-else disabled
                                            class="p-2 px-4 text-lg text-orange-600 bg-yellow-300 rounded-full shadow-lg cursor-not-allowed font-koulen">
                                            ឈ្នះសំណាងរៀនឥតគិតថ្លៃ.....
                                        </button>

                                    </div>


                                </div>


                            </div>
                        </div>
                    </div>



                </div>

                <div class="grid gap-1 px-10 mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div v-for="reward in rewardDash" :key="reward" class="relative w-full ">
                        <div
                            class="absolute w-[80%] mx-auto p-1 border border-red-500 -top-4 bg-white left-6 rounded-lg">
                            <div class="text-sm text-center text-red-500 font-koulen">
                                <span :class="{ 'text-md': reward.scores.includes(' ') }">{{ getFirstPart(reward.scores)
                                    }}</span>

                                <span v-if="reward.scores.includes(' ')" class="ml-1 text-xl">{{
                                    getSecondPart(reward.scores)
                                }}</span>
                            </div>
                        </div>

                        <div
                            class="flex flex-col justify-end h-16 align-bottom bg-white border border-red-500 rounded-md ">
                            <!-- <h1 class="text-[30px] text-red-500 text-center font-koulen">{{ reward.qtyLucky }}</h1> -->

                            <div class="text-sm text-center text-red-500 font-koulen">
                                <span :class="{ 'text-[30px]': reward.scores.includes(' ') }">{{
                                    getFirstPart(reward.qtyLucky)
                                }}</span>

                                <span v-if="reward.scores.includes(' ')" class="ml-1 text-lg">{{
                                    getSecondPart(reward.qtyLucky)
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div class="bg"></div>
    </div>


    <div class="relative">
        <div class="fixed bottom-4 right-20">
            <button @click="handleClearLocalStorage"
                class="p-3 font-bold text-red-500 bg-white rounded-full shadow-lg hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-trash-2">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
            </button>
            <div class="absolute right-0 cursor-pointer -top-2">

            </div>
        </div>

    </div>

    <div class="fixed bottom-4 right-8">
        <button @click="handleCalandarComponent('CalandarComponent')"
            class="p-3 font-bold text-green-500 bg-white rounded-full shadow-xl hover:bg-gray-100">
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


    <div v-if="isOpenCongrate" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-600 opacity-75 cursor-pointer " @click="handleCloseCongrate"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div v-motion-pop-visible
                class="inline-block px-4 pt-5 rounded-md pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white shadow-xl sm:my-8 sm:align-middle sm:p-6 w-full md:w-[40%] lg:w-[25%]">
                <div>


                    <div class="relative w-full">
                        <!-- <div class="">
                            <Vue3Lottie :animationData="congrate" :height="400" :width="500" />
                        </div> -->
                        <div class="bg-white ">
                            <!-- Show all winners in the modal -->
                            <div v-if="currentStudent">
                                <div v-if="currentStudent.length === 0">
                                    <p>No students found for today.</p>
                                </div>
                                <div v-else>
                                    <div class="flex justify-center">
                                        <!-- <img class="object-contain w-[100px] "
                                            src="@/assets/Animation - 1738583895418.gif" alt=""> -->


                                    <Vue3Lottie :animationData="congratuatedBox" :speed="1" :height="200" :width="400" />

                                    </div>


                                    <!-- Loop through all students -->
                                    <div v-for="(student, index) in currentStudent" :key="index">
                                        <div class="mb-4 space-y-2 text-center ">
                                            <p class="text-2xl font-koulen">សូមអបអរសាទរ🥳 <span
                                                    class="text-orange-600">{{
                                                        student.studentName }}</span> 🥳
                                            </p>
                                            <p class="space-x-1 text-xl font-koulen">
                                                <strong>លេខទូរស័ព្ទអ្នកឈ្នះ:</strong>
                                                <span class="text-xl text-red-500">{{ student.phone }} </span>
                                            </p>
                                            <p class="space-x-1 text-xl font-koulen"><strong>ឈ្នះរង្វាន់🏅:</strong>
                                                <span class="text-xl text-red-500">{{ student.courseName }} </span>
                                            </p>
                                        </div>


                                        

                                    </div>
                                </div>
                                <div v-if="!isLoading" class="absolute -top-36 ">
                                    <!-- <img src="@/assets/lottifile/animate_open_box.json" alt="Congratulations GIF"> -->

                                    <!-- <Vue3Lottie :animationData="congradFire" :speed="1" :height="400" :width="400" /> -->

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
import { ref, onMounted, onUnmounted, watch } from "vue";
import { collection, onSnapshot, query, where, Timestamp, getDocs, doc, updateDoc, increment } from "firebase/firestore";
import { projectFirestore } from "@/config/config";
import getCollection from "@/firebase/getCollection";
import { handleMessageError, handleMessageInfo } from "@/message";
import congratedAnimate from '@/assets/lottifile/congrate2.json';
import searchPeople from '@/assets/lottifile/search_people.json';
import CalandarComponent from "@/components/admin/CalandarComponent.vue";
import congrate from '@/assets/lottifile/congrate.json'
import congradFire from '@/assets/lottifile/Animation - 1739105915769.json'
import congratuatedBox from '@/assets/lottifile/Animation - 1739106738094.json'

export default {
    components: {
        CalandarComponent
    },
    setup() {
        const currentComponent = ref("");
        const isOpenCongrate = ref(false)
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

        const { document: rewardDash } = getCollection("rewardDashboard")

        const emojis = ref(["🥳", "💖", "🥇", "🎁", "🎉", "✨", "😍", "🎓"]); // Customize emojis


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

        const handleClearLocalStorage = () => {
            if (window.confirm("តើអ្នកចង់ជម្រះទាំងអស់មែនទេ?")) {
                localStorage.removeItem('currentStudent');
                localStorage.removeItem('studentIndex');
                currentStudent.value = null;
                studentIndex.value = 0;
            }
        }

        // Call these in onMounted
        onMounted(() => {
            fetchCourse();
            fetchTodaysRewards();
            loadCurrentStudentFromLocalStorage();
            loadStudentIndexFromLocalStorage();
        });




        const handleRandomFindRewardToday = async () => {
            isLoading.value = true;

            setTimeout(async () => {
                try {
                    if (todaysRewards.value.length === 0) {
                        handleMessageError("សុំទោសមិនមានសិស្សឈ្នះរង្វាន់ថ្ងៃនេះទេ.");
                        isLoading.value = false;
                        return;
                    }

                    console.log("Today's rewards:", todaysRewards.value); // Debugging

                    let foundValidStudent = false;

                    while (studentIndex.value < todaysRewards.value.length) {
                        const selectedReward = todaysRewards.value[studentIndex.value];

                        console.log("Checking student:", selectedReward);

                        if (!selectedReward || !selectedReward.id || selectedReward.qty <= 0) {
                            console.warn("Skipping student due to invalid data or out-of-stock:", selectedReward);
                            studentIndex.value++;
                            continue;
                        }

                        const success = await decreaseCourseQty(selectedReward.courseName);

                        if (success) {
                            currentStudent.value = [{ ...selectedReward }];
                            saveCurrentStudentToLocalStorage();
                            studentIndex.value++;
                            saveStudentIndexToLocalStorage();
                            foundValidStudent = true;

                            isOpenCongrate.value = true;
                            break;
                        } else {
                            studentIndex.value++;
                        }
                    }

                    if (!foundValidStudent) {
                        handleMessageInfo("មិនមានសិស្សឈ្នះរង្វាន់ទៀតទេ!");
                    }
                } catch (error) {
                    console.error("Error fetching rewards: ", error);
                } finally {
                    isLoading.value = false;
                }
            }, 5000); // 5-second delay
        };




        const decreaseCourseQty = async (courseName) => {
            if (!courseName) {
                console.warn("Course name is missing. Skipping quantity update.");
                return false;
            }

            try {
                const coursesQuery = query(collection(projectFirestore, "courses"), where("courseName", "==", courseName));
                const coursesSnapshot = await getDocs(coursesQuery);

                if (coursesSnapshot.empty) {
                    console.warn(`Course '${courseName}' not found.`);
                    return false;
                }

                const courseDoc = coursesSnapshot.docs[0];
                const courseRef = doc(projectFirestore, "courses", courseDoc.id);
                const currentQty = courseDoc.data().qty;

                if (currentQty <= 0) {
                    console.log(`Course '${courseName}' has no stock left.`);
                    return false;
                }

                await updateDoc(courseRef, { qty: increment(-1) });
                console.log(`Updated course '${courseName}': qty -1 (New qty: ${currentQty - 1})`);

                return true; // Stock successfully updated

            } catch (error) {
                console.error("Error updating course quantity:", error);
                return false;
            }
        };




        onMounted(() => {
            fetchCourse();
            fetchTodaysRewards();
            loadCurrentStudentFromLocalStorage();
            loadStudentIndexFromLocalStorage();
            displayBackground();
        });

        onUnmounted(() => {
            if (unsubscribe) unsubscribe();
        });

        watch(studentIndex, saveStudentIndexToLocalStorage); // Watch studentIndex changes




        const getEmojiStyle = () => {
            return {
                left: `${Math.random() * 100}vw`,
                animationDuration: `${Math.random() * 7 + 5}s`
            };
        };

        const displayBackground = () => {
            const script = document.createElement("script");
            script.src = "/js/finisher-header.es5.min.js"; // Ensure the file is in public/js
            script.onload = () => {
                if (window.FinisherHeader) {
                    const container = document.createElement("div");
                    container.id = "finisher-header-container"; // Give it an ID for styling

                    // Append the container to the body or specific element where you want the background
                    document.body.appendChild(container);

                    new window.FinisherHeader({
                        count: 90,
                        size: { min: 1, max: 20, pulse: 0 },
                        speed: { x: { min: 0, max: 0.4 }, y: { min: 0, max: 0.1 } },
                        colors: {
                            background: "#f40c0c", // Background color
                            particles: ["#ffffff", "#87ddfe", "#acaaff", "#1bffc2", "#f88aff"]
                        },
                        blending: "screen",
                        opacity: { center: 0, edge: 0.4 },
                        skew: 0,
                        shapes: ["c", "s", "t"],
                        container: container // Add the container for the FinisherHeader to render in
                    });
                }
            };
            document.body.appendChild(script);
        };


        //khmer number

        const toKhmerNumber = (num) => {
            const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
            // Ensure the number has at least two digits by padding with a zero if needed.
            return num.toString().padStart(2, '0')  // Pad to two digits if needed
                .split("")  // Split the number into individual digits.
                .map(digit => khmerDigits[digit])  // Map the digits to Khmer numerals.
                .join("");  // Join the array back into a string.
        };

        const toKhmerNumberIndex = (num) => {
            const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
            return num.toString().split("").map(digit => khmerDigits[digit]).join("");
        };


        //for br space student

        const formatName = (name) => {
            // Check if the name contains a space and replace it with a <br> tag
            return name.replace(' ', '<br>'); // Replace first space with <br> tag
        }

        //space


        const getFirstPart = (text) => {
            return text.split(' ')[0]; // Get the first part before the space
        }
        const getSecondPart = (text) => {
            return text.split(' ')[1] || ''; // Get the second part after the space
        }

        const handleCalandarComponent = (component) => {
            currentComponent.value = component
        }


        const handleCloseCongrate = () => {
            isOpenCongrate.value = false
        }


        return {
            rewards,
            isLoading,
            currentStudent,
            studentIndex,
            courseDocReward,
            todaysRewards,
            handleRandomFindRewardToday,
            clearCurrentStudentFromLocalStorage,

            emojis,
            getEmojiStyle,
            toKhmerNumber,
            toKhmerNumberIndex,
            formatName,
            rewardDash,
            getFirstPart,
            getSecondPart,
            congratedAnimate,
            searchPeople,
            handleCalandarComponent,
            currentComponent,
            congrate,
            congradFire,
            congratuatedBox,
            isOpenCongrate,
            handleCloseCongrate,
            handleClearLocalStorage
        };
    },
};
</script>




<style scoped>
/* Full-screen Finisher Header */


.text {
    -webkit-text-stroke-width: 0.8px;
    -webkit-text-stroke-color: white;
    -webkit-text-fill-color: red;
}


body {
    overflow-x: hidden;
    /* Prevent horizontal scrolling */
    height: 100vh;
    /* Ensure the height is full */
}

#finisher-header-container {
    position: fixed;
    /* Ensures it covers the entire screen */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    /* Full width */
    height: 100vh;
    /* Full height */
    z-index: -1;
    /* Ensure it stays behind other content */
}

.bg {
    position: fixed;
    /* Ensures it covers the entire viewport */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    /* Ensures the full height of the viewport */
    background: #fff;
    /* Background color */
    opacity: 0.1;
    filter: contrast(7);
    /* Apply contrast filter */
    --mask: linear-gradient(red, rgba(0, 0, 0, 0.45));
    /* Mask gradient */

}

.bg::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: radial-gradient(#676767, transparent) 0 0/1em 1em space;
    /* Radial gradient */
    -webkit-mask: var(--mask);
    /* Webkit mask for better cross-browser support */
    mask: var(--mask);
    /* Apply mask */
    content: "";

}




/* Floating Emoji Overlay */
.emoji-container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
}

/* Emoji animation */
.emoji {
    position: absolute;
    font-size: 2rem;
    opacity: 0.8;
    animation: floatUp ease-in infinite;
}

@keyframes floatUp {
    from {
        transform: translateY(100vh);
        opacity: 0;
    }

    to {
        transform: translateY(-10vh);
        opacity: 1;
    }
}

/* Content should be above the background */
.content {
    position: relative;
    z-index: 10;
    color: white;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    padding: 20px;
}
</style>
