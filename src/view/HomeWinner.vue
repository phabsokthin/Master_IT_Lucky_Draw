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
                                        class="px-6 py-2 text-xl text-orange-600 border border-red-500 rounded-tl-lg font-koulen">
                                        ឱកាសសំណាងឈ្នះ
                                    </th>
                                    <th
                                        class="px-6 py-2 text-xl text-orange-600 border border-red-500 font-koulen w-[40%] max-w-[400px] rounded-tr-lg">
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
                                    <div class="w-[300px] ">
                                        <img class="object-contain w-full"
                                            src="@/assets/3d-rendering-of-opened-surprise-gift-box-png.webp"
                                            alt="Lucky Draw" />
                                    </div>

                                    <div class="absolute top-24">
                                        <div v-if="!isLoading">
                                            <img v-if="!currentStudent" class="w-16"
                                                src="@/assets/Animation - 1738921236754.gif" alt="Loaded animation">
                                            <div v-else>
                                                <div v-for="reward in currentStudent" :key="reward.id">
                                                    <h2 class="mt-0 text-[28px] font-moul_regular text text-center font-[400]"
                                                        :style="reward.studentName.includes(' ') || reward.studentName.includes('\n') ? 'text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.4);' : ''">
                                                        <span v-html="formatName(reward.studentName)"></span>
                                                    </h2>
                                                </div>

                                            </div>
                                        </div>

                                        <!-- Show loading animation if still loading -->
                                        <div v-else>
                                            <img class="w-16" src="@/assets/Animation - 1738921532229.gif"
                                                alt="Loading animation">
                                        </div>
                                    </div>


                                    <div class="absolute bottom-20">
                                        <!-- <button v-if="!isLoading" @click="handleRandomFindRewardToday"
                                            class="shadow-2xl bg-reward">
                                            ឈ្នះសំណាងរៀនឥតគិតថ្លៃ
                                        </button>
                                        <button v-else disabled class="shadow-2xl bg-reward">
                                        </button> -->

                                        <button v-if="!isLoading" @click="handleRandomFindRewardToday" class="p-2 px-4 text-orange-600 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-full 
               shadow-[0_4px_6px_rgba(0,0,0,0.3),_0_1px_3px_rgba(0,0,0,0.1)] 
               font-koulen text-md transition-all 
               hover:shadow-[0_6px_12px_rgba(0,0,0,0.4),_0_2px_4px_rgba(0,0,0,0.1)] 
               hover:bg-yellow-400 active:translate-y-1">
                                            ឈ្នះសំណាងរៀនឥតគិតថ្លៃ
                                        </button>

                                        <button v-else disabled class=" cursor-not-allowed p-2 px-4 text-orange-600 bg-gradient-to-b from-yellow-300 to-yellow-300 rounded-full 
               shadow-[0_4px_6px_rgba(0,0,0,0.3),_0_1px_3px_rgba(0,0,0,0.1)] 
               font-koulen text-md transition-all">
                                            ឈ្នះសំណាងរៀនឥតគិតថ្លៃ....

                                        </button>

                                        <!-- <button @click="clearCurrentStudentFromLocalStorage"
                                            class="p-2 bg-orange-500 hover:bg-orange-600">Clear
                                            Data</button> -->




                                    </div>


                                </div>


                            </div>
                        </div>
                    </div>



                </div>

                <div class="grid gap-1 px-10 mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div class="relative w-full">
                        <div
                            class="absolute  w-[80%] mx-auto p-1  border border-red-500 -top-4 bg-white left-6 rounded-lg">
                            <div class="text-sm text-center text-red-500 font-koulen ">បញ្ចុះ <span
                                    class="text-[20px]">៧០%</span></div>
                        </div>
                        <div
                            class="flex flex-col justify-end h-16 align-bottom bg-white border border-red-500 rounded-l-lg">
                            <h1 class="text-[30px] text-red-500 text-center font-koulen">០៥ <span
                                    class="text-[20px]">សំណាង</span></h1>
                        </div>

                    </div>
                    <div class="relative w-full">
                        <div
                            class="absolute  w-[80%] mx-auto p-1  border border-red-500 -top-4 bg-white left-6 rounded-lg">
                            <div class="text-sm text-center text-red-500 font-koulen ">១០ <span
                                    class="text-[20px]">ពិន្ទុ</span></div>
                        </div>
                        <div class="flex flex-col justify-end h-16 align-bottom bg-white border border-red-500 ">
                            <h1 class="text-[30px] text-red-500 text-center font-koulen">២០ <span
                                    class="text-[20px]">សំណាង</span></h1>
                        </div>

                    </div>
                    <div class="relative w-full">
                        <div
                            class="absolute  w-[80%] mx-auto p-1  border border-red-500 -top-4 bg-white left-6 rounded-lg">
                            <div class="text-sm text-center text-red-500 font-koulen ">០៥ <span
                                    class="text-[20px]">ពិន្ទុ</span></div>
                        </div>
                        <div class="flex flex-col justify-end h-16 align-bottom bg-white border border-red-500 ">
                            <h1 class="text-[30px] text-red-500 text-center font-koulen">៣០ <span
                                    class="text-[20px]">សំណាង</span></h1>
                        </div>

                    </div>
                    <div class="relative w-full">
                        <div
                            class="absolute  w-[80%] mx-auto p-1  border border-red-500 -top-4 bg-white left-6 rounded-lg">
                            <div class="text-sm text-center text-red-500 font-koulen ">០២ <span
                                    class="text-[20px]">ពិន្ទុ</span></div>
                        </div>
                        <div
                            class="flex flex-col justify-end h-16 align-bottom bg-white border border-red-500 rounded-r-lg">
                            <h1 class="text-[30px] text-red-500 text-center font-koulen">២០០ <span
                                    class="text-[20px]">សំណាង</span></h1>
                        </div>

                    </div>

                </div>
            </div>

        </div>

        <!-- <div v-for="reward in currentStudent" :key="reward.id">

<div>studentName {{ reward?.studentName }}</div>
<div>phone {{ reward?.phone }}</div>
<div>email {{ reward?.email }}</div>
<div>qty: {{ reward?.qty }}</div>
<div>qty: {{ reward?.courseName }}</div>

</div> -->
        <div class="bg"></div>
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
                        alert("No rewards available for today.");
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
                            break;
                        } else {
                            studentIndex.value++;
                        }
                    }

                    if (!foundValidStudent) {
                        alert("No valid students with available rewards.");
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
            formatName
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
