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
                        <div class="h-[350px] bg-white rounded-lg shadow-xl">
                            <div class="">
                                <div class="text-center border-b border-red-500">
                                    <p class="w-full px-6 py-2 text-xl text-center text-orange-600 font-koulen">
                                        ម្ចាស់សំណាងថ្ងៃនេះ
                                    </p>
                                </div>

                                <div class="relative flex flex-col items-center justify-center ">
                                    <div class="w-[300px]  p-7">
                                        <img class="" src="@/assets/opened-gift-box-surprise-png.webp"
                                            alt="Lucky Draw" />
                                    </div>

                                    <div class="absolute top-24">
                                        <div v-if="!isLoading">
                                            <img v-if="!currentStudent" class="w-16"
                                                src="@/assets/Animation - 1738921236754.gif" alt="Loaded animation">
                                            <div v-else class="relative">
                                                <div v-for="reward in currentStudent" :key="reward.id">
                                                    <div v-if="reward.scores">
                                                        <img class="w-16" src="@/assets/Animation - 1738921236754.gif"
                                                            alt="Loaded animation">

                                                    </div>
                                                    <div v-else-if="reward.courseName">
                                                        <h2 v-motion-pop-visible
                                                            class="mt-0 text-[32px] font-moul_regular  text text-center font-[400]"
                                                            :style="reward.studentName.includes(' ') || reward.studentName.includes('\n') ? 'text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.4);' : ''">
                                                            <span v-html="formatName(reward.studentName)"></span>
                                                        </h2>

                                                        <div
                                                            class="p-2.5 z-40 text-white bg-orange-500 font-koulen shadow-lg rounded-md">
                                                            ឈ្នះរង្វាន់🏅 {{ reward.courseName }}
                                                        </div>
                                                        <div class="absolute -top-36 -left-14">

                                                            <Vue3Lottie :animationData="congratedAnimate" :height="300"
                                                                :width="300" />

                                                        </div>
                                                    </div>

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
                                <span :class="{ 'text-xl': reward.scores.includes(' ') }">{{ getFirstPart(reward.scores)
                                    }}</span>

                                <span v-if="reward.scores.includes(' ')" class="ml-1 text-md">{{
                                    getSecondPart(reward.scores)
                                }}</span>
                            </div>
                        </div>

                        <div
                            class="flex flex-col justify-end h-16 align-bottom bg-white border border-red-500 rounded-md ">
                            <!-- <h1 class="text-[30px] text-red-500 text-center font-koulen">{{ reward.qtyLucky }}</h1> -->

                            <div class="text-sm text-center text-red-500 font-koulen">
                                <!-- <span :class="{ 'text-[30px]': reward.scores.includes(' ') }">{{
                                    getFirstPart(reward.qtyLucky)
                                    }}សំណាង</span> -->
<!--                                 
                                <div v-if="reward.qty === 0">
                                    <span class="text-[20px]">អស់ហើយ</span>
                                </div> -->

                                <span class="text-[30px]">
                                    {{
                                    toKhmerNumber(reward?.qty)
                                }}

                                    <span class="text-[20px]">សំណាង</span></span>

                                <!-- <span v-if="reward.scores?.includes('')" class="ml-1 text-lg">{{
                                    getSecondPart(reward.qty)
                                    }}</span> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div class="bg"></div>
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


    <div v-for="reward in currentStudent" :key="reward.id">
        <div v-if="!reward.scores">
            <div v-if="isOpenCongrate && currentStudent && currentStudent.length > 0"
                class="fixed inset-0 z-50 overflow-y-auto">
                <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <div class="fixed inset-0 transition-opacity">
                        <div class="absolute inset-0 bg-gray-600 opacity-75 cursor-pointer"
                            @click="handleCloseCongrate">
                        </div>
                    </div>
                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                    <div v-motion-pop-visible-once
                        class="inline-block px-4 pt-5 rounded-md pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white shadow-xl sm:my-8 sm:align-middle sm:p-6 w-full sm:w-[90%] md:w-[40%] lg:w-[25%]">
                        <div class="relative w-full bg-white">
                            <div v-if="currentStudent && currentStudent.length > 0">
                                <div class="flex justify-center">
                                    <Vue3Lottie :animationData="congratuatedBox" :speed="1" :height="200"
                                        :width="400" />
                                </div>
                                <div v-for="(student, index) in currentStudent" :key="index">
                                    <div class="mb-4 space-y-2 text-center">
                                        <p class="text-2xl font-koulen">
                                            សូមអបអរសាទរ🥳 <span class="text-orange-600">{{ student.studentName }}</span>
                                            🥳
                                        </p>
                                        <p class="space-x-1 text-xl font-koulen">
                                            <strong>លេខទូរស័ព្ទអ្នកឈ្នះ:</strong>
                                            <span class="text-xl text-red-500">{{ student.phone }}</span>
                                        </p>
                                        <p class="space-x-1 text-xl font-koulen">
                                            <strong>ឈ្នះរង្វាន់🏅:</strong>
                                            <span class="text-xl text-red-500">{{ student.courseName }}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <p>No students found for today.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <component :is="currentComponent" @close="currentComponent = ''" />

</template>





<script>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { collection, onSnapshot, query, where, Timestamp, orderBy } from "firebase/firestore";
import { projectFirestore } from "@/config/config";
import getCollection from "@/firebase/getCollection";
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
        const lastDisplayedStudentId = ref(null);

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


        const fetchTodaysRewards = () => {
            try {
                const rewardTypesQuery = query(collection(projectFirestore, "rewardTypes"));

                // Set up a listener for reward types using onSnapshot
                onSnapshot(rewardTypesQuery, (rewardTypesSnapshot) => {
                    const allRewards = [];

                    rewardTypesSnapshot.docs.forEach(async (rewardType) => {
                        const rewardsQuery = query(
                            collection(projectFirestore, "rewardTypes", rewardType.id, "rewards"),
                            where("createdAt", ">=", startTimestamp),
                            where("createdAt", "<=", endTimestamp),
                            orderBy("createdAt", "desc") // Make sure the rewards are ordered
                        );

                        // Use onSnapshot for real-time updates for rewards
                        onSnapshot(rewardsQuery, (rewardsSnapshot) => {
                            rewardsSnapshot.docs.forEach(doc => {
                                allRewards.push({
                                    id: doc.id,
                                    ...doc.data()
                                });
                            });

                            // Update the `todaysRewards` when the data is updated
                            todaysRewards.value = allRewards;
                        });
                    });
                });
            } catch (error) {
                console.error("Error fetching today's rewards: ", error);
            }
        };


        watch(currentStudent, (newStudent) => {
            if (newStudent && newStudent.length > 0) {
                const studentId = newStudent[0].id;

                // Only open the modal if the student is new
                if (studentId !== lastDisplayedStudentId.value) {
                    isOpenCongrate.value = true;
                    lastDisplayedStudentId.value = studentId; // Update the last displayed student ID
                }
            }
        });


        // Call these in onMounted

        const loadStudentWindReward = () => {
            isLoading.value = true;

            // Fetch courses first
            fetchCourse();

            // Set up a real-time listener for today's rewards
            const rewardTypesQuery = query(collection(projectFirestore, "rewardTypes"));

            // Use onSnapshot for real-time updates on reward types
            onSnapshot(rewardTypesQuery, (rewardTypesSnapshot) => {
                // Loop through all reward types
                rewardTypesSnapshot.docs.forEach((rewardType) => {
                    const rewardsQuery = query(
                        collection(projectFirestore, "rewardTypes", rewardType.id, "rewards"),
                        where("createdAt", ">=", startTimestamp),
                        where("createdAt", "<=", endTimestamp),
                        orderBy("createdAt", "desc")
                    );

                    // Real-time listener for rewards collection under each reward type
                    onSnapshot(rewardsQuery, (rewardsSnapshot) => {
                        // Map rewards to an array
                        const newRewards = rewardsSnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }));

                        // If rewards are found, update currentStudent with the first valid one
                        if (newRewards.length > 0) {
                            // Filter rewards to get valid ones (those with qty > 0)
                            const validRewards = newRewards.filter(reward => reward.qty > 0);

                            // If there are valid rewards, update currentStudent with the latest valid one
                            if (validRewards.length > 0) {
                                // Update currentStudent with the first valid reward from the filtered list
                                currentStudent.value = [{ ...validRewards[0] }];
                            }
                        }

                        // Hide loading once done processing
                        isLoading.value = false;
                    });
                });


            });
        };


        // Watch for changes in currentStudent and update modal state
        watch(() => currentStudent.value, (newValue) => {
            // If there is new student data, close and reopen the modal
            if (newValue && newValue.length > 0) {
                // Close modal first
                isOpenCongrate.value = false;

                // After a small delay, reopen the modal to trigger reactivity
                setTimeout(() => {
                    isOpenCongrate.value = true;
                }, 100); // 100ms delay (adjust as necessary)
            }
        });




        onMounted(() => {
            loadStudentWindReward();
            fetchCourse();
            fetchTodaysRewards();
            displayBackground();
        });

        onUnmounted(() => {
            if (unsubscribe) {
                unsubscribe();
            }
        });

        watch(studentIndex); // Watch studentIndex changes




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
            // handleRandomFindRewardToday,

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

        };
    },
};
</script>




<style scoped>
/* Full-screen Finisher Header */

/* Animation for modal "jump in" effect */
@keyframes jump-in {
    0% {
        transform: translateY(100px);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.5s ease-in-out;
}

.modal-fade-enter {
    opacity: 0;
}

.modal-fade-leave-to {
    opacity: 0;
}

/* Apply jump-in effect when modal opens */
.modal-slide-enter-active {
    animation: jump-in 0.5s ease-out forwards;
}


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
