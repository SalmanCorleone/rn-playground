import Column from "components/Column";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { _height, _width } from "utils/const";

interface IAnimatedImageProps {
  index: number;
  uri: string;
  scrollX: SharedValue<number>;
}

const AnimatedImage = ({ index, uri, scrollX }: IAnimatedImageProps) => {
  const activeIndex = useDerivedValue(() => Math.round(scrollX.value / _width), [scrollX]);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  scale.value = interpolate(activeIndex.value, [index - 1, index, index + 1], [1, 0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={{ width: _width - 64, height: _height / 1.5, borderRadius: 32, margin: 32, overflow: "hidden" }}
    >
      <Animated.Image source={{ uri }} resizeMode={"cover"} style={[{ flex: 1 }, animatedStyle]} />
    </Animated.View>
  );
};

export default AnimatedImage;
