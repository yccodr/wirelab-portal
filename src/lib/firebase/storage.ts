import { getStorage } from "firebase/storage";
import { firebaseApp } from "./init";

const storage = getStorage(firebaseApp);

export { storage };
