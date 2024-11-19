import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
    "./node_modules/@nextui-org/theme/dist/components/(autocomplete|button|checkbox|date-picker|dropdown|input|navbar|popover|radio|tabs|ripple|spinner|listbox|divider|scroll-shadow|calendar|date-input|menu).js"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [nextui(), require('flowbite/plugin'),flowbite.plugin(),],
};
export default config;
