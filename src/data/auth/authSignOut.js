import { signOut } from "firebase/auth";
import { firebaseAuth } from "../firebaseConfig"; 
import toast from "react-hot-toast";

const handleSignOut = async () => {
  try {
    await signOut(firebaseAuth); 
    toast.success("Successfully signed out!"); 
  } catch (error) {
    console.error("Error signing out: ", error); 
    toast.error("Failed to sign out, please try again!");
  }
};
export { handleSignOut };
