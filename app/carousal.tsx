import { Column } from "components";
import AnimatedBackgroundImage from "components/Carousal/AnimatedBackgroundImage";
import AnimatedImage from "components/Carousal/AnimatedImage";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { _carousal_item_width, _width } from "utils/const";

const _images = [
  "https://picsum.photos/id/50/5000/3333",
  "https://picsum.photos/id/10/5000/3333",
  "https://picsum.photos/id/20/5000/3333",
  "https://picsum.photos/id/30/5000/3333",
  "https://picsum.photos/id/40/5000/3333",
];

const Carousal = () => {
  const offsetX = useSharedValue(0);
  // const [images, setImages] = useState<string[]>(_images);
  // const [loading, setLoading] = useState(true);
  const [imageReadyCount, setImageReadyCount] = useState(0);

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

  const onImageLoad = useCallback(() => {
    setImageReadyCount((prev) => prev + 1);
  }, []);

  return (
    <Column style={StyleSheet.absoluteFill}>
      <Column style={StyleSheet.absoluteFill}>
        {_images.map((img, idx) => (
          <AnimatedBackgroundImage
            key={img}
            src={img}
            scrollX={offsetX}
            index={idx}
            showLoader={imageReadyCount < _images.length * 2}
            onImageLoad={onImageLoad}
          />
        ))}
      </Column>
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
          <AnimatedImage
            index={index}
            key={index}
            uri={imageUrl}
            scrollX={offsetX}
            onImageLoad={onImageLoad}
            showLoader={imageReadyCount < _images.length * 2}
          />
        ))}
      </Animated.ScrollView>
    </Column>
  );
};

export default Carousal;
