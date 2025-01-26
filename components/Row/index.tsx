import { BoxProps, createBox } from "@shopify/restyle";
import { ComponentProps } from "react";
import { Theme } from "utils/theme";

const Box = createBox<Theme>();

interface IRowProps extends ComponentProps<typeof Box>, React.PropsWithChildren {}

const Row = ({ children, ...rest }: IRowProps) => {
  return (
    <Box flexDirection="row" {...rest}>
      {children}
    </Box>
  );
};

export default Row;
