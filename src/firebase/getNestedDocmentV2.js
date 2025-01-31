import { collection, onSnapshot } from 'firebase/firestore';
import { projectFirestore } from '@/config/config';

const getNestedSubcollection = (collectionName, parentId, subCollectionName, nestedSubCollectionName, callback) => {
    const subCollectionRef = collection(projectFirestore, collectionName, parentId, subCollectionName);

    // Listen for real-time updates in `rewards`
    const unsubscribe = onSnapshot(subCollectionRef, async (subCollectionSnapshot) => {
        const dataPromises = subCollectionSnapshot.docs.map(async (docSnapshot) => {
            const rewardData = { id: docSnapshot.id, ...docSnapshot.data() };

            // Reference to the nested subcollection (students under rewards)
            const nestedSubCollectionRef = collection(docSnapshot.ref, nestedSubCollectionName);

            return new Promise((resolve) => {
                onSnapshot(nestedSubCollectionRef, (nestedSnapshot) => {
                    rewardData[nestedSubCollectionName] = nestedSnapshot.docs.map(nestedDoc => ({
                        id: nestedDoc.id,
                        ...nestedDoc.data(),
                    }));

                    resolve(rewardData);
                });
            });
        });

        const updatedData = await Promise.all(dataPromises);
        callback(updatedData);
    });

    return unsubscribe; // Return unsubscribe function to stop listening when needed
};

export default getNestedSubcollection;
