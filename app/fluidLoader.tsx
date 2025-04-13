import { Column, Row, Text } from "components";
import { useCallback, useRef, useState } from "react";
import { Button, Pressable, TouchableOpacity } from "react-native";
import Rive, { RiveRef } from "rive-react-native";
import Slider from "@react-native-community/slider";
import { useTheme } from "@shopify/restyle";
import { Theme } from "utils/theme";
import { _height, _width } from "utils/const";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const resourceName = "fluid_loader";
const stateMachineName = "Loader State Machine";
const artBoardName = "Artboard";

const FluidLoader = () => {
  const riveRef = useRef<RiveRef>(null);
  const { colors } = useTheme<Theme>();
  const [sliderValue, setSliderValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const onStartPress = useCallback(() => {
    setLoading(true);
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
      setLoading(false);
    }
  }, []);

  return (
    <Column bg="greenLight" flex={1} pb={5} alignItems="center" justifyContent="center">
      <Column height={_height / 2} width={_width}>
        <Rive
          ref={riveRef}
          onError={(error) => console.log(error)}
          resourceName={resourceName}
          artboardName={artBoardName}
          stateMachineName={stateMachineName}
          style={{ width: _width, height: _height / 3 }}
          autoplay={true}
        />
      </Column>

      {!loading ? (
        <TouchableOpacity onPress={onStartPress}>
          <Row px={5} py={2} borderWidth={1} alignSelf="center" borderRadius={4}>
            <Text>Start Loading</Text>
          </Row>
        </TouchableOpacity>
      ) : (
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
      )}
    </Column>
  );
};

export default FluidLoader;
