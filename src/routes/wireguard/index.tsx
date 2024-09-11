import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRightIcon } from "lucide-react";
import DownloadConfigBtn from "../../components/download-config-btn";

export const Route = createFileRoute("/wireguard/")({
  component: WireguardIndex,
});

const steps = [
  { title: "安裝 Wireguard", path: "/wireguard/install" },
  { title: "下載 Wireguard 配置文件", path: "/wireguard/download-config" },
  { title: "添加配置文件", path: "/wireguard/add-config" },
  { title: "啟動 VPN 隧道", path: "/wireguard/activate-tunnel" },
  { title: "測試連接（Ping 伺服器）", path: "/wireguard/test-connection" },
];

function WireguardIndex() {
  return (
    <div className="flex-1 sm:px-36 px-6 place-content-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-1">Wireguard VPN</h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            實驗室有些放在內網的服務(VM 等等)，需要透過 VPN 來連接。
            <br />
            接下來我們會介紹如何安裝 Wireguard VPN 並連接到實驗室的 VPN。
          </div>

          <ol className="list-decimal list-inside space-y-2 mt-4">
            {steps.map((step, index) => (
              <li key={index}>
                <Link to={step.path} className="hover:underline">
                  {step.title}
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-row gap-4 items-start mt-8">
          <Link to={steps[0].path}>
            <Button>
              開始安裝
              <ChevronRightIcon className="ml-2 w-4 h-4" />
            </Button>
          </Link>

          <DownloadConfigBtn />
        </div>
      </div>
    </div>
  );
}
