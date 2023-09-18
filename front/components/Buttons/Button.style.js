import { StyleSheet } from "react-native";
import COLORS from "../../theme";

export const styles = StyleSheet.create({
  button: {
    height: 55,
    width: "100%",
    backgroundColor: COLORS.pricipalaColorGreen,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  textButton: {
    color: COLORS.light,
    fontWeight: 500,
    fontSize: 23,
  },
});
