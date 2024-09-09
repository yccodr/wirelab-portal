import { signOut } from "firebase/auth";
import { Button } from "./ui/button";
import { firebaseAuth } from "@/lib/firebase/auth";

function Header() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between bg-background p-4 w-screen">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold">Wirelab Orientation</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          className="text-lg font-bold"
          type="button"
          variant="link"
          onClick={() => signOut(firebaseAuth)}
        >
          登出
        </Button>
      </div>
    </div>
  );
}

export default Header;
