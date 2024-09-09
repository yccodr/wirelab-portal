import { Button } from "@/components/ui/button";
import { firebaseAuth, useUser } from "@/lib/firebase/auth";
import { createFileRoute } from "@tanstack/react-router";
import { signOut } from "firebase/auth";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { user, isLoggedIn, isLoading, signInWithGoogle } = useUser();

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="container mx-auto flex flex-col place-items-center justify-start">
      {isLoggedIn ? (
        <>
          <Button onClick={() => signOut(firebaseAuth)}>Sign Out</Button>

          <div>Signed In as {user?.email}</div>
        </>
      ) : (
        <Button onClick={signInWithGoogle}>Sign In</Button>
      )}
    </div>
  );
}
