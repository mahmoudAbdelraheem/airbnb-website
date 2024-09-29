import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../data/firebaseConfig";

import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import Navbar from "../components/navbar/Navbar";
import ToasterProvider from "../providers/ToasterProvider";
import Logo from "../components/navbar/Logo";

function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      // Set the current user when auth state changes
      setCurrentUser(user);
      console.log("current user data", user);
      setLoading(false);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div
        className="
      h-screen
      w-screen
      flex 
      items-center 
      justify-center
      "
      >
        <Logo />
      </div>
    );
  }

  return (
    <>
      <ToasterProvider />
      <RegisterModal />
      <LoginModal />
      <Navbar user={currentUser} />
    </>
  );
}

export default Home;
