import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";




 
    const firebaseConfig = {
      apiKey: "AIzaSyBesr6Nr0b-CSiYXpUPppSAbsdyRAdlqIM",
      authDomain: "costumer-management.firebaseapp.com",
      databaseURL: "https://costumer-management-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "costumer-management",
      storageBucket: "costumer-management.appspot.com",
      messagingSenderId: "638093805900",
      appId: "1:638093805900:web:693ca643fe63c785d727e9",
      measurementId: "G-S5H0L5BQN9"
    };
  
  
    

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
export default database;
