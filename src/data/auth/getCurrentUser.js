import { firebaseAuth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const getCurrentUser = async () => {
   try {
    const user = await onAuthStateChanged(firebaseAuth);
    console.log('user in get current user: ', user);
    return user;
   } catch (error) {
    console.log('error in get current user: ', error);
    return null;
   }
};

export default getCurrentUser;