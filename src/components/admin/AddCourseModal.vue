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
                        <div class="text-lg font-medium leading-6 text-gray-900 font-koulen"> + បង្កើតរង្វាន់សំណាង
                        </div>
                    </div>
                    <div class="w-full space-y-3">

                        <div class="space-y-1">
                            <label for="" class="font-koulen">លេខរង្វាន់: *</label>
                            <input required v-model="courseNoReward" type="number"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-sm"
                                placeholder="លេខរង្វាន់">
                        </div>
                        <div class="space-y-1">
                            <label for="" class="font-koulen">រង្វាន់សំណាង: *</label>
                            <input required v-model="courseName" type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-sm"
                                placeholder="រង្វាន់សំណាង">
                        </div>

                        <div class="space-y-1">
                            <label for="" class="font-koulen">ចំនួនសំណាង: *</label>
                            <input required v-model="qty" type="number"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-sm"
                                placeholder="លេខរង្វាន់">
                        </div>

                        <div class="space-y-1">
                            <label for="" class="font-koulen">តម្លៃរង្វាន់: *</label>
                            <input required v-model="courseValue" type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-sm"
                                placeholder="លេខរង្វាន់">
                        </div>

                        <div class="mt-2 space-y-1">
                            <label for="" class="font-koulen">ពិពណ៌នា</label>
                            <textarea v-model="courseDescription" rows="5" type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md placeholder:text-sm"
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


            <!-- component -->

        </div>
    </div>

</template>



<script>
import { ref, onMounted } from 'vue';
import useCollection from '@/firebase/useCollection';
import getCollection from '@/firebase/getCollection';
import { timestamp } from '@/config/config';
import { handleMessageSuccess, handleMessageError } from '@/message';

export default {
    props: ['courseDetail'],
    setup(props, { emit }) {
        const courseName = ref("");
        const courseDescription = ref("");
        const courseNoReward = ref("");
        const qty = ref(0);
        const courseValue = ref("");
        const btnEdit = ref(false);
        const isLoading = ref(false);
        const selectedId = ref(null); // Track the ID of the reward type being edited

        const { addcDocs, updateDocs } = useCollection("courses");
        const { document: courseNamesDoc } = getCollection("courses");

        onMounted(() => {
            if (props.courseDetail) {
                courseNoReward.value = props.courseDetail.courseNoReward;
                qty.value = props.courseDetail.qty;
                courseValue.value = props.courseDetail.courseValue;
                courseName.value = props.courseDetail.courseName;
                courseDescription.value = props.courseDetail.courseDescription;
                btnEdit.value = true;
            }
        });

        const checkDuplicateCourse = async (name, noReward, excludeCourseId = null) => {
            const existingCourses = courseNamesDoc.value || [];

            const normalizedName = String(name).toLowerCase().trim();
            const normalizedNoReward = String(noReward).toLowerCase().trim();

            return existingCourses.some(course => {
                // Skip the course being edited
                if (excludeCourseId && course.id === excludeCourseId) {
                    return false;
                }

                return (
                    String(course.courseName).toLowerCase().trim() === normalizedName ||
                    String(course.courseNoReward).toLowerCase().trim() === normalizedNoReward
                );
            });
        };


        const handleSubmit = async () => {
            isLoading.value = true;
            try {
                const courseData = {
                    courseNoReward: courseNoReward.value,
                    courseName: courseName.value.toLowerCase().trim(),
                    qty: qty.value,
                    courseValue: courseValue.value,
                    courseDescription: courseDescription.value,
                    createdAt: timestamp(),
                };

                // If it's an update, check if the course is duplicated excluding the current course being edited
                const isDuplicate = await checkDuplicateCourse(courseData.courseName, courseData.courseNoReward, props.courseDetail?.id);

                // If the course is a duplicate and it's NOT in edit mode, show error


                if (btnEdit.value) {
                    if (isDuplicate) {
                        handleMessageError("លេខរង្វាន់និងរង្វាន់សំណាងមានម្តងហើយ​!");
                        return;
                    }
                    // If editing an existing course, perform the update
                    await updateDocs(props.courseDetail.id, courseData);
                    handleMessageSuccess("បានកែប្រែដោយជោគជ័យ!");
                } else {

                    if (isDuplicate) {
                        handleMessageError("លេខរង្វាន់និងរង្វាន់សំណាងមានម្តងហើយ​!");
                        return;
                    }
                    // If adding a new course, perform the add operation
                    await addcDocs(courseData);
                    handleMessageSuccess("បានបង្កើតវគ្គសិក្សាដោយជោគជ័យ!");
                }

                emit('close');
                handleReset();
            } catch (err) {
                console.error("Error saving course:", err);
                handleMessageError("មានបញ្ហាក្នុងការរក្សាទុកវគ្គសិក្សា!");
            } finally {
                isLoading.value = false;
            }
        };



        const handleClose = () => {
            emit('close');
        };

        const handleReset = () => {
            courseName.value = "";
            courseDescription.value = "";
            courseNoReward.value = "";
            qty.value = 0;
            courseValue.value = "";
            btnEdit.value = false;
            selectedId.value = null;
        };

        return {
            handleClose,
            courseName,
            courseDescription,
            handleSubmit,
            isLoading,
            courseNamesDoc,
            btnEdit,
            handleReset,
            courseNoReward,
            qty,
            courseValue
        };
    }
};
</script>
