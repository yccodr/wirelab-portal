import Header from "@/components/header";
import { useUser } from "@/lib/firebase/auth";
import { Button } from "@repo/ui/components/ui/button";
import { Toaster } from "@repo/ui/components/ui/toaster";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const { isLoading, isLoggedIn } = useUser();

  return (
    <>
      {isLoading || isLoggedIn ? (
        <div className="flex flex-col container mx-auto px-6 sm:px-8 lg:px-12 py-8 w-full">
          <Header />
          <Outlet />
        </div>
      ) : (
        <LoginBanner />
      )}
      <Toaster />
    </>
  );
}

function LoginBanner() {
  const { signInWithGoogle } = useUser();

  return (
    <div className="grid grid-cols-2 h-full px-20 place-items-center gap-4">
      <h1 className="text-4xl font-bold">Wirelab Portal</h1>
      <Button
        className="hover:font-bold text-2xl group"
        variant="link"
        onClick={signInWithGoogle}
      >
        登入
        <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}
