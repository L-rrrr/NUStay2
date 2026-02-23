import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdSu1UzGJy9CXq0w2m7ra8xc3ilUTQ6d8",
  authDomain: "auth-development-6bbed.firebaseapp.com",
  projectId: "auth-development-6bbed",
  storageBucket: "auth-development-6bbed.appspot.com",
  messagingSenderId: "575025763009",
  appId: "1:575025763009:web:3d3bf8b3a3ac59290d7a40",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
