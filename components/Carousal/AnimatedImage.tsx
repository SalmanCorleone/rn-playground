import Column from "components/Column";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import Animated, {
  FadeIn,
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
  onImageLoad: () => void;
  showLoader: boolean;
}

const AnimatedImage = ({ index, uri, scrollX, onImageLoad, showLoader }: IAnimatedImageProps) => {
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
          borderWidth: 2,
          borderColor: "white",
          position: "relative",
        },
        containerAnim,
      ]}
    >
      <Animated.Image
        source={{ uri }}
        resizeMode={"cover"}
        style={[{ flex: 1, transform: [{ scale: 1.5 }] }, imageAnim]}
        onLoadEnd={onImageLoad}
        // onLoadEnd={() => setImageLoaded(true)}
        // onLoad={onImageLoad}
        // defaultSource={require("assets/images/splash.png")}
        entering={FadeIn}
      />
      {showLoader && (
        <Column
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          justifyContent="center"
          alignItems="center"
          bg="white"
        >
          <ActivityIndicator size={40} />
        </Column>
      )}
    </Animated.View>
  );
};

export default AnimatedImage;
