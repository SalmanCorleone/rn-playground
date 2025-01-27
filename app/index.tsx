import { Column, Row, Text } from "components";
import { Link } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const itemList = [
  {
    title: "Pulse Button",
    route: "/pulse",
  },
  {
    title: "Carousal",
    route: "/carousal",
  },
  {
    title: "Countdown",
    route: "/countdown",
  },
];

interface IProps {}

function Home(props: IProps) {
  return (
    <Column margin={"m"}>
      {itemList.map((item) => (
        <Link key={item.title} href={item.route} asChild>
          <TouchableOpacity>
            <Row mb={"m"} borderRadius={5} p={4} bg="white">
              <Text fontSize={24} color="purpleDark">
                {item.title}
              </Text>
            </Row>
          </TouchableOpacity>
        </Link>
      ))}
    </Column>
  );
}

export default Home;
