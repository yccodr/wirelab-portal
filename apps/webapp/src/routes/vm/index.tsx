import DownloadSshKeyBtn from "@/components/download-ssh-key-btn";
import { Button } from "@repo/ui/components/ui/button";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { firebaseAuth } from "@/lib/firebase/auth";
import { firestore } from "@/lib/firebase/firestore";
import { createFileRoute, Link } from "@tanstack/react-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { Label } from "@repo/ui/components/ui/label";
import { stripSubnet } from "@/lib/utils";

export const Route = createFileRoute("/vm/")({
  component: VMIndex,
});

const useVMConfig = () => {
  const [config, setConfig] = useState<{
    ip: string;
    user: string;
    name: string;
  }>();
  const [multiConfig, setMultiConfig] = useState<
    {
      ip: string;
      user: string;
      name: string;
    }[]
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      let userRef;

      if (user) {
        userRef = doc(firestore, "users", user.uid);
      }

      try {
        if (userRef === undefined) {
          setConfig(undefined);
          return;
        }

        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setConfig(userDoc.data().vm);
          setMultiConfig(userDoc.data().vms);
          setIsError(false);
        } else {
          setConfig(undefined);
          setMultiConfig(undefined);
          setIsError(true);
        }
      } catch (error) {
        console.error("Error fetching greeting:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { config, multiConfig, isLoading, isError };
};

function VMConfig() {
  const { config, multiConfig, isLoading, isError } = useVMConfig();

  if (isLoading) {
    return (
      <>
        <ul className="mt-8 flex flex-col gap-1 mb-8">
          <li>
            <Skeleton className="w-[15ch] h-4 my-1" />
          </li>
          <li>
            <Skeleton className="w-[21ch] h-4 my-1" />
          </li>
          <li>
            <Skeleton className="w-[21ch] h-4 my-1" />
          </li>
        </ul>
        <div>
          <Label className="px-1 font-bold">Command</Label>
          <code className="flex flex-col gap-1 mb-8 bg-gray-900 dark:bg-gray-60 px-4 py-2 rounded-md text-white">
            <Skeleton className="w-full h-4 my-1 bg-gray-600/80" />
          </code>
        </div>
      </>
    );
  }

  if (isError || config === undefined) {
    return <div>無法取得 VM 資訊</div>;
  }

  return (
    <>
      <ul className="mt-8 flex flex-col gap-1 mb-8">
        <li>名稱：{config.name}</li>
        <li>User Name: {config.user}</li>
        <li>IP 位址：{config.ip}</li>
      </ul>

      <div>
        <Label className="px-1 font-bold">Command</Label>
        <code className="flex flex-col gap-1 mb-8 bg-gray-900 dark:bg-gray-60 px-4 py-2 rounded-md text-white">
          ssh -i vm-key {config.user}@{stripSubnet(config.ip)}
        </code>
      </div>

      {multiConfig &&
        multiConfig.map((c, index) => (
          <Fragment key={`vm-${index}`}>
            <ul className="mt-8 flex flex-col gap-1 mb-8">
              <li>名稱：{c.name}</li>
              <li>User Name: {c.user}</li>
              <li>IP 位址：{c.ip}</li>
            </ul>

            <div>
              <Label className="px-1 font-bold">Command</Label>
              <code className="flex flex-col gap-1 mb-8 bg-gray-900 dark:bg-gray-60 px-4 py-2 rounded-md text-white">
                ssh -i vm-key {c.user}@{stripSubnet(c.ip)}
              </code>
            </div>
          </Fragment>
        ))}
    </>
  );
}

function VMIndex() {
  return (
    <div>
      <h1 className="text-4xl font-semibold mb-2">設定 VM</h1>
      <p>實驗室每個人會分配到一個 VM，下面是關於你 VM 的資訊。</p>

      <VMConfig />

      <div className="flex flex-row gap-4">
        <DownloadSshKeyBtn />
        <Link to="/vm/ssh-setup">
          <Button variant="outline">如何設定 SSH 連線</Button>
        </Link>
      </div>
    </div>
  );
}
