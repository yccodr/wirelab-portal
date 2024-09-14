import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "./init";

const firestore = getFirestore(firebaseApp);

export { firestore };
