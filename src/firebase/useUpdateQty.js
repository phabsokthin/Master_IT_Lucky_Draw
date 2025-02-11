import { ref } from "vue";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { projectFirestore } from "@/config/config";
import { handleMessageSuccess, handleMessageError } from "@/message";

export function useUpdateCourseQty() {
    const isLoading = ref(false);

    const updateCourseQty = async (courseId, qty, collectionName) => {
        if (qty <= 0) {
            handleMessageError("ចំនួនសំណាងត្រូវតែធំជាង 0!");
            return false;
        }
        isLoading.value = true;
        try {
            if (!courseId) {
                handleMessageError("រកមិនឃើញ ID របស់វគ្គសិក្សា!");
                return false;
            }

            // Reference to the course document
            const courseRef = doc(projectFirestore, collectionName, courseId);
            const courseSnapshot = await getDoc(courseRef);

            if (!courseSnapshot.exists()) {
                handleMessageError("រកមិនឃើញវគ្គសិក្សា!");
                return false;
            }

            const currentQty = courseSnapshot.data().qty || 0;

            // Update course quantity
            await updateDoc(courseRef, {
                qty: currentQty + Number(qty)
            });

            handleMessageSuccess("បានបន្ថែមចំនួនដោយជោគជ័យ!");
            return true; // Indicate success

        } catch (err) {
            console.error("Error updating quantity:", err);
            handleMessageError("មានបញ្ហាក្នុងការបន្ថែមចំនួន!");
            return false; // Indicate failure
        } finally {
            isLoading.value = false;
        }
    };

    return { updateCourseQty, isLoading };
}
