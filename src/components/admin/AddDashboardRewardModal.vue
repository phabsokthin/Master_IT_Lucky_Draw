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
                        <div class="text-lg font-medium leading-6 text-gray-900 font-koulen"> + បង្កើតផ្ទាំងបង្ហាញរង្វាន់
                        </div>
                    </div>
                    <div class="w-full space-y-3">

                        <div class="space-y-1">
                            <label for="" class="font-koulen">ចំនួនសំណាង: *</label>
                            <input required v-model="qty" type="number"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-sm"
                                placeholder="លេខរង្វាន់">
                        </div>
                        <div class="space-y-1">
                            <label for="" class="font-koulen">ចំនួនពិន្ទុ: *</label>
                            <input required v-model="scores" type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-sm"
                                placeholder="រង្វាន់សំណាង">
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
import useCollection from '@/firebase/useCollection';
import { handleMessageSuccess } from '@/message';
import { timestamp } from '@/config/config';
import { onMounted } from 'vue';
// import checkcourseNameExist from '@/firebase/checkcourseNameExist'

export default {
    props: ['rewardDetail'],
    setup(props, { emit }) {
        const courseName = ref("");
       const qty = ref(0);
       const scores = ref("");

        const { addcDocs, updateDocs } = useCollection("rewardDashboard");
        const isLoading = ref(false);

        const courseNoReward = ref("")
  
        const courseValue = ref("")

        const btnEdit = ref(false);


        onMounted(() => {
            if (props.rewardDetail) {
                qty.value = props.rewardDetail.qty;
                scores.value = props.rewardDetail.scores;
                btnEdit.value = true;
            }
        })

        const handleSubmit = async () => {
            isLoading.value = true;
            try {
                const data = {
                    qty: qty.value,
                    scores: scores.value,
                    createdAt: timestamp()
                };

                if (btnEdit.value) {
                    await updateDocs(props.rewardDetail.id, data);
                    handleMessageSuccess("បានកែប្រែដោយជោគជ័យ!");

                } else {

                    await addcDocs(data);
                    handleMessageSuccess("បានបង្កើតផ្ទាំងរង្វាន់ដោយជោគជ័យ!");
                }
                emit('close')

                handleReset();
            } catch (err) {
                console.log(err);
            } finally {
                isLoading.value = false;
            }
        };




        const handleClose = () => {
            emit('close');
        };

        const handleReset = () => {
            qty.value = "";
            scores.value = "";
            btnEdit.value = false;
        };


        return {
            handleClose,
            courseName,
            handleSubmit,
            isLoading,
            qty,
            scores,

            btnEdit,
            handleReset,
            courseNoReward,
            courseValue

        };
    }
};
</script>