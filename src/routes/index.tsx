import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/firebase/auth";

export const Route = createFileRoute("/")({
  component: Index,
});

function SignedIn() {
  return (
    <>
      <Link to="/wireguard">
        <Button variant="link">設定 VPN</Button>
      </Link>
    </>
  );
}

function Index() {
  const { isLoggedIn, isLoading, signInWithGoogle } = useUser();

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="container mx-auto flex flex-col place-items-center justify-start">
      {isLoggedIn ? (
        <SignedIn />
      ) : (
        <Button onClick={signInWithGoogle}>請先登入</Button>
      )}
    </div>
  );
}
