import { StyleSheet } from "react-native"

const FeedCardStyles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    // Android Shadow
    elevation: 5,
  },
  paddingStyle: {
    padding: 16,
  },
  titleContainerStyle: {
    marginBottom: 16,
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  insetShadowStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 30, // Height of the shadow effect
    backgroundColor: "white",
    shadowColor: "white",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 1,
    shadowRadius: 10,
    zIndex: 1,
  },
})
export default FeedCardStyles
