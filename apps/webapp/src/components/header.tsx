import { signOut } from "firebase/auth";
import { Button } from "@repo/ui/components/ui/button";
import { firebaseAuth, useUser } from "@/lib/firebase/auth";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { cn } from "@repo/ui/lib/utils";
import { Link } from "@tanstack/react-router";

function Header() {
  const { isLoggedIn, isLoading, signInWithGoogle } = useUser();

  return (
    <div className="sticky top-0 z-50 container mx-auto flex items-center justify-between bg-background mb-8">
      <div className="flex items-center gap-2">
        <Link to="/">
          <span className="text-2xl font-bold">Wirelab Portal</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Button
          className="relative"
          variant="ghost"
          onClick={isLoggedIn ? () => signOut(firebaseAuth) : signInWithGoogle}
        >
          <div
            className={cn(
              "flex items-center gap-2 absolute left-0 w-full px-3 invisible",
              { visible: isLoading }
            )}
          >
            <Skeleton className="w-full h-4" />
          </div>
          <span className={cn({ "opacity-0": isLoading })}>
            {isLoggedIn ? "登出" : "登入"}
          </span>
        </Button>
      </div>
    </div>
  );
}

export default Header;
