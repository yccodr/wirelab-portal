import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firestore } from "@/lib/firebase/firestore";

export const useGreeting = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      let greetingRef;

      if (user) {
        greetingRef = doc(firestore, "users", user.uid);
      }

      try {
        if (greetingRef === undefined) {
          setGreeting(user ? `嗨! ${user.displayName || "User"}` : "Welcome!");
          return;
        }

        const greetingDoc = await getDoc(greetingRef);
        if (greetingDoc.exists()) {
          setGreeting(greetingDoc.data().greeting);
        } else {
          setGreeting(user ? `嗨! ${user.displayName || "User"}` : "Welcome!");
        }
      } catch (error) {
        console.error("Error fetching greeting:", error);
        setGreeting("Hello!");
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { isLoading, greeting };
};
