import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseAuth, firebaseFirestore } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log("Google access token:", token);
    const user = result.user;

    // Reference to the Firestore document
    const userRef = doc(firebaseFirestore, "users", user.uid);

    // Fetch existing user data from Firestore
    const userSnapshot = await getDoc(userRef);

    let favoritesIds = [];

    if (userSnapshot.exists()) {
      // If the user already exists, retrieve their favorites list
      const userData = userSnapshot.data();
      favoritesIds = userData.favoritesIds || []; // Get favorites list if it exists, otherwise an empty array
    }

    // Save or update user data in Firestore
    await setDoc(
      userRef,
      {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL || null, // In case there's no photoURL
        favoritesIds, // Use the existing favoritesIds list
      },
      { merge: true } // Merge with existing data to avoid overwriting
    );
  } catch (error) {
    console.error("Error during Google sign-in", error);
    throw error;
  }
};

export { loginWithGoogle };
