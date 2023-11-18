import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyC9bkvdP3hefm-SYQWqliilXAVHdsa6q0A",
    authDomain: "jcetportal.firebaseapp.com",
    projectId: "jcetportal",
    storageBucket: "jcetportal.appspot.com",
    messagingSenderId: "514762273035",
    appId: "1:514762273035:web:2e4f88cc03eaa811d6f20e"
  };



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); 
const auth = getAuth(app);
export { app, auth, db ,storage};
