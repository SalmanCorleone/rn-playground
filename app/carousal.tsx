import { Column } from "components";
import AnimatedImage from "components/Carousal/AnimatedImage";
import { useState } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { _carousal_item_width, _width } from "utils/const";

const _images = [
  "https://picsum.photos/id/0/5000/3333",
  "https://picsum.photos/id/1/5000/3333",
  "https://picsum.photos/id/2/5000/3333",
  "https://picsum.photos/id/3/5000/3333",
  "https://picsum.photos/id/4/5000/3333",
];

const Carousal = () => {
  const offsetX = useSharedValue(0);
  // const [images, setImages] = useState<string[]>(_images);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     setLoading(true);
  //     const res = await axios.get<LoremImageType[]>("https://picsum.photos/v2/list?limit=5");
  //     setImages(res.data.map((item) => item.download_url));
  //     setLoading(false);
  //   };

  //   fetchImages();
  // }, []);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      offsetX.value = event.contentOffset.x;
    },
  });

  // if (loading)
  //   return (
  //     <Column flex={1} justifyContent="center" alignItems="center">
  //       <ActivityIndicator size={40} />
  //     </Column>
  //   );

  return (
    <Column style={StyleSheet.absoluteFill}>
      {/* <Animated.View
        style={[{ width: 40, height: 40, borderRadius: 40, borderWidth: 1, backgroundColor: "red" }, animBox]}
      /> */}
      <Animated.ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={_carousal_item_width}
        decelerationRate={"fast"}
        onScroll={handleScroll}
        contentContainerStyle={{
          paddingLeft: 32,
          paddingRight: _width - _carousal_item_width - 32,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {_images.map((imageUrl, index) => (
          <AnimatedImage index={index} key={index} uri={imageUrl} scrollX={offsetX} />
        ))}
      </Animated.ScrollView>
    </Column>
  );
};

export default Carousal;
