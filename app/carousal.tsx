import axios from "axios";
import { Column, Text } from "components";
import AnimatedImage from "components/Carousal/AnimatedImage";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import { _height, _width } from "utils/const";

const _images = [
  "https://picsum.photos/id/0/5000/3333",
  "https://picsum.photos/id/1/5000/3333",
  "https://picsum.photos/id/2/5000/3333",
  "https://picsum.photos/id/3/5000/3333",
  "https://picsum.photos/id/4/5000/3333",
];

const Carousal = () => {
  const scrollX = useSharedValue(0);
  const [images, setImages] = useState<string[]>(_images);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     setLoading(true);
  //     const res = await axios.get<LoremImageType[]>("https://picsum.photos/v2/list?limit=5");
  //     setImages(res.data.map((item) => item.download_url));
  //     setLoading(false);
  //   };

  //   fetchImages();
  // }, []);

  // console.log({ images });

  const handleScroll = (event: any) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
  };

  // if (loading)
  //   return (
  //     <Column flex={1} justifyContent="center" alignItems="center">
  //       <ActivityIndicator size={40} />
  //     </Column>
  //   );

  return (
    <Column style={StyleSheet.absoluteFill}>
      <Animated.ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        pagingEnabled
        // style={{ backgroundColor: "gray" }}
      >
        {_images.map((imageUrl, index) => (
          <AnimatedImage index={index} key={index} uri={imageUrl} scrollX={scrollX} />
          // <Image
          //   // source={{ uri: "https://unsplash.com/photos/yC-Yzbqy7PY" }}
          //   key={index}
          //   style={{ width: _width, height: _height, borderWidth: 1 }}
          // ></Image>
        ))}
      </Animated.ScrollView>
    </Column>
  );
};

export default Carousal;
