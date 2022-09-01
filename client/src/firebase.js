import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDG2hbyKeb4L_8-0HqldEWVhVyv9jOikVI",
  authDomain: "video-1bb0a.firebaseapp.com",
  projectId: "video-1bb0a",
  storageBucket: "video-1bb0a.appspot.com",
  messagingSenderId: "727087247858",
  appId: "1:727087247858:web:4f7cf43423e73f0eebbb6b",
};

const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export default app;
