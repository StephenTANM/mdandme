import { StyleSheet } from "react-native"
const InteractionBarStyles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    paddingHorizontal: 16,
    backgroundColor: "white",
    gap: 8,
  },
  iconContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    marginRight: 8,
  },
  textContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    marginLeft: 4,
  },
  interactionStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#5bb7d5",
    padding: 12,
    borderRadius: 8,
  },
})
export default InteractionBarStyles
