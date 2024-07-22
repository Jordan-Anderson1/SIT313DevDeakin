import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQoVxpkaNDZq1x1xH4dpRucNzjfC6j_uM",
  authDomain: "devatdeakin.firebaseapp.com",
  projectId: "devatdeakin",
  storageBucket: "devatdeakin.appspot.com",
  messagingSenderId: "405770364721",
  appId: "1:405770364721:web:ea33d9561a5fae059f3210",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

//create a new firestore collection using the UID as the collection reference. Add email and name to document.
export const createDocForNewUser = async (name, email, uid) => {
  await setDoc(doc(db, "users", uid), {
    name: name,
    email: email,
  });
};

// get data for logged in user
export const getFirestoreData = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log(docSnap.data());
  }
  return docSnap.data();
};

export default app;
