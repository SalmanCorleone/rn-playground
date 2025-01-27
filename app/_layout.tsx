import { ThemeProvider } from "@shopify/restyle";
import { Slot, SplashScreen, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "utils/theme";

const App = () => (
  <GestureHandlerRootView>
    <ThemeProvider theme={theme}>
      <Stack screenOptions={{ headerTitle: "" }}></Stack>
    </ThemeProvider>
  </GestureHandlerRootView>
);

export default App;
