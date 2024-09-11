import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export const Route = createLazyFileRoute("/wireguard/add-config")({
  component: WireguardAddConfig,
});

function WireguardAddConfig() {
  return (
    <div className="flex-1 sm:p-36 p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-1">步驟 3: 添加配置文件</h1>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">添加配置說明</h2>

          <Tabs defaultValue="windows">
            <TabsList>
              <TabsTrigger value="windows">Windows</TabsTrigger>
              <TabsTrigger value="macos">macOS</TabsTrigger>
              <TabsTrigger value="linux">Linux</TabsTrigger>
            </TabsList>

            <TabsContent value="windows">
              <ol className="list-decimal list-inside pl-4 space-y-2">
                <li>打開 WireGuard 應用程式</li>
                <li>點選 "導入隧道" 或 "添加隧道" 按鈕</li>
                <li>瀏覽並選擇下載的配置文件（通常是 .conf 文件）</li>
                <li>按下 "確定" 或 "導入" 來添加配置</li>
              </ol>
            </TabsContent>

            <TabsContent value="macos">
              <ol className="list-decimal list-inside pl-4 space-y-2">
                <li>打開 WireGuard 應用程式</li>
                <li>點擊 "文件" 選單，然後選擇 "導入隧道"</li>
                <li>選擇您下載的配置文件</li>
                <li>點擊 "導入" 來添加配置</li>
              </ol>
            </TabsContent>

            <TabsContent value="linux">
              <ol className="list-decimal list-inside pl-4 space-y-2">
                <li>
                  將下載的配置文件複製到{" "}
                  <code className="bg-gray-100 p-1 rounded">
                    /etc/wireguard/
                  </code>{" "}
                  目錄
                </li>
                <li>
                  使用以下命令設置正確的權限：
                  <pre className="bg-gray-100 p-2 rounded mt-2">
                    <code className="monospace px-2 py-1">
                      sudo chown root:root /etc/wireguard/{"<tunnel-name>"}.conf
                      <br />
                      sudo chmod 600 /etc/wireguard/{"<tunnel-name>"}.conf
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

          <p className="mt-4">添加配置文件後，就可以進行下一步了。</p>
        </div>

        <div className="flex justify-between mt-8">
          <Link to="/wireguard/download-config">
            <Button variant="outline">
              <ChevronLeftIcon className="mr-2 w-4 h-4" />
              上一步
            </Button>
          </Link>
          <Link to="/wireguard/activate-tunnel">
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
