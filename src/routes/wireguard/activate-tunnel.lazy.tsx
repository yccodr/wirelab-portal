import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export const Route = createLazyFileRoute("/wireguard/activate-tunnel")({
  component: WireguardActivateTunnel,
});

function WireguardActivateTunnel() {
  return (
    <div className="flex-1 sm:px-36 px-6 place-content-center">
      <div className="flex flex-col gap-4 py-36">
        <h1 className="text-3xl font-bold mb-1">步驟 4: 啟動 VPN 隧道</h1>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">啟動說明</h2>
          <p>請根據您的操作系統選擇相應的方法來啟動 VPN 隧道：</p>

          <Tabs defaultValue="windows" className="w-full">
            <TabsList>
              <TabsTrigger value="windows">Windows</TabsTrigger>
              <TabsTrigger value="macos">macOS</TabsTrigger>
              <TabsTrigger value="linux">Linux</TabsTrigger>
            </TabsList>

            <TabsContent value="windows">
              <ol className="list-decimal list-inside pl-4 mt-4 space-y-2">
                <li>打開 WireGuard 應用程序</li>
                <li>在列表中選擇您剛才添加的配置</li>
                <li>點擊 "啟動" 或 "激活" 按鈕來啟動 VPN 連接</li>
              </ol>

              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4">
                <p className="font-bold">提示：</p>
                <p>
                  成功連接後，您應該會在應用程序中看到連接狀態變為 "已連接" 或
                  "活動"。
                </p>
              </div>
            </TabsContent>

            <TabsContent value="macos">
              <ol className="list-decimal list-inside pl-4 mt-4 space-y-2">
                <li>打開 WireGuard 應用程序</li>
                <li>在列表中選擇您剛才添加的配置</li>
                <li>點擊 "啟動" 或 "激活" 按鈕來啟動 VPN 連接</li>
              </ol>

              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4">
                <p className="font-bold">提示：</p>
                <p>
                  成功連接後，您應該會在應用程序中看到連接狀態變為 "已連接" 或
                  "活動"。
                </p>
              </div>
            </TabsContent>

            <TabsContent value="linux">
              <ol className="list-decimal list-inside pl-4 mt-4 space-y-2">
                <li>打開終端</li>
                <li>
                  運行以下命令來啟動 VPN 連接：
                  <pre className="bg-gray-100 p-2 rounded mt-2">
                    <code>
                      sudo wg-quick up {"<tunnel-name>"}
                      <br />
                      <span className="text-gray-500">
                        # 將 {"<tunnel-name>"} 替換為實際的隧道名稱
                      </span>
                    </code>
                  </pre>
                </li>
              </ol>
            </TabsContent>
          </Tabs>

          <p className="mt-4">
            VPN 隧道啟動後，您就可以進行最後一步來測試連接了。
          </p>
        </div>

        <div className="flex justify-between mt-8">
          <Link to="/wireguard/add-config">
            <Button variant="outline">
              <ChevronLeftIcon className="mr-2 w-4 h-4" />
              上一步
            </Button>
          </Link>
          <Link to="/wireguard/test-connection">
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
