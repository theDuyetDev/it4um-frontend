import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCCA89KHYo0s9N7QnH3fUgJGxfOxTvsgGg",
  authDomain: "it4um-e8e1d.firebaseapp.com",
  projectId: "it4um-e8e1d",
  storageBucket: "it4um-e8e1d.appspot.com",
  messagingSenderId: "803328663413",
  appId: "1:803328663413:web:4b0431fb33c3e63cef7d3c",
  measurementId: "G-DY7MXXR2F9",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
