import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { getBlob, getDownloadURL, ref } from "firebase/storage";
import type { User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/lib/firebase/auth";
import { storage } from "@/lib/firebase/storage";

export const Route = createFileRoute("/")({
  component: Index,
});

const wireguardConfigUrl = (user: User) => {
  const configFileRef = ref(storage, `${user.uid}.conf`);
  return getDownloadURL(configFileRef);
};

function SignedIn() {
  const { user } = useUser();
  const { toast } = useToast();
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user === null) {
      return;
    }

    wireguardConfigUrl(user).then((url) => {
      setUrl(url);
      setIsLoading(false);
    });
  }, [user]);

  if (user === null) {
    return <></>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (url === null) {
    return <></>;
  }

  const downloadWireguardFile = () => {
    toast({
      title: "下載中...",
    });

    const configFileRef = ref(storage, `${user.uid}.conf`);
    getBlob(configFileRef).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `wirelab.conf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  return (
    <>
      <Button type="button" onClick={downloadWireguardFile}>
        Download Wireguard Config
      </Button>
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
        <Button onClick={signInWithGoogle}>Sign In</Button>
      )}
    </div>
  );
}
