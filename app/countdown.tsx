import { Column, Row, Text } from "components";
import ListItem from "components/Countdown/ListItem";
import { useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { _countdown_list_item_width } from "utils/const";

const Countdown = () => {
  const buttonY = useSharedValue(0);
  const activeIndex = useSharedValue(0);
  const [count, setCount] = useState(0);

  const startButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: buttonY.value }],
    };
  });

  const handleScroll = (event: any) => {
    activeIndex.value = Math.round(event.nativeEvent.contentOffset.x / _countdown_list_item_width);
    setCount(activeIndex.value);
  };

  return (
    <Column flex={1} bg="darkGray" justifyContent="space-between">
      <Animated.ScrollView
        scrollEventThrottle={16}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: _countdown_list_item_width,
          paddingRight: _countdown_list_item_width,
        }}
        style={{}}
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

      {/* Start Button */}
      <Column height={100} mb={24} bg="greenPrimary" alignItems="center" justifyContent="center">
        <Animated.View style={[startButtonStyle]}>
          <Text color="white" fontWeight={700} fontSize={20}>
            Start {activeIndex.value}
          </Text>
        </Animated.View>
      </Column>
    </Column>
  );
};

export default Countdown;
