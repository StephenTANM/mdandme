import { StyleSheet } from "react-native"
const InteractionBarStyles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
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
  paddingStyle: {
    paddingHorizontal: 16,
  },
  inputStyle: {
    backgroundColor: "#f1f1f1",
    padding: 16,
    borderRadius: 10,
    marginTop: 16,
    flex: 1,
  },
  inputContainerStyle: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    gap: 16,
  },
})
export default InteractionBarStyles
