import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firebaseAuth, firebaseFirestore } from "../firebaseConfig";

//! user collection will have
/*
id 
name 
email
image 
favoritesIds []
*/

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("User in register with email and password:", user);

    // Update the user's display name
    await updateProfile(user, {
      displayName: name,
    });

    // Create user document in Firestore
    await setDoc(doc(firebaseFirestore, "users", user.uid), {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      image: user.photoURL || null, // In case there's no photoURL
      favoritesIds: [], // empty array for favorites ids
    });

    console.log("User profile and Firestore document created successfully");
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        console.error("Email is already in use");
        break;
      case "auth/weak-password":
        console.error("Password is too weak");
        break;
      default:
        console.error(
          "Error in register with email and password:",
          error.message
        );
    }
  }
};

const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("User in login with email and password:", user);


} catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        console.error("Email is already in use");
        break;
      case "auth/weak-password":
        console.error("Password is too weak");
        break;
      default:
        console.error(
          "Error in register with email and password:",
          error.message
        );
    }
  }
};

export { registerWithEmailAndPassword, loginWithEmailAndPassword };
