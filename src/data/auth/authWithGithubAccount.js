import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { firebaseAuth, firebaseFirestore } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const githubProvider = new GithubAuthProvider();

const loginWithGitHub = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, githubProvider);

    const user = result.user;

    // Save user data in Firestore or use it as needed
    await setDoc(
      doc(firebaseFirestore, "users", user.uid),
      {
        id: user.uid,
        name: user.displayName || user.email.split("@")[0],
        email: user.email,
        image: user.photoURL || null, // In case there's no photoURL
        favoritesIds: [], // empty array for favorites ids
      },
      { merge: true }
    ); // Merge and overwriting existing data

    console.log("User successfully logged in with GitHub:", user);
    return user;
  } catch (error) {
    console.error("Error during GitHub sign-in", error);
    throw error; // Let your app handle the error appropriately
  }
};

export { loginWithGitHub };
