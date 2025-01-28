import { projectFirestore } from "@/config/config";
import { collection, getDocs } from "firebase/firestore";

const checkIfSubcollectionIsEmpty = async (docId, subcollectionName) => {
    const subcollectionRef = collection(projectFirestore, `${subcollectionName}/${docId}/rewards`);
    const snapshot = await getDocs(subcollectionRef);
    return snapshot.empty; // Returns true if there are no documents, false otherwise
};


  export default checkIfSubcollectionIsEmpty