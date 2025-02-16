import Animated, { FadeIn, interpolate, SharedValue, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

interface IAnimatedBackgroundImageProps {
  src: string;
  scrollX: SharedValue<number>;
  index: number;
  showLoader: boolean;
  onImageLoad: () => void;
}

import { _carousal_item_width, _height, _width } from "utils/const";

const AnimatedBackgroundImage = ({ src, scrollX, index, showLoader, onImageLoad }: IAnimatedBackgroundImageProps) => {
  const opacity = useSharedValue(0);

  const bgAnim = useAnimatedStyle(() => {
    opacity.value = interpolate(
      scrollX.value,
      [_carousal_item_width * (index - 1), _carousal_item_width * index, _carousal_item_width * (index + 1)],
      [0, 1, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.Image
      key="img"
      src={src}
      style={[{ width: _width, height: _height, position: "absolute" }, bgAnim]}
      blurRadius={50}
      onLoad={onImageLoad}
    />
  );
};

export default AnimatedBackgroundImage;
