import { defineConfig } from "windicss/helpers";
import colors from "windicss/colors";
import form from "./plugins/windicss/form";

export default defineConfig({
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["JetBrains Mono", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
    },

    extend: {
      colors: {
        primary: colors.blue,
        gray: colors.trueGray,
      },
    },
  },

  shortcuts: {
    btn: "px-4 py-2 rounded border border-gray-600 transition text-gray-900 bg-white focus:(outline-none) hover:(transition text-gray-700 border-gray-700) dark:(bg-gray-900 text-gray-100 border-transparent) dark:(hover:bg-gray-700 hover:text-gray-50 hover:border-transparent)",
    "btn-primary":
      "bg-primary-600 text-white border-transparent hover:(bg-primary-800 text-white border-transparent) dark:(bg-primary-600 text-white) dark:(hover:text-white hover:bg-primary-800)",
  },

  plugins: [require("windicss/plugin/forms"), form],
});
