import DownloadConfigBtn from "@/components/download-config-btn";
import { Button } from "@repo/ui/components/ui/button";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export const Route = createLazyFileRoute("/wireguard/download-config")({
  component: WireguardDownloadConfig,
});

function WireguardDownloadConfig() {
  return (
    <div className="flex-1 sm:p-36 p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-1">
          步驟 2: 下載 Wireguard 配置文件
        </h1>

        <div className="flex flex-col gap-4 items-start">
          <h2 className="text-xl font-semibold">下載說明</h2>
          <DownloadConfigBtn />

          <div className="bg-yellow-100 border-l-4 self-stretch border-yellow-500 text-yellow-700 p-4 mt-4">
            <p className="font-bold">注意：</p>
            <p>配置文件包含連線金鑰等資訊。請不要與他人分享，並妥善保存。</p>
          </div>

          <p className="mt-4">獲得配置文件後，就可以進行下一步了。</p>
        </div>

        <div className="flex justify-between mt-8">
          <Link to="/wireguard/install">
            <Button variant="outline">
              <ChevronLeftIcon className="mr-2 w-4 h-4" />
              上一步
            </Button>
          </Link>
          <Link to="/wireguard/add-config">
            <Button>
              下一步
              <ChevronRightIcon className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
