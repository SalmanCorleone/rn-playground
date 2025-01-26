import { createBox } from "@shopify/restyle";
import { ComponentProps } from "react";
import { Theme } from "utils/theme";

const Box = createBox<Theme>();

interface IColumnProps extends ComponentProps<typeof Box>, React.PropsWithChildren {}

const Column = ({ children, ...rest }: IColumnProps) => {
  return <Box {...rest}>{children}</Box>;
};

export default Column;
