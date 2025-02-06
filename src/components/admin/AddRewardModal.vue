<template>

    <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-top sm:h-screen"></span>
            <div
                class="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white shadow-xl sm:my-8 sm:align-middle sm:p-6 w-[45%]">


                <form @submit.prevent="handleSubmit" class="">
                    <div class="my-4">
                        <div class="text-lg font-medium leading-6 text-gray-900 font-koulen"> + បង្កើតរង្វាន់ថ្មី
                        </div>
                    </div>

                    <div class="w-full">

                        <!-- <div class="space-y-1">
                            <label for="" class="font-koulen">លេខរង្វាន់: *</label>
                            <input required v-model="rewardNo" min="0" type="number"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md font-koulen placeholder:text-sm"
                                placeholder="លេខរង្វាន់">
                        </div> -->

                        <div class="mt-2 space-y-1">
                            <label for="" class="font-koulen">ប្រភេទរង្វាន់: *</label>
                            <select required v-model="rewardType"
                                class="w-full px-3 py-2 capitalize border border-gray-300 rounded-md font-koulen placeholder:text-sm">
                                <option selected disabled value="">--ជ្រើសរើស--</option>
                                <option v-for="types in rewardTypesDoc" :key="types.id" :value="types.id">
                                    {{ types.rewardType }}
                                </option>
                            </select>
                        </div>

                        <div class="mt-2 space-y-1">
                            <label for="" class="font-koulen">រង្វាន់សំណាង:*</label>
                            <select v-model="courseName"
                                class="w-full px-3 py-2 capitalize border border-gray-300 rounded-md font-koulen placeholder:text-sm">
                                <option value="">--ជ្រើសរើស--</option>
                                <option v-for="course in courseDoc" :key="course.id" :value="course.courseName">
                                    {{ course.courseName }}
                                </option>
                            </select>
                        </div>



                        <div class="mt-2 space-y-1">
                            <label for="" class="font-koulen">ឈ្មោះសិស្ស:*</label>
                            <select v-model="studentName"
                                class="w-full px-3 py-2 capitalize border border-gray-300 rounded-md font-koulen placeholder:text-sm">
                                <option value="">--ជ្រើសរើស--</option>
                                <option v-for="student in studentDoc" :key="student.studentName"
                                    :value="student.studentName">
                                    {{ student.studentName }}
                                </option>
                            </select>
                        </div>

                        <div class="mt-2 space-y-1">
                            <label for="" class="font-koulen">លេខទូរស័ព្ទ:</label>
                            <input required v-model="phone" min="0" type="number"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md font-koulen placeholder:text-sm"
                                placeholder="លេខទូរស័ព្ទ" disabled>
                        </div>

                        <div class="mt-2 space-y-1">
                            <label for="" class="font-koulen">អុីម៉ែល:</label>
                            <input required v-model="email" min="0" type="number"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md font-koulen placeholder:text-sm"
                                placeholder="អុីម៉ែល" disabled>
                        </div>


                        <div class="mt-2 space-y-1">
                            <label for="" class="font-koulen">ពិពណ៌នា</label>
                            <textarea v-model="description" rows="5" type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md font-koulen placeholder:text-sm"
                                placeholder="ពិពណ៌នា"></textarea>
                        </div>
                    </div>

                    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <span v-if="!btnEdit" class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button v-if="!isLoading" type="submit"
                                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md shadow-sm font-koulen hover:bg-green-500 focus:outline-none focus:shadow-outline-green sm:text-sm sm:leading-5">
                                រក្សាទុក
                            </button>
                            <button v-else
                                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md shadow-sm font-koulen hover:bg-green-500 focus:outline-none focus:shadow-outline-green sm:text-sm sm:leading-5">
                                កំពុងរក្សាទុក...
                            </button>
                        </span>

                        <span v-else class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button v-if="!isLoading" type="submit"
                                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md shadow-sm font-koulen hover:bg-green-500 focus:outline-none focus:shadow-outline-green sm:text-sm sm:leading-5">
                                កែប្រែ
                            </button>
                            <button v-else
                                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md shadow-sm font-koulen hover:bg-green-500 focus:outline-none focus:shadow-outline-green sm:text-sm sm:leading-5">
                                កំពុងកែប្រែ...
                            </button>
                        </span>

                        <span class="flex w-full mt-3 space-x-2 rounded-md shadow-sm sm:mt-0 sm:w-auto">
                            <button type="button" @click="handleClose"
                                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm font-koulen hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5">
                                បោះបង់
                            </button>

                        </span>
                    </div>
                </form>

            </div>

            <div>{{ phone }}</div>


            <p></p>
        </div>


        <!-- component -->





    </div>
  
</template>


<script>
import { ref } from 'vue';

import getCollection from '@/firebase/getCollection';
import { handleMessageSuccess, handleMessageError } from '@/message';
import { projectFirestore, timestamp } from '@/config/config';
import useDoument from '@/firebase/useDocument';
import { onMounted } from 'vue';

import { collection, query, where, getDocs } from 'firebase/firestore';
// import { watch } from 'vue';
import getCollectionQueryTearm from '@/firebase/getCollectionQueryTerm'
import { watch } from 'vue';

export default {
    props: ['rewardTypeId', 'itemData',],
    setup(props, { emit }) {
        const rewardNo = ref(0);
        const description = ref("");
        const rewardType = ref("");

        const rewardValue = ref("");
        const qty = ref(1);
        const courseName = ref("")
        const isLoading = ref(false);

        const studentName = ref("")
        const studentItem = ref({})

        const { document: rewardTypesDoc } = getCollection("rewardTypes");
        const { document: studentDoc } = getCollection("students");
        const { document: courseDoc } = getCollection("courses");
        const btnEdit = ref(false);
        const phone = ref("")
        const email = ref("")
        // const { documents } =  getCollectionQueryTearm("students", where("studentName", "==", studentName.value));

        watch(studentName, async () => {
            if (studentName.value) {
                try {
                    // Perform the query when studentName is set
                    const { documents } = await getCollectionQueryTearm("students", where("studentName", "==", studentName.value));

                    // Watch the documents to get the student data and update the phone number
                    watch(documents, () => {
                        const studentData = documents.value && documents.value[0]; // assuming documents is an array
                        if (studentData) {
                            studentItem.value = studentData;
                            phone.value = studentData.phone || ''; 
                            email.value = studentData.email || '';
                            console.log('Student items:', studentItem.value);
                        }
                    });
                } catch (error) {
                    console.error('Error fetching student details:', error);
                }
            }
        });



        onMounted(() => {
            if (props.itemData) {
                
                studentName.value = props.itemData.studentName;
                phone.value = props.itemData.phone;
                email.value = props.itemData.email;
                description.value = props.itemData.rewardDescription;
                rewardType.value = props.itemData.rewardType;
             
                courseName.value = props.itemData.courseName
                btnEdit.value = true;
            }

        })



        const handleSubmit = async () => {
            isLoading.value = true;
            try {
                const { addDocs } = useDoument("rewardTypes", rewardType.value, "rewards");

                const data = {
                    studentName: studentName.value,
                    phone: phone.value,
                    email: email.value,
                    qty: qty.value,
                    rewardType: rewardType.value,
                    courseName: courseName.value,
                    rewardDescription: description.value,
                    
                
                    createdAt: timestamp()
                };

                if (!props.itemData) {
                    const rewardsRef = collection(projectFirestore, `rewardTypes/${rewardType.value}/rewards`);
                    const q = query(rewardsRef, where("rewardNo", "==", rewardNo.value));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        handleMessageError(`លេខសម្គាល់រង្វាន់ ${rewardNo.value} មានរួចហើយ!`);
                        isLoading.value = false;
                        return;
                    }
                    else {
                        await addDocs(data);
                        handleMessageSuccess("បានបង្កើតប្រភេទរង្វាន់ដោយជោគជ័យ!");
                    }


                } else {
                    // Update existing document
                    const { updateDocs } = useDoument("rewardTypes", props.rewardTypeId, "rewards");
                    await updateDocs(props.itemData.id, data);
                    handleMessageSuccess("បានកែប្រែរង្វាន់ដោយជោគជ័យ!");
                }

                handleClose();
                // handleReset();
            } catch (err) {
                console.error("Error submitting data:", err);
            } finally {
                isLoading.value = false;
            }
        };





        const handleClose = () => {
            emit('close');
        };

        const handleReset = () => {
            rewardNo.value = 0;
            rewardType.value = "--ជ្រើសរើស--";
            description.value = "";
            rewardValue.value = "";
            courseName.value = "--ជ្រើសរើស--"
            qty.value = 0;
        };


        return {
            handleClose,
            rewardNo,
            description,
            rewardValue,
            rewardType,
            courseName,
            isLoading,
            rewardTypesDoc,
            btnEdit,
            handleReset,
            qty,
            handleSubmit,
            courseDoc,
            studentDoc,
            phone,
            studentName,
            studentItem,
            email


        };
    }
};
</script>