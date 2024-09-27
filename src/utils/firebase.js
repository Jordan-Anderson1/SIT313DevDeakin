import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";

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

export const getHiddenQuestions = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    return docSnap.data().hiddenQuestions || [];
  } catch (e) {
    console.log(e.message);
  }
};

//get all articles from firebase
export const getArticleData = async () => {
  try {
    const articlesSnapshot = await getDocs(collection(db, "articles"));
    const articles = await Promise.all(
      articlesSnapshot.docs.map(async (doc) => {
        const imageUrl = await getArticleImage(doc.id);
        return { ...doc.data(), id: doc.id, imageSource: imageUrl };
      }),
    );
    return articles;
  } catch (error) {
    console.error("Error getting article data:", error);
    throw new Error("Failed to fetch article data");
  }
};

//get all questions from firebase
export const getQuestionData = async () => {
  try {
    const questionSnapshot = await getDocs(collection(db, "questions"));
    const questionsList = questionSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return questionsList;
  } catch (e) {
    console.log(e.message);
  }
};

export const getArticleImage = async (uuid) => {
  const storage = getStorage();
  const imageRef = ref(storage, `images/${uuid}`);
  const url = await getDownloadURL(imageRef);
  return url;
};

//adds new article data to firebase
export const addNewArticle = async (
  uuid,
  tags,
  title,
  abstract,
  text,
  author,
) => {
  await setDoc(doc(db, "articles", uuid), {
    tags: tags,
    title: title,
    abstract: abstract,
    text: text,
    author: author,
    ratings: [],
    usersWhoRatedArticle: [],
  });
};

//add new question to database
export const addNewQuestion = async (
  uuid,
  title,
  description,
  tags,
  author,
  date,
) => {
  await setDoc(doc(db, "questions", uuid), {
    title: title,
    description: description,
    tags: tags,
    author: author,
    comments: [],
    uploadDate: date,
  });
};

//upload image to database with uuid corresponding to article uuid
export const uploadImage = async (uuid, image) => {
  const imgRef = ref(imageDb, `images/${uuid}`);
  uploadBytes(imgRef, image);
};

export const updateArticleRating = async (id, rating) => {
  const articleRef = doc(db, "articles", id);

  try {
    const articleSnap = await getDoc(articleRef);
    const data = articleSnap.data();
    const ratings = data.ratings;
    ratings.push(rating);

    await updateDoc(articleRef, { ratings: ratings });
  } catch (e) {
    console.log(e.message);
  }
};

//add comment to question
export const addCommentToQuestion = async (questionId, newComment) => {
  const questionRef = doc(db, "questions", questionId);

  try {
    const questionSnap = await getDoc(questionRef);

    const data = questionSnap.data();
    const comments = data.comments;
    comments.push(newComment);
    await updateDoc(questionRef, { comments: comments });
  } catch (e) {
    console.log(e.message);
  }
};

export const getUsersWhoRatedArticle = async (articleId) => {
  const articleRef = doc(db, "articles", articleId);

  try {
    const articleSnap = await getDoc(articleRef);
    const data = articleSnap.data();
    const users = data.usersWhoRatedArticle || [];
    return users;
  } catch (e) {
    console.log(e.message);
  }
};

export const addUserToRatingList = async (articleId, userId) => {
  const articleRef = doc(db, "articles", articleId);

  try {
    await updateDoc(articleRef, { usersWhoRatedArticle: arrayUnion(userId) });
  } catch (e) {
    console.log(e.message);
  }
};

export const hideQuestion = async (questionId, userId) => {
  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, { hiddenQuestions: arrayUnion(questionId) });
  } catch (e) {
    console.log(e.message);
  }
};

export const unhideQuestion = async (questionId, userId) => {
  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, { hiddenQuestions: arrayRemove(questionId) });
  } catch (e) {
    console.log(e.message);
  }
};

export const resetPassword = async (email) => {
  try {
    sendPasswordResetEmail(auth, email);
  } catch (e) {
    console.log(e.message);
  }
};

export const imageDb = getStorage(app);

export default app;
