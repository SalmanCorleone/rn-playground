import { createRestyleComponent, createText, createVariant, TextProps, VariantProps } from "@shopify/restyle";
import { ComponentProps } from "react";
import { Theme } from "utils/theme";

const Txt = createText<Theme>();

const TextComponent = createRestyleComponent<
  VariantProps<Theme, "textVariants"> & React.ComponentProps<typeof Txt>,
  Theme
>(
  [
    createVariant({
      themeKey: "textVariants",
    }),
  ],
  Txt
);

interface IProps extends ComponentProps<typeof TextComponent>, React.PropsWithChildren {}

const Text = ({ children, ...rest }: IProps) => {
  return (
    <TextComponent fontFamily="SourceCodeProRoman-Regular" {...rest}>
      {children}
    </TextComponent>
  );
};

export default Text;
