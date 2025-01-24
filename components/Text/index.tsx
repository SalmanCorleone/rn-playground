import { createRestyleComponent, createText, createVariant, VariantProps } from "@shopify/restyle";
import { Theme } from "utils/theme";

const Txt = createText<Theme>();

const Text = createRestyleComponent<VariantProps<Theme, "textVariants"> & React.ComponentProps<typeof Txt>, Theme>(
  [
    createVariant({
      themeKey: "textVariants",
    }),
  ],
  Txt
);

export default Text;
