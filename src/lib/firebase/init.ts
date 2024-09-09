import { initializeApp } from "firebase/app";
import FirebaseConfig from "../../../config/firebase.json";

const firebaseApp = initializeApp(FirebaseConfig);

export { firebaseApp };
