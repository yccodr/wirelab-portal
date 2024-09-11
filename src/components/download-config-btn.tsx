import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/lib/firebase/auth";
import { storage } from "@/lib/firebase/storage";
import { User } from "firebase/auth";
import { getBlob, getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

const wireguardConfigUrl = (user: User) => {
  const configFileRef = ref(storage, `${user.uid}.conf`);
  return getDownloadURL(configFileRef);
};

function DownloadConfigBtn() {
  const { toast } = useToast();
  const { user } = useUser();
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

  const downloadWireguardFile = () => {
    if (user === null) {
      console.error("User is null");
      return;
    }

    if (url === null) {
      console.error("URL is null");
      return;
    }

    toast({
      title: "下載中...",
      duration: 1500,
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
    <Button
      className="relative"
      variant="outline"
      onClick={downloadWireguardFile}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="absolute left-0 w-full h-full px-4 flex items-center justify-center">
          <Skeleton className="w-full h-4" />
        </div>
      ) : null}
      <span className={cn({ "opacity-0": isLoading })}>
        下載 Wireguard 配置文件
      </span>
    </Button>
  );
}

export default DownloadConfigBtn;
