import { createTheme } from "@shopify/restyle";

const palette = {
  purpleLight: "#8C6FF7",
  purplePrimary: "#5A31F4",
  purpleDark: "#3F22AB",

  blueDark: "#09122C",
  bluePrimary: "#344CB7",
  blueLight: "#A1E3F9",

  redLight: "#E195AB",
  redPrimary: "#BE3144",

  greenLight: "#56DCBA",
  greenPrimary: "#0ECD9D",
  greenDark: "#0A906E",

  black: "#0B0B0B",
  slateGray: "#7D8491",
  darkGray: "#1D1616",
  white: "#fff",
};

const sizing = Array(100)
  .fill(0)
  .reduce((acc, _, i) => ({ ...acc, [i]: i * 4 }), {});

const theme = createTheme({
  colors: {
    ...palette,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    ...sizing,
  },
  textVariants: {
    header: {
      fontWeight: "bold",
      fontSize: 34,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaults: {
      // We can define a default text variant here.
    },
  },
});

export type Theme = typeof theme;
export default theme;
