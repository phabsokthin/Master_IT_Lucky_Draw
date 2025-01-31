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
                        <div class="text-lg font-medium leading-6 text-gray-900 font-koulen"> + បង្កើតប្រភេទរង្វាន់
                        </div>
                    </div>
                    <div class="w-full">

                        <div class="space-y-1">
                            <label for="" class="font-koulen">ប្រភេទរង្វាន់: *</label>
                            <input required v-model="rewardType" type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md font-koulen placeholder:text-sm"
                                placeholder="ប្រភេទរង្វាន់">
                        </div>

                        <div class="mt-2 space-y-1">
                            <label for="" class="font-koulen">ពិពណ៌នា</label>
                            <textarea v-model="rewardDescription" rows="5" type="text"
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
                            <button type="button" @click="handleReset"
                                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm font-koulen hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5">
                                ជម្រះ
                            </button>
                        </span>
                    </div>
                </form>


                <section class="mt-5 antialiased text-gray-600 ">
                    <div class="flex flex-col justify-center h-full">
                        <!-- Table -->
                        <div class="w-full mx-auto bg-white border border-gray-200 rounded-sm">
                            <header class="flex items-center gap-1 px-5 py-4 border-b border-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-scroll-text">
                                    <path d="M15 12h-5" />
                                    <path d="M15 8h-5" />
                                    <path d="M19 17V5a2 2 0 0 0-2-2H4" />
                                    <path
                                        d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
                                </svg>
                                <h2 class="font-semibold text-gray-800 font-koulen">បញ្ចីរង្វាន់</h2>
                            </header>

                            <div class="">
                                <div class="overflow-x-auto">
                                    <table class="w-full table-auto">
                                        <thead class="text-xs font-semibold text-gray-600 uppercase bg-gray-50">
                                            <tr>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-left text-md font-koulen">
                                                        ប្រភេទរង្វាន់</div>
                                                </th>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-left text-md font-koulen">ពិពណ៌នា
                                                    </div>
                                                </th>
                                                <th class="p-2 whitespace-nowrap ">
                                                    <div class="pr-2 font-semibold text-end text-md font-koulen">
                                                        សកម្មភាព</div>
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody class="text-sm divide-y divide-gray-100">
                                            <tr v-for="types in rewardTypesDoc" :key="types">

                                                <td class="p-2 whitespace-nowrap">
                                                    <div class="text-left capitalize font-koulen">{{ types.rewardType }}</div>
                                                </td>
                                                <td class="p-2 whitespace-nowrap">
                                                    <div class="text-left">{{ types.rewardDescription }}</div>
                                                </td>
                                                <td class="">
                                                    <div class="flex justify-end pr-2 space-x-2">
                                                        <button @click="handleDelete(types.id)"
                                                            class="p-2 text-xs text-white bg-red-500 rounded-full font-koulen hover:bg-red-600">លុប</button>
                                                        <button @click="handleEdit(types)"
                                                            class="px-2 py-1.5 text-xs text-white bg-blue-500 rounded-full font-koulen hover:bg-blue-600">កែប្រែ</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <!-- component -->

        </div>
    </div>

</template>


<script>
import { ref } from 'vue';
import useCollection from '@/firebase/useCollection';
import { handleMessageError, handleMessageSuccess } from '@/message';
import getCollection from '@/firebase/getCollection';
import { timestamp } from '@/config/config';
import checkRewardTypeExist from '@/firebase/checkRewardTypeExist'

export default {
    setup(props, { emit }) {
        const rewardType = ref("");
        const rewardDescription = ref("");
        const selectedId = ref(null); // Track the ID of the reward type being edited

        const { addcDocs, deleteDocs, updateDocs } = useCollection("rewardTypes");
        const isLoading = ref(false);

        const { document: rewardTypesDoc } = getCollection("rewardTypes");
        const btnEdit = ref(false);

        const handleSubmit = async () => {
            isLoading.value = true;
            try {
                const data = {
                    rewardType: rewardType.value.toLocaleLowerCase().trim(),
                    rewardDescription: rewardDescription.value,
                    createdAt: timestamp()
                };

                if (btnEdit.value) {
                    // If in edit mode, call handleUpdate with the selected reward type's ID
                    await handleUpdate(selectedId.value);
                } else {
                    // If in create mode, add a new reward type
                    await addcDocs(data);
                    handleMessageSuccess("បានបង្កើតប្រភេទរង្វាន់ដោយជោគជ័យ!");
                }

                // Reset the form after submission
                handleReset();
            } catch (err) {
                console.log(err);
            } finally {
                isLoading.value = false;
            }
        };

        // const handleDelete = async (id) => {
        //     try {
        //         if (window.confirm("តើអ្នកចង់លុបមែនទេ?")) {
        //             if (id) {
        //                 await deleteDocs(id);
        //                 handleMessageSuccess("បានលុបប្រភេទរង្វាន់ដោយជោគជ័យ");
        //             }
        //         }
        //     } catch (err) {
        //         console.log(err);
        //     }
        // };

        const handleDelete = async (id) => {
            try {
                if (window.confirm("តើអ្នកចង់លុបមែនទេ?")) {
                    if (id) {
                        const hasNoAssociatedRewards = await checkRewardTypeExist(id, 'rewardTypes');

                        if (hasNoAssociatedRewards) {
                            await deleteDocs(id);
                            handleMessageSuccess("បានលុបប្រភេទរង្វាន់ដោយជោគជ័យ");
                        } else {
                            handleMessageError("អ្នកមិនអាចលុបប្រភេទរង្វាន់នេះបានទេ។ មានរង្វាន់ដែលពាក់ព័ន្ធជាមួយវា។");
                        }
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };



        const handleEdit = async (item) => {
            if (item) {
                rewardType.value = item.rewardType;
                rewardDescription.value = item.rewardDescription;
                selectedId.value = item.id; // Store the ID of the reward type being edited
            }
            btnEdit.value = true; // Switch to edit mode
        };

        const handleClose = () => {
            emit('close');
        };

        const handleReset = () => {
            rewardType.value = "";
            rewardDescription.value = "";
            btnEdit.value = false;
            selectedId.value = null; // Clear the selected ID
        };

        const handleUpdate = async (id) => {
            isLoading.value = true;
            try {
                const data = {
                    rewardType: rewardType.value,
                    rewardDescription: rewardDescription.value
                };
                await updateDocs(id, data); // Update the reward type in Firestore
                handleMessageSuccess("បានកែប្រែប្រភេទរង្វាន់ដោយជោគជ័យ!");
            } catch (err) {
                console.log(err);
            } finally {
                isLoading.value = false;
            }
        };

        return {
            handleClose,
            rewardType,
            rewardDescription,
            handleSubmit,
            isLoading,
            rewardTypesDoc,
            handleDelete,
            handleEdit,
            btnEdit,
            handleReset,
            handleUpdate
        };
    }
};
</script>