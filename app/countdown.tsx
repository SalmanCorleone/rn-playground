import { useTheme } from "@shopify/restyle";
import { Column, Row, Text } from "components";
import ListItem from "components/Countdown/ListItem";
import { useCallback, useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  FadeOutRight,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { _countdown_list_item_width, _height, _width } from "utils/const";
import useInterval from "utils/hooks/useInterval";
import { Theme } from "utils/theme";

const Countdown = () => {
  const buttonY = useSharedValue(0);
  const activeIndex = useSharedValue(0);
  const scrollViewOpacity = useSharedValue(1);
  const counterFluidY = useSharedValue(0);
  const counterFluidOpacity = useSharedValue(1);
  const { colors } = useTheme<Theme>();
  const [isCounterActive, setIsCounterActive] = useState(false);
  const [count, setCount] = useState(5);
  const initialCount = useRef<number>(5);

  console.log({ activeIndex: activeIndex.value });

  useInterval(
    () => {
      setCount((c) => {
        if (c > 0) return c - 1;
        stopCounter();
        return c;
      });
    },
    isCounterActive ? 1000 : null
  );

  useEffect(() => {
    if (!isCounterActive) return;
    const stepHeight = _height / initialCount.current;
    const heightToDrop = stepHeight * (initialCount.current - count);
    counterFluidY.value = withTiming(heightToDrop, { duration: 300 });
  }, [count, isCounterActive]);

  const startCounter = useCallback(() => {
    setIsCounterActive(true);
    setCount((activeIndex.value + 1) * 5);
    buttonY.value = withTiming(_height / 3, { duration: 300 });
    initialCount.current = (activeIndex.value + 1) * 5;
    scrollViewOpacity.value = withTiming(0, { duration: 300 });
  }, []);

  const stopCounter = useCallback(() => {
    setIsCounterActive(false);
    buttonY.value = withTiming(0, { duration: 300 });
    scrollViewOpacity.value = withTiming(1, { duration: 300 });
    counterFluidY.value = withDelay(500, withTiming(0, { duration: 300 }));
  }, []);

  const startButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: buttonY.value }],
    };
  });

  const handleScroll = (event: any) => {
    activeIndex.value = Math.round(event.nativeEvent.contentOffset.x / _countdown_list_item_width);
    setCount((activeIndex.value + 1) * 5);
  };

  // const counterAnim = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ translateY: buttonY.value }],
  //   };
  // });

  const scrollViewAnim = useAnimatedStyle(() => {
    return {
      opacity: scrollViewOpacity.value,
    };
  });

  const counterFluidAnim = useAnimatedStyle(() => {
    return {
      opacity: counterFluidOpacity.value,
      transform: [{ translateY: counterFluidY.value }],
    };
  });

  return (
    <Column flex={1} bg="darkGray" position="relative">
      {/* Counter fluid */}
      {isCounterActive && (
        <Animated.View
          style={[
            {
              width: _width,
              height: _height,
              backgroundColor: colors.redPrimary,
              position: "absolute",
            },
            counterFluidAnim,
          ]}
        ></Animated.View>
      )}

      {/* Countdown text */}
      <Column flex={1}>
        <Row position="absolute" justifyContent="center" alignItems="center" width={"100%"} height={"100%"}>
          {isCounterActive && (
            <Animated.View>
              <Text fontSize={32} color="white" style={{ transform: [{ scale: 2 }] }}>
                {count}
              </Text>
            </Animated.View>
          )}
        </Row>
        <Animated.ScrollView
          scrollEventThrottle={16}
          exiting={FadeOutRight.duration(300)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: _countdown_list_item_width,
            paddingRight: _countdown_list_item_width,
          }}
          style={[scrollViewAnim]}
          snapToInterval={_countdown_list_item_width}
          decelerationRate={"fast"}
          onScroll={handleScroll}
        >
          {Array(10)
            .fill(0)
            .map((_, idx) => (
              <ListItem key={idx} index={idx} activeIndex={activeIndex} />
            ))}
        </Animated.ScrollView>
      </Column>

      {/* Start Button */}
      <Animated.View style={[startButtonStyle]}>
        <TouchableOpacity onPress={startCounter}>
          <Column height={100} mb={24} bg="greenPrimary" alignItems="center" justifyContent="center">
            <Text color="white" fontWeight={700} fontSize={20}>
              Start
            </Text>
          </Column>
        </TouchableOpacity>
      </Animated.View>
    </Column>
  );
};

export default Countdown;
