import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseAuth, firebaseFirestore } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log("Google access token:", token);
    const user = result.user;

    // Save user data in Firestore or use it as needed
    await setDoc(
      doc(firebaseFirestore, "users", user.uid),
      {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL || null, // In case there's no photoURL
        favoritesIds: [], // empty array for favorites ids
      },
      { merge: true }
    ); // Merge and overwriting existing data
  } catch (error) {
    console.error("Error during Google sign-in", error);
    throw error;
  }
};

export { loginWithGoogle };
