import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAmFalt91lCY65KETJTeNxXI9q_QIbIjaY",
  authDomain: "book-manager-app-cb4e0.firebaseapp.com",
  projectId: "book-manager-app-cb4e0",
  storageBucket: "book-manager-app-cb4e0.firebasestorage.app",
  messagingSenderId: "5184069874",
  appId: "1:5184069874:web:5698dd38cc0540f4f4306b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };