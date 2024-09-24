import { createLazyFileRoute } from "@tanstack/react-router";
import { CircleAlert } from "lucide-react";

export const Route = createLazyFileRoute("/vm/ssh-setup")({
  component: VMSSHSetup,
});

function VMSSHSetup() {
  return (
    <div className="flex-1 sm:p-36 p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-1">設定 SSH 連線金鑰</h1>

        <blockquote className="bg-yellow-100 border-l-4 self-stretch border-yellow-500 text-yellow-700 p-4 mt-4">
          <p className="font-bold">注意：</p>
          <p>配置文件包含連線金鑰等資訊。請不要與他人分享，並妥善保存。</p>
        </blockquote>

        <blockquote className="bg-red-100 border-l-4 flex flex-col gap-2 py-5 px-5 self-stretch border-red-500 text-red-700 p-4 mt-4">
          <CircleAlert width={20} height={20} />
          <p className="font-semibold">This Page is Under Construction</p>
        </blockquote>
      </div>
    </div>
  );
}
