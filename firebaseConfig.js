import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDNy2id2LJJ1OW7-n7pNjeg8VAloMsHzXA",
  authDomain: "facebook-clone-312a0.firebaseapp.com",
  projectId: "facebook-clone-312a0",
  storageBucket: "facebook-clone-312a0.appspot.com",
  messagingSenderId: "1014628289771",
  appId: "1:1014628289771:web:a660bd69d53ea6811b02ae",
  measurementId: "G-4TS59TJPFR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const storage = getStorage(app);
export const db = getFirestore(app);