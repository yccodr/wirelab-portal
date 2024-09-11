import { Button } from "@/components/ui/button";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeftIcon, HomeIcon } from "lucide-react";

export const Route = createLazyFileRoute("/wireguard/test-connection")({
  component: WireguardTestConnection,
});

function WireguardTestConnection() {
  return (
    <div className="flex-1 sm:p-36 p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-1">步驟 5: 測試連接</h1>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">測試說明</h2>
          <p>請按照以下步驟測試你的 VPN 連線：</p>

          <ol className="list-decimal list-inside pl-4 space-y-2">
            <li>打開命令提示字元（Windows）或終端機（macOS/Linux）</li>
            <li>
              輸入以下指令來 ping 實驗室的內部伺服器：
              <pre className="bg-gray-100 p-2 rounded mt-2">
                <code>ping 10.216.0.1</code>
              </pre>
            </li>
            <li>如果有收到回覆，則表示 VPN 連接成功</li>
          </ol>

          <p className="mt-4">恭喜！你已經成功連上內網了 🎉</p>
        </div>

        <div className="flex justify-between mt-8">
          <Link to="/wireguard/activate-tunnel">
            <Button variant="outline">
              <ChevronLeftIcon className="mr-2 w-4 h-4" />
              上一步
            </Button>
          </Link>
          <Link to="/">
            <Button>
              完成
              <HomeIcon className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
