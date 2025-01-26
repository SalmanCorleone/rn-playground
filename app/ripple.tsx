import { transform } from "@babel/core";
import { Column, Text } from "components";
import {
  Pressable,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableNativeFeedbackBase,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const _size = 120;

const Ripple = () => {
  const translateY = useSharedValue(-12);
  const scale = useSharedValue(1);

  const onPressIn = () => {
    translateY.value = withSpring(-4, { duration: 200 });
    // scale.value = withSequence(withTiming(0., { duration: 300 }), withTiming(1, { duration: 300 }));
  };

  const onPressOut = () => {
    translateY.value = withSpring(-12, { duration: 1000 });
  };

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }, { scale: scale.value }],
    };
  });

  return (
    <Column flex={1} justifyContent="center" alignItems="center">
      <Column width={_size} height={_size} bg="greenPrimary" position="absolute" borderRadius={_size / 3} />
      <Animated.View style={animatedButtonStyle}>
        <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
          <Column
            borderWidth={1}
            width={_size}
            height={_size}
            borderRadius={_size / 3}
            backgroundColor="white"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize={24}>Tap</Text>
          </Column>
        </TouchableWithoutFeedback>
      </Animated.View>
    </Column>
  );
};

export default Ripple;
