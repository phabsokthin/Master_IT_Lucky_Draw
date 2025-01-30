<template>
    <div class="flex items-center gap-1 my-5">
        <!-- SVG and Title -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-scroll-text">
            <path d="M15 12h-5" />
            <path d="M15 8h-5" />
            <path d="M19 17V5a2 2 0 0 0-2-2H4" />
            <path
                d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
        </svg>
        <div class="font-koulen">បញ្ចីរង្វាន់</div>
    </div>
    <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
            <div class="p-1.5 min-w-full inline-block align-middle">
                <div class="bg-white border divide-y dark:border-gray-700 dark:divide-gray-700">
                    <!-- Search and Buttons -->
                    <div class="flex items-center justify-between px-4 py-3">
                        <div class="relative max-w-xs">
                            <label class="sr-only">Search</label>
                            <input v-model="search" type="text" name="hs-table-with-pagination-search"
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
                            <button class="btn_add" @click="handleAddReward('AddRewardTypeModal')">+
                                បន្ថែមរង្វាន់</button>
                            <button class="btn_add" @click="handleAddReward('AddRewardModal')">+ បង្កើតថ្មី</button>
                        </div>
                    </div>
                    <!-- Table -->
                    <div class="overflow-hidden">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead class="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        លេខរង្វាន់
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        ប្រភេទរង្វាន់
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        រង្វាន់
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        តម្លៃរង្វាន់(%)
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        ចំនួន(រង្វាន់)
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-sm font-medium text-gray-500 uppercase text-start font-koulen">
                                        ពិពណ៌នា
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
                                <template v-for="rewardType in paginatedRewardDocs" :key="rewardType.id">
                                    <tr v-for="rewards in rewardType.rewards" :key="rewards.id">
                                        <td
                                            class="px-6 py-4 text-sm font-medium text-gray-800 font-koulen whitespace-nowrap dark:text-gray-200">

                                            <div class="flex gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor"
                                                    class="text-orange-500 size-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                </svg>

                                                <p class="bg-green-500 w-[50px] text-white px-3 rounded-full">{{
                                                    rewards.rewardNo }}</p>
                                            </div>
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm font-medium text-gray-800 capitalize font-koulen whitespace-nowrap dark:text-gray-200">
                                            {{ rewardType.rewardType }}
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm font-medium text-gray-800 capitalize font-koulen whitespace-nowrap dark:text-gray-200">
                                            {{ rewards.courseName }}
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm font-medium text-gray-800 font-koulen whitespace-nowrap dark:text-gray-200">
                                            {{ rewards.rewardValue }} ភាគរយ
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                                            <div>
                                                <div v-if="rewards.qty === 0">
                                                    <p class="text-red-500 font-koulen">អស់ហើយ</p>
                                                </div>
                                                <div v-else>
                                                    <p class="font-koulen">នៅសល់ {{ rewards.qty  }} </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                                            {{ rewards.rewardDescription }}
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-gray-200">
                                            {{ rewards.createdAt ? new Date(rewards.createdAt.seconds *
                                                1000).toLocaleDateString('en-US', {
                                                    weekday: 'short',
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                }) : 'N/A' }}
                                        </td>
                                        <td>
                                            <div class="flex justify-end pr-2 space-x-2">
                                                <button @click="handleAddQtyModal(rewardType.id, rewards)"
                                                class="p-2 text-xs text-white bg-green-500 rounded-full font-koulen hover:bg-green-600">មើលលម្អិត</button>
                                                <button @click="handleAddQtyModal(rewardType.id, rewards)"
                                                    class="p-2 text-xs text-white bg-yellow-500 rounded-full font-koulen hover:bg-yellow-600">បន្ថែម</button>
                                                <button @click="handleDelete(rewardType.id, rewards.id)"
                                                    class="p-2 text-xs text-white bg-red-500 rounded-full font-koulen hover:bg-red-600">លុប</button>
                                                <button @click="handleUpdate(rewardType.id, rewards)"
                                                    class="px-2 py-1.5 text-xs text-white bg-blue-500 rounded-full font-koulen hover:bg-blue-600">កែប្រែ</button>
                                            </div>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                    <!-- Pagination -->
                    <div class="px-4 py-1">
                        <nav class="flex items-center space-x-1">
                            <button type="button" @click="prevPage" :disabled="currentPage === 1"
                                class="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                <span aria-hidden="true">«</span>
                                <span class="sr-only">Previous</span>
                            </button>
                            <button type="button" v-for="page in totalPages" :key="page" @click="goToPage(page)"
                                :class="['min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10', { 'bg-blue-500 text-white': currentPage === page }]">
                                {{ page }}
                            </button>
                            <button type="button" @click="nextPage" :disabled="currentPage === totalPages"
                                class="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                <span class="sr-only">Next</span>
                                <span aria-hidden="true">»</span>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <component :is="currentComponent" @close="currentComponent = ''" :rewardTypeId="rewardTypeId"
        :itemData="itemData" :rewardTypesId="rewardTypesId" :itemQty="itemQty" />
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useFirestoreCollection, useSubcollection } from '@/firebase/getSubcollection';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { projectFirestore } from '@/config/config';
import AddRewardModal from '@/components/admin/AddRewardModal.vue';
import AddRewardTypeModal from '@/components/admin/AddRewardTypeModal.vue';
import useDocument from '@/firebase/useDocument';
import { handleMessageSuccess } from '@/message';
import AddRewardQtyModal from '@/components/admin/AddRewardQtyModal.vue';

export default {
    components: {
        AddRewardModal,
        AddRewardTypeModal,
        AddRewardQtyModal

    },
    setup() {
        const rewardDocs = ref([]);
        const { documents: rewardTypeDoc, fetchCollection } = useFirestoreCollection("rewardTypes");

        const currentComponent = ref('');
        let unsubscribeRewardTypes = null;
        const rewardUnsubscribers = [];
        const search = ref("");
        const itemData = ref("");
        const rewardTypeId = ref("");

        // Pagination state
        const currentPage = ref(1);
        const itemsPerPage = ref(4);

        const rewardTypesId = ref("");
        const itemQty = ref("");

        // Fetch data
        onMounted(async () => {
            unsubscribeRewardTypes = await fetchCollection();
            await fetchReward();
        });

        onUnmounted(() => {
            if (unsubscribeRewardTypes) {
                unsubscribeRewardTypes();
            }
            rewardUnsubscribers.forEach((unsubscribe) => unsubscribe());
        });


        //fetct data real-time
        const fetchReward = () => {
            const orderByField = 'rewardNo';

            try {
                rewardTypeDoc.value.forEach((reward) => {
                    const { fetchSubcollection } = useSubcollection(
                        'rewardTypes', reward.id, 'rewards', orderByField
                    );

                    fetchSubcollection();

                    const unsubscribe = onSnapshot(
                        query(
                            collection(projectFirestore, `rewardTypes/${reward.id}/rewards`),
                            orderBy("createdAt", "desc")
                        ),
                        (snapshot) => {
                            const updatedRewards = snapshot.docs.map((doc) => ({
                                id: doc.id,
                                ...doc.data(),
                            }));

                            const rewardIndex = rewardDocs.value.findIndex((r) => r.id === reward.id);
                            if (rewardIndex !== -1) {
                                rewardDocs.value[rewardIndex].rewards = updatedRewards;
                            } else {
                                rewardDocs.value.push({
                                    id: reward.id,
                                    rewardType: reward.rewardType,
                                    rewardDescription: reward.rewardDescription,
                                    rewards: updatedRewards,
                                });
                            }
                        }
                    );

                    rewardUnsubscribers.push(unsubscribe);
                });
            } catch (err) {
                console.error('Error fetching reward types and rewards:', err);
            }
        };

        // Search logic
        const filteredRewardDocs = computed(() => {
            const lowerSearch = search.value.toLowerCase();
            return rewardDocs.value.filter((rewardDoc) => {
                return rewardDoc.rewards.some((reward) => {
                    const rewardTypeMatch = rewardDoc.rewardType.toLowerCase().includes(lowerSearch);
                    const rewardDescriptionMatch = rewardDoc.rewardDescription.toLowerCase().includes(lowerSearch);
                    const rewardNoMatch = reward.rewardNo && reward.rewardNo.toString().includes(lowerSearch);

                    return rewardTypeMatch || rewardDescriptionMatch || rewardNoMatch;
                });
            });
        });


        // Pagination logic
        const totalPages = computed(() => Math.ceil(filteredRewardDocs.value.length / itemsPerPage.value));

        const paginatedRewardDocs = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage.value;
            const end = start + itemsPerPage.value;
            return filteredRewardDocs.value.slice(start, end);
        });

        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
            }
        };

        const goToPage = (page) => {
            currentPage.value = page;
        };

        const handleAddReward = (component) => {
            currentComponent.value = component;
            itemData.value = null;
            rewardTypeId.value = null
        };

        const handleUpdate = (rewardType, item) => {
            currentComponent.value = 'AddRewardModal';
            rewardTypeId.value = rewardType
            itemData.value = item


        };

        //handle delete
        const handleDelete = async (itemType, id) => {
            try {
                const { deleteDocs } = useDocument('rewardTypes', itemType, 'rewards');
                if (id) {
                    if (window.confirm("តើអ្នកចង់លុបមែនទេ?")) {
                        await deleteDocs(id);
                        handleMessageSuccess("បានលុបរង្វាន់ដោយជោគជ័យ");
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        //add qty modal

        const handleAddQtyModal = (rewardTypeId, item) => {
            currentComponent.value = 'AddRewardQtyModal';
            rewardTypesId.value = rewardTypeId
            itemQty.value = item
        }

        return {
            rewardDocs,
            paginatedRewardDocs,
            currentPage,
            totalPages,
            prevPage,
            nextPage,
            goToPage,
            handleAddReward,
            currentComponent,
            search,
            handleDelete,
            handleUpdate,
            itemData,
            rewardTypeId,
            handleAddQtyModal,
            rewardTypesId,
            itemQty
           
        };
    },
};
</script>