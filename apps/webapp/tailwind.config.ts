import sharedConfig from "@repo/ui/tailwind.config.ts";
import { Config } from "tailwindcss";

export default {
  presets: [sharedConfig],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
} satisfies Config;
