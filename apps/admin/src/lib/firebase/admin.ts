import {
  type ServiceAccount,
  cert,
  getApp,
  initializeApp,
} from "firebase-admin/app";
import firebaseServiceAccount from "../../../secret/firebase-service-account.json";

const getFirebaseAdminApp = () => {
  try {
    return getApp();
  } catch {
    return initializeApp({
      credential: cert(firebaseServiceAccount as ServiceAccount),
      storageBucket: "wirelab-orientation.appspot.com",
    });
  }
};

export { getFirebaseAdminApp };
