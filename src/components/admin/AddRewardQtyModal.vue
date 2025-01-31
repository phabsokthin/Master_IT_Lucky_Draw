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
                        <div class="text-lg font-medium leading-6 text-gray-900 font-koulen"> + បន្ថែមចំនួនសំណាង <span
                                class="text-green-600">{{ itemQty?.courseName }}</span>
                        </div>
                    </div>
                    <div class="w-full">

                        <div class="space-y-1">
                            <label for="" class="font-koulen">បន្ថែមចំនួន</label>
                            <input required v-model="qty" type="number" min="0" max="10"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md font-koulen placeholder:text-sm"
                                placeholder="ចំនួន">
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
import { handleMessageSuccess, handleMessageError } from '@/message';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { projectFirestore } from '@/config/config';
export default {
    props: ['rewardTypesId', 'itemQty'],
    setup(props, { emit }) {
        const courseName = ref("");
        const courseDescription = ref("");


        const isLoading = ref(false);

        const btnEdit = ref(false);


        const qty = ref(0); // Added a ref for quantity

        const handleSubmit = async () => {
            isLoading.value = true;
            try {
                // **1️⃣ Get the existing reward document**
                const rewardRef = doc(projectFirestore, "rewardTypes", props.rewardTypesId, "rewards", props.itemQty.id);
                const rewardSnapshot = await getDoc(rewardRef);

                if (!rewardSnapshot.exists()) {
                    handleMessageError("រកមិនឃើញរង្វាន់!");
                    return;
                }
                const currentQty = rewardSnapshot.data().qty || 0;

                // **2️⃣ Update the reward quantity**
                await updateDoc(rewardRef, {
                    qty: currentQty + Number(qty.value) 
                });

                handleMessageSuccess("បានបន្ថែមចំនួនដោយជោគជ័យ!");

                emit("close");

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
            courseName,
            courseDescription,
            handleSubmit,
            isLoading,
            qty,
            btnEdit,


        };
    }
};
</script>