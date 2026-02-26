import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCYbCwRNU5iGsCf0Z9fVixXXy7c9w4_vRU",
  authDomain: "nustay-538d9.firebaseapp.com",
  projectId: "nustay-538d9",
  storageBucket: "nustay-538d9.appspot.com",
  messagingSenderId: "554847025667",
  appId: "1:554847025667:web:ca9d04680d5e087b79ec36",
  measurementId: "G-HYJZQH604N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// Initialize storage with explicit bucket URI to avoid bucket name resolution issues
const storage = getStorage(app, 'gs://nustay-538d9.appspot.com');
const analytics = getAnalytics(app);

export { app, auth, db, storage, analytics };