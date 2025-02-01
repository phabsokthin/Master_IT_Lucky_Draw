import { projectFirestore } from "@/config/config";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { ref, watchEffect } from "vue";

const getDocumentQueryTerm = (collectionName, id, subCollection, condition) => {
    const isLoading = ref(true);
    const documents = ref([]);
  
    if (!condition || condition._value.length === 0) {
      console.warn("Invalid document ID provided for query.");
      isLoading.value = false;
      return { documents, isLoading };
    }
  
    // Reference to the main document
    const documentRef = doc(projectFirestore, `${collectionName}/${id}/`);
    const subCollectionRef = collection(documentRef, subCollection);
  
    const q = query(subCollectionRef, condition);
  
    const unsubscribe = onSnapshot(
      q,
      (qrySnapshot) => {
        const result = [];
        qrySnapshot.forEach((doc) => {
          result.push({ id: doc.id, ...doc.data() });
        });
        documents.value = result;
        isLoading.value = false;
      },
      (err) => {
        console.error("Error fetching documents:", err);
      }
    );
  
    watchEffect((onInvalidate) => {
      onInvalidate(() => unsubscribe());
    });
  
    return { documents, isLoading };
  };
  

export default getDocumentQueryTerm;
