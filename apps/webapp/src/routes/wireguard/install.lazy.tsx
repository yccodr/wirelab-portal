import { Button } from "@repo/ui/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export const Route = createLazyFileRoute("/wireguard/install")({
  component: WireguardInstall,
});

function WireguardInstall() {
  return (
    <div className="flex-1 sm:px-36 px-6 place-content-center">
      <div className="flex flex-col gap-4 py-36">
        <h1 className="text-3xl font-bold mb-1">步驟 1: 安裝 Wireguard</h1>

        <Tabs defaultValue="windows" className="w-full h-[20ch]">
          <TabsList>
            <TabsTrigger value="windows">Windows</TabsTrigger>
            <TabsTrigger value="macos">macOS</TabsTrigger>
            <TabsTrigger value="linux">Linux</TabsTrigger>
          </TabsList>

          <TabsContent value="windows">
            <ol className="list-decimal list-inside flex flex-col gap-2 py-6">
              <li>
                前往{" "}
                <a
                  href="https://www.wireguard.com/install/"
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wireguard 官方網站
                </a>
              </li>
              <li>下載並執行 Windows 安裝程式</li>
              <li>按照指示完成安裝</li>
            </ol>
          </TabsContent>

          <TabsContent value="macos">
            <ol className="list-decimal list-inside flex flex-col gap-2 py-6">
              <li>打開 App Store</li>
              <li>搜尋 "WireGuard"</li>
              <li>安裝 !</li>
            </ol>
          </TabsContent>

          <TabsContent value="linux" className="py-6 flex flex-col gap-2">
            <p>打開 Terminal 並執行以下命令：</p>
            <pre className="bg-gray-100 p-2 rounded mt-2">
              <code className="monospace px-2 py-1">
                sudo apt update && sudo apt install wireguard
              </code>
            </pre>

            <p className="mt-4">安裝完成後，就可以進行下一步了。</p>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-8">
          <Link to="/wireguard">
            <Button variant="outline">
              <ChevronLeftIcon className="mr-2 w-4 h-4" />
              返回
            </Button>
          </Link>
          <Link to="/wireguard/download-config">
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
