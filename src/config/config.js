
import {initializeApp} from 'firebase/app'
import {getFirestore, serverTimestamp} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import { getStorage } from 'firebase/storage';


//sokthinqwe22@gmail.com 

const firebaseConfig = {
    apiKey: "AIzaSyA9q_nceMzzOxwCoppcLp6fBKR_udNy3ac",
    authDomain: "master-it-btb-display-rewards.firebaseapp.com",
    projectId: "master-it-btb-display-rewards",
    storageBucket: "master-it-btb-display-rewards.firebasestorage.app",
    messagingSenderId: "216954445716",
    appId: "1:216954445716:web:df4ecd82e33bc3dcba3981"
  };

const firebaseApp = initializeApp(firebaseConfig)
const projectFirestore = getFirestore(firebaseApp)
const projectAuth = getAuth(firebaseApp)
const projectStorage = getStorage(firebaseApp)
const timestamp= serverTimestamp;

export {projectFirestore, projectAuth,timestamp, projectStorage}

