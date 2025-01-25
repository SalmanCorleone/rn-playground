import { createRestyleComponent, createText, createVariant, TextProps, VariantProps } from "@shopify/restyle";
import { Theme } from "utils/theme";

const Txt = createText<Theme>();

const TextComponent = createRestyleComponent<VariantProps<Theme, "textVariants"> & React.ComponentProps<typeof Txt>, Theme>(
  [
    createVariant({
      themeKey: "textVariants",
    }),
  ],
  Txt
);

interface IProps extends TextProps<Theme>, React.PropsWithChildren {}

const Text = ({ children, ...rest }: IProps) => {
  return (
    <TextComponent fontFamily="SourceCodeProRoman-Regular" {...rest}>
      {children}
    </TextComponent>
  );
};

export default Text;
