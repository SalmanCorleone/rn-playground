import { BoxProps, createBox } from "@shopify/restyle";
import { Theme } from "utils/theme";

const Box = createBox<Theme>();

interface IProps extends BoxProps<Theme>, React.PropsWithChildren {}

const Column = ({ children, ...rest }: IProps) => {
  return <Box {...rest}>{children}</Box>;
};

export default Column;
