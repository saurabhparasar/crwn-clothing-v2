import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAydMESn_EOpvRFc4qw9gicpCyBccwv2RY",
  authDomain: "crwn-db-7e595.firebaseapp.com",
  projectId: "crwn-db-7e595",
  storageBucket: "crwn-db-7e595.appspot.com",
  messagingSenderId: "187135201874",
  appId: "1:187135201874:web:088cf4ef1d853a99fe458b",
  measurementId: "G-SDX3WKM5G3",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (
  userAuth,
  additionlInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionlInformation,
      });
    } catch (error) {
      console.log("there is an error creating the user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(auth, email, password);
};
