import { ThemeProvider } from "@shopify/restyle";
import { Slot, SplashScreen, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "utils/theme";

const App = () => (
  <ThemeProvider theme={theme}>
    <Stack screenOptions={{ headerTitle: "" }}></Stack>
  </ThemeProvider>
);

export default App;
