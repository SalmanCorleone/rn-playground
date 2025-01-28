import Text from "components/Text";
import { useEffect } from "react";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { _countdown_list_item_width } from "utils/const";

interface IListItemProps {
  index: number;
  activeIndex: SharedValue<number>;
}

const ListItem = ({ index, activeIndex }: IListItemProps) => {
  const textScale = useSharedValue(1);
  const textOpacity = useSharedValue(1);

  useEffect(() => {
    textScale.value = withTiming(
      interpolate(activeIndex.value, [index - 1, index, index + 1], [1, 2, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
      { duration: 300 }
    );
    textOpacity.value = withTiming(
      interpolate(activeIndex.value, [index - 1, index, index + 1], [0.3, 1, 0.3], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
      { duration: 300 }
    );
  }, [activeIndex.value]);

  const textAnim = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [{ scale: textScale.value }],
    };
  });

  return (
    <Animated.View
      style={{
        height: 100,
        width: _countdown_list_item_width,
        alignItems: "center",
        justifyContent: "center",
      }}
      key={index}
    >
      <Animated.Text style={[{ fontSize: 32, color: "white" }, textAnim]}>{(index + 1) * 5}</Animated.Text>
    </Animated.View>
  );
};

export default ListItem;
