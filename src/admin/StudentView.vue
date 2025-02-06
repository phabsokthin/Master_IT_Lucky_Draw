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
                                        លេខទូរស័ព្ទ
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        អុីម៉ែល
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
                                <tr v-for="student in filteredStudents" :key="student.id">
                                    <td
                                        class="px-6 py-4 text-sm font-medium text-gray-800 capitalize font-koulen whitespace-nowrap dark:text-gray-200">
                                        {{ student.studentName }}
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
                                            <button @click="handleDelete(student.id)"
                                                class="p-2 text-xs text-white bg-red-500 rounded-full font-koulen hover:bg-red-600">លុប</button>
                                            <button @click="handleUpdateStudent(student)"
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


import { ref, computed } from 'vue';
import AddStudentRewardModal from '@/components/admin/AddStudentRewardModal.vue';
import getCollection from '@/firebase/getCollection';
import useCollection from '@/firebase/useCollection';
import { handleMessageSuccess } from '@/message';

export default {
    components: {
        AddStudentRewardModal
    },
    setup() {
        const isLoading = ref(true);
        const error = ref(null);
        const currentComponent = ref('');
        const searchText = ref('');

        // Pagination state
        const currentPage = ref(1);
        const itemsPerPage = ref(10);

        const rewardId = ref("");
        const studentDoc = ref("");

        const { document: students } = getCollection("students");
        const { deleteDocs } = useCollection("students");

        // Computed property to filter students based on search text
        const filteredStudents = computed(() => {
            if (!searchText.value) {
                return students.value;
            }
            return students.value.filter(student => {
                return (
                    student.studentName.toLowerCase().includes(searchText.value.toLowerCase()) ||
                    student.phone.toLowerCase().includes(searchText.value.toLowerCase()) ||
                    student.email.toLowerCase().includes(searchText.value.toLowerCase()) ||
                    student.address.toLowerCase().includes(searchText.value.toLowerCase())
                );
            });
        });

        // Handle delete
        const handleDelete = async (studentId) => {
            console.log(studentId);
            try {
                if (window.confirm("តើអ្នកចង់លុបមែនទេ?")) {
                    await deleteDocs(studentId);
                    handleMessageSuccess("បានលុបសិស្សដោយជោគជ័យ");
                }
            } catch (err) {
                console.log(err);
            }
        };

        // Handle adding student rewards
        const handleAddStudentReward = (component) => {
            currentComponent.value = component;
            rewardId.value = null;
            studentDoc.value = null;
        };

        // Handle update
        const handleUpdateStudent = (studentItem) => {
            currentComponent.value = 'AddStudentRewardModal';
            studentDoc.value = studentItem;
        };

        return {
            isLoading,
            error,
            handleAddStudentReward,
            currentComponent,
            currentPage,
            itemsPerPage,
            searchText,
            handleUpdateStudent,
            rewardId,
            studentDoc,
            students,
            handleDelete,
            filteredStudents // Add the computed property to the return object
        };
    }
};


</script>
