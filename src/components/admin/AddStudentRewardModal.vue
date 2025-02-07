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
                        <div class="text-lg font-medium leading-6 text-gray-900 font-koulen"> + បង្កើតរង្វាន់សិស្ស
                        </div>
                    </div>
                    <div class="w-full">

                        <div class="space-y-1">
                            <label for="" class="font-koulen">ឈ្មោះសិស្ស: *</label>
                            <input required v-model="studentName" type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md font-koulen placeholder:text-sm"
                                placeholder="ឈ្មោះសិស្ស">
                        </div>




                        <div class="mt-2 space-y-1">
                            <label for="" class="font-koulen">លេខទូរស័ព្ទ: *</label>
                            <input required v-model="phone" type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md font-koulen placeholder:text-sm"
                                placeholder="លេខទូរស័ព្ទ">
                        </div>

                        <div class="mt-2 space-y-1">
                            <label for="" class="font-koulen">អុីម៉ែល</label>
                            <input v-model="email" type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md font-koulen placeholder:text-sm"
                                placeholder="អុីម៉ែល">
                        </div>



                        <div class="mt-2 space-y-1">
                            <label for="" class="font-koulen">អាស័យដ្ឋាន</label>
                            <textarea v-model="address" rows="5" type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md font-koulen placeholder:text-sm"
                                placeholder="អាស័យដ្ឋាន"></textarea>
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


            <!-- component -->

        </div>
    </div>

</template>


<script>
import { ref } from 'vue';
import {  handleMessageSuccess } from '@/message';
import {  timestamp } from '@/config/config';
import getDocument from '@/firebase/getDocument';
import { useRoute } from 'vue-router'
// import useDocument from '@/firebase/useDocument';
// import useNestedDocument from '@/firebase/useNestedDocument';
import { onMounted } from 'vue';

import useCollection from '@/firebase/useCollection';

export default {
    props: ['loadDataStudent', 'rewardId', 'studentDoc'],
    setup(props, { emit }) {

        const studentName = ref("");
        const email = ref("");
        const address = ref("");
        const phone = ref("");
        const rewardNo = ref("")
        const qty = ref(1);
        const route = useRoute()

        const isLoading = ref(false);

        const courseDoc = ref([]);

        const { documents: rewardDoc } = getDocument('rewardTypes', route.params.id, 'rewards')
        const {addcDocs, updateDocs} = useCollection("students")

        const btnEdit = ref(false);

        

        onMounted(() => {
            if (props.studentDoc) {
                studentName.value = props.studentDoc.studentName;
                email.value = props.studentDoc.email;
                address.value = props.studentDoc.address;
                phone.value = props.studentDoc.phone;
                btnEdit.value = true;
            }
        })

        //document
    


        const handleSubmit = async () => {
            isLoading.value = true;
            try {
                const data = {
                 
                    studentName: studentName.value.toLocaleLowerCase().trim(),
                    email: email.value.toLocaleLowerCase().trim(),
                    address: address.value,
                    phone: phone.value,
                    createdAt: timestamp()
                };

                if (btnEdit.value) {
                    // const { updateDocs } = useNestedDocument('rewardTypes', route.params.id, 'rewards', props.rewardId, "students");
                    // await updateDocs(props.studentDoc.id, data);
                    // handleMessageSuccess("បានកែប្រែដោយជោគជ័យ!");
                    // emit("close");

                    await updateDocs(props.studentDoc.id, data);
                    handleMessageSuccess("បានកែប្រែសិស្សដោយជោគជ័យ!");
                    emit("close");
                    
                } else {
                    await addcDocs(data);
                    handleMessageSuccess("បានបង្កើតសិស្សដោយជោគជ័យ!");
                    emit("close");
                    
                    //minus qty
                    // const rewardRef = doc(projectFirestore, "rewardTypes", route.params.id, "rewards", rewardNo.value);
                    // const rewardSnapshot = await getDoc(rewardRef);

                    // if (rewardSnapshot.exists()) {
                    //     const currentQty = rewardSnapshot.data().qty;
                    //     if (currentQty > 0) {
                    //         await addDocs(data);

                    //         await updateDoc(rewardRef, { qty: currentQty - 1 });

                    //         handleMessageSuccess("បានបង្កើតសិស្សដោយជោគជ័យ!");
                    //         emit("close");
                    //     } else {
                    //         handleMessageError("អស់រង្វាន់ទៀតហើយ!");
                    //     }
                    // } else {
                    //     handleMessageError("រកមិនឃើញរង្វាន់ទេ!");
                    // }
                }

                props.loadDataStudent();


            } catch (err) {
                console.log(err);
            } finally {
                isLoading.value = false;
            }
        };




        const handleClose = () => {
            emit('close');
        };
        

        return {
            handleClose,

            handleSubmit,
            isLoading,
            rewardDoc,
            rewardNo,
            btnEdit,
            studentName,
            phone,
            email,
            address,
            qty,
            courseDoc
        };
    }
};
</script>