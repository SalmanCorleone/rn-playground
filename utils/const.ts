import { Dimensions } from "react-native";

// not sure what's the efficient way to get this
// maybe useLayout -> get...Rect() can give us the exact number
// but man that's too much work
const headerHeight = 95;

export const _width = Dimensions.get("window").width;
export const _height = Dimensions.get("window").height - headerHeight;

export const _countdown_list_item_width = _width / 3;
