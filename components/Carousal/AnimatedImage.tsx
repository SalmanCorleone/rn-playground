import Column from "components/Column";
import { useEffect } from "react";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { _carousal_item_width, _height, _width } from "utils/const";

interface IAnimatedImageProps {
  index: number;
  uri: string;
  scrollX: SharedValue<number>;
}

const AnimatedImage = ({ index, uri, scrollX }: IAnimatedImageProps) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  const containerAnim = useAnimatedStyle(() => {
    scale.value = interpolate(
      scrollX.value,
      [_carousal_item_width * (index - 1), _carousal_item_width * index, _carousal_item_width * (index + 1)],
      [0.8, 1, 0.8],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );

    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  const imageAnim = useAnimatedStyle(() => {
    rotation.value = interpolate(
      scrollX.value,
      [_carousal_item_width * (index - 1), _carousal_item_width * index, _carousal_item_width * (index + 1)],
      [10, 0, -15],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
    return {
      transform: [{ rotate: `${rotation.value}deg` }, { scale: 1.5 }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: _carousal_item_width,
          height: _height / 1.5,
          borderRadius: 32,
          overflow: "hidden",
          borderWidth: 1,
        },
        containerAnim,
      ]}
    >
      <Animated.Image
        source={{ uri }}
        resizeMode={"cover"}
        style={[{ flex: 1, transform: [{ scale: 1.5 }] }, imageAnim]}
      />
    </Animated.View>
  );
};

export default AnimatedImage;
