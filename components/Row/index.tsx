import { BoxProps, createBox } from "@shopify/restyle";
import { Theme } from "utils/theme";

const Box = createBox<Theme>();

interface IProps extends BoxProps<Theme>, React.PropsWithChildren {}

const Row = ({ children, ...rest }: IProps) => {
  return (
    <Box flexDirection="row" {...rest}>
      {children}
    </Box>
  );
};

export default Row;
