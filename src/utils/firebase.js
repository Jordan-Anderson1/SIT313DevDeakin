import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

export default app;
