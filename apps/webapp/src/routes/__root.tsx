import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex flex-col container mx-auto px-6 sm:px-8 lg:px-12 py-8 w-full">
        <Header />
        <Outlet />
      </div>
      <Toaster />
    </>
  ),
});
