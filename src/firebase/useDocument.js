import { projectFirestore } from "@/config/config";
import { addDoc, collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore"
import { ref } from "vue"


const useDocument = (collectionName, id, subCollectionName) => {
    const isLoading = ref(false)
    const isLoadings = ref(false)
    const addDocs = async(formDoc) => {
    
        const documentRef = doc(projectFirestore, collectionName, id)
        const doclectionRef = collection(documentRef, subCollectionName);

        try{
            isLoading.value = true
            await addDoc(doclectionRef, formDoc);
            isLoading.value = false;
        }
        catch(err){
            console.log(err)
        }
    }

    
    const setDocs = async(formDoc, docID) => {
        isLoadings.value = true
        const collectionRef = doc(projectFirestore, `${collectionName}/${id}/${subCollectionName}/${docID}`)
        try{
            await setDoc(collectionRef, formDoc)
            isLoadings.value = false;
        }
        catch(err){
            console.log(err)
        }
    }


    const updateDocs = async(docID, formDoc) => {
        const documentRef = doc(doc(projectFirestore, collectionName, id), subCollectionName, docID)
        try{
            await updateDoc(documentRef,formDoc)
        }
        catch(err){
            console.log(err)
        }
    }


    const deleteDocs = async(docID) => {

        const documentRef = doc(doc(projectFirestore, collectionName,id), subCollectionName, docID);
        try{
            isLoading.value = true
            await deleteDoc(documentRef)
            isLoading.value = false
        }
        catch(err){
            console.log(err)
        }

    }


    return {addDocs, isLoading, setDocs, isLoadings, deleteDocs, updateDocs}
}

export default useDocument;