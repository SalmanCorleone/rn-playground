import { Column, Row, Text } from "components";
import { useCallback, useRef, useState } from "react";
import { Button, Pressable, TouchableOpacity } from "react-native";
import Rive, { RiveRef } from "rive-react-native";
import Slider from "@react-native-community/slider";
import { useTheme } from "@shopify/restyle";
import { Theme } from "utils/theme";
import { _width } from "utils/const";

const resourceName = "fluid_loader_2";
const stateMachineName = "Loader State Machine";

const FluidLoader = () => {
  const riveRef = useRef<RiveRef>(null);
  const { colors } = useTheme<Theme>();
  const [sliderValue, setSliderValue] = useState(0);

  const onStartPress = useCallback(() => {
    if (riveRef.current) {
      riveRef.current.fireState(stateMachineName, "advance");
    }
  }, []);

  const onSliderChange = useCallback(async (value: number) => {
    setSliderValue(value);
    if (!riveRef?.current) return;
    riveRef.current.setInputState(stateMachineName, "progress", value);

    if (value === 100) {
      riveRef.current.fireState(stateMachineName, "advance");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSliderValue(0);
    }
  }, []);

  return (
    <Column bg="greenLight" pb={5}>
      <Rive
        ref={riveRef}
        onError={(error) => console.log(error)}
        resourceName={resourceName}
        artboardName="Artboard"
        stateMachineName={stateMachineName}
        style={{ width: 400, height: 400 }}
        autoplay={true}
      />

      <TouchableOpacity onPress={onStartPress}>
        <Row px={5} py={2} borderWidth={1} alignSelf="center" borderRadius={4}>
          <Text>Press to start</Text>
        </Row>
      </TouchableOpacity>

      <Row alignItems="center" justifyContent="center" mt={4}>
        <Slider
          value={sliderValue}
          style={{ width: _width / 1.5, height: 40 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor={colors.white}
          maximumTrackTintColor={colors.greenDark}
          onValueChange={onSliderChange}
        />
      </Row>
    </Column>
  );
};

export default FluidLoader;
