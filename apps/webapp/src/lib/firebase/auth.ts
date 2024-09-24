import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { firebaseApp } from "./init";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "@repo/ui/hooks/use-toast";

const firebaseAuth = getAuth(firebaseApp);
const googleAuthProvider = new GoogleAuthProvider();

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setIsLoading(false);

      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const signInWithGoogle = useCallback(() => {
    signInWithPopup(firebaseAuth, googleAuthProvider)
      .then((result) => {
        console.log(result.user.email);
      })
      .catch((error) => {
        if (error.code === "auth/admin-restricted-operation") {
          toast({
            title: "Error",
            description: "This account is not allowed to sign in",
            variant: "destructive",
          });

          return;
        }

        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      });
  }, []);

  return {
    signInWithGoogle,
    user,
    isLoggedIn: !!user,
    isLoading,
  };
};

export { firebaseAuth, useUser };
