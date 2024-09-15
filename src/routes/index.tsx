import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/firebase/auth";
import { useGreeting } from "@/hooks/use-greeting";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/")({
  component: Index,
});

function SignedIn() {
  const { isLoading, greeting } = useGreeting();

  return (
    <div className="flex flex-col container">
      {isLoading ? (
        <Skeleton className="h-10 w-[32ch]" />
      ) : (
        <h1 className="text-4xl font-semibold mb-8">{greeting}</h1>
      )}

      <Link to="/wireguard">
        <Button variant="ghost" className="w-full justify-start text-lg py-5">
          設定 VPN
        </Button>
      </Link>

      <Link to="/vm">
        <Button variant="ghost" className="w-full justify-start text-lg py-5">
          設定 VM
        </Button>
      </Link>
    </div>
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
