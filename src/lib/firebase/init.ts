import { initializeApp } from "firebase/app";
import FirebaseConfig from "../../../secret/firebase.json";

const firebaseApp = initializeApp(FirebaseConfig);

export { firebaseApp };
