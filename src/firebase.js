import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

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
const fileStorage = getStorage(app);
// const timestamp = firebase.firestore.timestamp;

const trialWrite = async () => {try {
    const docRef = await addDoc(collection(db, "users"), {
});
console.log("Document written with ID: ", docRef.id);
} catch (e) {
console.error("Error adding document: ", e);
}}

const trialGet = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
});
}
export {db, app, fileStorage, trialWrite, trialGet}