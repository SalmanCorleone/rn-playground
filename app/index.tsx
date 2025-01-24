import { Column, Row, Text } from "components";
import React from "react";
import { TouchableOpacity } from "react-native";

const itemList = [
  {
    title: "Ripple Effect",
    route: "/ripple",
  },
  {
    title: "Carousal",
    route: "/carousel",
  },
];

interface IProps {}

function Home(props: IProps) {
  return (
    <Column margin={"m"}>
      {itemList.map((item) => (
        <TouchableOpacity key={item.title}>
          <Row mb={"m"} borderWidth={1} borderRadius={5} p={4}>
            <Text fontSize={24}>{item.title}</Text>
          </Row>
        </TouchableOpacity>
      ))}
    </Column>
  );
}

export default Home;
