import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { projectFirestore } from '@/config/config';

const getNestedSubcollection = (collectionName, parentId, subCollectionName, nestedSubCollectionName, callback) => {
    const subCollectionRef = query(
        collection(projectFirestore, collectionName, parentId, subCollectionName),
        orderBy("createdAt", "desc") // Ensure "createdAt" is a timestamp field indexed in Firestore
    );

    const unsubscribe = onSnapshot(subCollectionRef, async (subCollectionSnapshot) => {
        const dataPromises = subCollectionSnapshot.docs.map(async (docSnapshot) => {
            const rewardData = { id: docSnapshot.id, ...docSnapshot.data() };

            // Reference to the nested subcollection (students under rewards) with ordering
            const nestedSubCollectionRef = query(
                collection(docSnapshot.ref, nestedSubCollectionName),
                orderBy("createdAt", "desc") // Order students by timestamp
            );

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
