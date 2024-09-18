import { StyleSheet } from "react-native"

const FeedCardStyles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,

    overflow: "hidden",
    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    // Android Shadow
    elevation: 5,
  },
})
export default FeedCardStyles
