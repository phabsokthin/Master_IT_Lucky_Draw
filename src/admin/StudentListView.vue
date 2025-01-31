<template>
    <div class="flex items-center gap-1 my-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-scroll-text">
            <path d="M15 12h-5" />
            <path d="M15 8h-5" />
            <path d="M19 17V5a2 2 0 0 0-2-2H4" />
            <path
                d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
        </svg>
        <div class="font-koulen">បញ្ចីសិស្ស</div>
    </div>

    <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
            <div class="p-1.5 min-w-full inline-block align-middle">
                <div class="bg-white border divide-y dark:border-gray-700 dark:divide-gray-700">
                    <!-- Search and Buttons -->
                    <div class="flex items-center justify-between px-4 py-3">
                        <div class="relative max-w-xs">
                            <label class="sr-only">Search</label>
                            <input v-model="searchText" type="text" name="hs-table-with-pagination-search"
                                id="hs-table-with-pagination-search"
                                class="block w-full px-3 py-2 text-sm border shadow-sm ps-9 placeholder:font-koulen focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                placeholder="ស្វែងរក...">
                            <div class="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                                <svg class="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                            </div>
                        </div>
                        <div class="space-x-2">
                            <button class="btn_add" @click="handleAddStudentReward('AddStudentRewardModal')">+
                                បន្ថែមសិស្ស</button>
                        </div>
                    </div>

                    <!-- Table -->
                    <div class="overflow-hidden">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead class="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        ឈ្មោះសិស្ស
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        លេខរង្វាន់
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        លេខទូរស័ព្ទ
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        អុីម៉ែល
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        រង្វាន់(Reward)
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        អាស័យដ្ឋាន
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        កាលបរិច្ឆេត
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-end font-koulen">
                                        សកម្មភាព
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                <tr v-for="student in paginatedStudents" :key="student.id">
                                    <td
                                        class="px-6 py-4 text-sm font-medium text-gray-800 capitalize font-koulen whitespace-nowrap dark:text-gray-200">
                                        {{ student.studentName }}
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm font-medium text-gray-800 capitalize whitespace-nowrap dark:text-gray-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="text-orange-500 size-5">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                        </svg>
                                        <p class="bg-green-500 w-[50px] text-white px-3 rounded-full">{{
                                            student.rewardNo }}</p>
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                                        {{ student.phone }}
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm font-medium text-gray-800 capitalize whitespace-nowrap dark:text-gray-200">
                                        {{ student.email }}
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm font-medium text-gray-800 capitalize font-koulen whitespace-nowrap dark:text-gray-200">
                                        {{ student.courseName }}
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                                        {{ student.address }}
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                                        {{ student.createdAt ? new Date(student.createdAt.seconds *
                                            1000).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            }) : 'N/A' }}
                                    </td>
                                    <td>
                                        <div class="flex justify-end pr-2 space-x-2">
                                            <button @click="handleDelete(student.rewardId, student.id)"
                                                class="p-2 text-xs text-white bg-red-500 rounded-full font-koulen hover:bg-red-600">លុប</button>
                                            <button @click="handleUpdateStudent(student.rewardId, student)"
                                                class="px-2 py-1.5 text-xs text-white bg-blue-500 rounded-full font-koulen hover:bg-blue-600">កែប្រែ</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <!-- Pagination -->
                    <div class="px-4 py-1">
                        <nav class="flex items-center space-x-1">
                            <!-- Previous Button -->
                            <button type="button" @click="loadPreviousPage" :disabled="currentPage === 1"
                                class="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                <span aria-hidden="true">«</span>
                                <span class="sr-only">Previous</span>
                            </button>

                            <!-- Page Number Buttons -->
                            <button v-for="page in pageRange" :key="page" @click="goToPage(page)"
                                :class="['min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10', { 'bg-blue-500 text-white': currentPage === page }]">
                                {{ page }}
                            </button>

                            <!-- Next Button -->
                            <button type="button" @click="loadNextPage" :disabled="currentPage === totalPages"
                                class="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                <span aria-hidden="true">»</span>
                                <span class="sr-only">Next</span>
                            </button>
                        </nav>
                    </div>

                    <!-- <pre>{{ paginatedStudents }}</pre> -->
                    
                </div>
            </div>
        </div>
    </div>
    
    <component :is="currentComponent" @close="currentComponent = ''" :updateRewardType="updateRewardType"
        :loadDataStudent="loadDataStudent" :rewardId="rewardId" :studentDoc="studentDoc" />
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import getNestedSubcollection from '@/firebase/getNestedDocument';
import { useRoute } from 'vue-router';
import AddStudentRewardModal from '@/components/admin/AddStudentRewardModal.vue';
import useNestedDocument from '@/firebase/useNestedDocument';
import { handleMessageError, handleMessageSuccess } from '@/message';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { projectFirestore } from '@/config/config';

export default {
    components: {
        AddStudentRewardModal
    },
    setup() {
        const route = useRoute();
        const rewards = ref([]);
        const isLoading = ref(true);
        const error = ref(null);
        const currentComponent = ref('');
        let unsubscribe = null;
        const searchText = ref('');

        // Pagination state
        const currentPage = ref(1);
        const itemsPerPage = ref(10);

        const rewardId = ref("")
        const studentDoc = ref("")

        // Flattened students array
        const flattenedStudents = computed(() => {
            return rewards.value.flatMap(rewardDoc =>
                rewardDoc.students.map(student => ({
                    ...student,
                    rewardNo: rewardDoc.rewardNo,
                    courseName: rewardDoc.courseName
                }))
            );
        });

        // Computed property to filter students based on search
        const filteredStudents = computed(() => {
            if (!searchText.value) return flattenedStudents.value;
            return flattenedStudents.value.filter(student =>
                student.studentName.toLowerCase().includes(searchText.value.toLowerCase()) ||
                student.phone.includes(searchText.value) ||
                student.email.toLowerCase().includes(searchText.value.toLowerCase())
            );
        });

        // Computed property to calculate total pages based on filtered students
        const totalPages = computed(() => {
            return Math.ceil(filteredStudents.value.length / itemsPerPage.value);
        });

        // Computed property to get paginated data
        const paginatedStudents = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage.value;
            const end = start + itemsPerPage.value;
            return filteredStudents.value.slice(start, end);
        });

        // Handle component mount and unmount
        onMounted(() => {
            fetchDataStudent();
        });


        const fetchDataStudent = () => {
            try {
                unsubscribe = getNestedSubcollection(
                    "rewardTypes",
                    route.params.id,
                    "rewards",
                    "students",
                    (updatedData) => {
                        rewards.value = updatedData;
                        isLoading.value = false;
                    }
                );
            } catch (err) {
                error.value = err.message;
                isLoading.value = false;
            }
        }

        onUnmounted(() => {
            if (unsubscribe) unsubscribe();
        });

        //load student 

        const loadDataStudent = () => {
            fetchDataStudent();
        }
        // Pagination methods
        const loadPreviousPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        };

        const loadNextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
            }
        };

        const goToPage = (page) => {
            if (page >= 1 && page <= totalPages.value) {
                currentPage.value = page;
            }
        };

        // Computed property to generate page range for pagination buttons
        const pageRange = computed(() => {
            const range = [];
            for (let i = 1; i <= totalPages.value; i++) {
                range.push(i);
            }
            return range;
        });


        //hanlde delete

        // const handleDelete = async (rewardTypeId, studentId) => {

        //     const { deleteDocs } = useNestedDocument('rewardTypes', route.params.id, 'rewards', rewardTypeId, 'students');
        //     try{
        //         if(window.confirm("តើអ្នកចង់លុបមែនទេ?")){
        //             await deleteDocs(studentId)
        //             handleMessageSuccess("បានលុបសិស្សដោយជោគជ័យ");
        //             fetchDataStudent();
        //         }
        //     }
        //     catch(err){
        //         console.log(err)
        //     }
        // }   

        const handleDelete = async (rewardTypeId, studentId) => {
            const { deleteDocs } = useNestedDocument('rewardTypes', route.params.id, 'rewards', rewardTypeId, 'students');
            try {
                if (window.confirm("តើអ្នកចង់លុបសិស្សនេះមែនទេ?")) {
                    
                    const rewardRef = doc(projectFirestore, "rewardTypes", route.params.id, "rewards", rewardTypeId);
                    const rewardSnapshot = await getDoc(rewardRef);

                    if (rewardSnapshot.exists()) {
                        const currentQty = rewardSnapshot.data().qty;
                        await deleteDocs(studentId);
                        await updateDoc(rewardRef, { qty: currentQty + 1 });

                        handleMessageSuccess("បានលុបសិស្សដោយជោគជ័យ!");
                        fetchDataStudent();
                    } else {
                        handleMessageError("រកមិនឃើញរង្វាន់!");
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        // Handle adding student rewards
        const handleAddStudentReward = (component) => {
            currentComponent.value = component;
            rewardId.value = null;
            studentDoc.value = null
        };

        // update
        const handleUpdateStudent = (rewordTypeId, studentItem) => {
            currentComponent.value = 'AddStudentRewardModal';
            rewardId.value = rewordTypeId;
            studentDoc.value = studentItem;
        }


        return {
            rewards,
            isLoading,
            error,
            handleAddStudentReward,
            currentComponent,
            currentPage,
            itemsPerPage,
            totalPages,
            paginatedStudents,
            loadPreviousPage,
            loadNextPage,
            goToPage,
            pageRange,
            searchText,
            filteredStudents,
            loadDataStudent,
            handleDelete,
            handleUpdateStudent,
            rewardId,
            studentDoc
        };
    }
};
</script>
