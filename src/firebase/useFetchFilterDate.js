import { ref } from "vue";
import { collection, doc, getDocs, orderBy, query, where, Timestamp } from "firebase/firestore";
import { projectFirestore } from "@/config/config"; // Adjust this path based on your setup

export function useFetchRewards() {
    const rewards = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchRewards = async (rewardTypeId,collectionName, startDate, endDate, docName) => {
        try {
            if (!rewardTypeId) return;

            loading.value = true;
            error.value = null;

            const rewardTypeDocRef = doc(projectFirestore, collectionName, rewardTypeId);
            const rewardsSubcollection = collection(rewardTypeDocRef, docName);

            let rewardsQuery = query(rewardsSubcollection, orderBy("createdAt", "desc"));

            if (startDate && endDate) {
                const start = Timestamp.fromDate(new Date(startDate));
                const end = Timestamp.fromDate(new Date(endDate + "T23:59:59"));

                rewardsQuery = query(
                    rewardsQuery,
                    where("createdAt", ">=", start),
                    where("createdAt", "<=", end)
                );
            }

            const rewardsSnapshot = await getDocs(rewardsQuery);

            rewards.value = rewardsSnapshot.empty
                ? []
                : rewardsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
        } catch (err) {
            console.error("Error fetching rewards:", err);
            error.value = "កំហុសក្នុងការទាញយកទិន្ន័យ។ សូមព្យាយាមម្តងទៀត។";
        } finally {
            loading.value = false;
        }
    };

    return { rewards, loading, error, fetchRewards };
}
