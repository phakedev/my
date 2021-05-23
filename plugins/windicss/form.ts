import colors from "windicss/colors";
import plugin from "windicss/plugin";
import baseConfig from "windicss/defaultConfig";
import type { DefaultTheme } from "windicss/types/interfaces";

const defaultTheme = baseConfig.theme as unknown as DefaultTheme;
const { borderRadius } = defaultTheme;
const spacing = (num: number) => `${num / 4}rem`;

const form = plugin(({ addBase, theme }) => {
  const formBase = {
    [`
      [type='text'],
      [type='email'],
      [type='url'],
      [type='password'],
      [type='number'],
      [type='date'],
      [type='datetime-local'],
      [type='month'],
      [type='search'],
      [type='tel'],
      [type='time'],
      [type='week'],
      [multiple],
      textarea,
      select
    `]: {
      "padding-top": spacing(2),
      "padding-right": spacing(4),
      "padding-bottom": spacing(2),
      "padding-left": spacing(4),
      "border-radius": borderRadius["DEFAULT"] as string,
      "border-color": theme("colors.gray.300", colors.gray[300]) as string,
    },
  };

  addBase(formBase);
});

export default form;
