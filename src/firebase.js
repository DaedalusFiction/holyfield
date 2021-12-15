import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyArDi_-fjofBZspjJuMuXNHoLE-jHlFgnQ",
  authDomain: "holyfield-232ce.firebaseapp.com",
  projectId: "holyfield-232ce",
  storageBucket: "holyfield-232ce.appspot.com",
  messagingSenderId: "508024739621",
  appId: "1:508024739621:web:869609029250a6e067accc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, db, storage }