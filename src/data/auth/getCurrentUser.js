import { getAuth, onAuthStateChanged } from "firebase/auth";

const getCurrentUser = async () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      },
      reject
    );
  });
};

export default getCurrentUser;
