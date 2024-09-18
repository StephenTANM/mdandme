import { Text, TouchableOpacity } from "react-native"
import React, { FC } from "react"
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from "react-native-reanimated"
import FeedCardStyles from "./FeedCard.styles"

const { containerStyle } = FeedCardStyles

interface Props {
  readonly title: string
  readonly content: string
}
const UNLIMITED_HEIGHT = 1000

const FeedCard: FC<Props> = ({ title, content }) => {
  const maxHeight = useSharedValue<number>(150)

  const animatedStyles = useAnimatedStyle(() => ({
    maxHeight: withTiming(maxHeight.value, { duration: 700 }),
  }))

  const expandHeight = () => {
    maxHeight.value = maxHeight.value === 150 ? UNLIMITED_HEIGHT : 150
  }

  return (
    <TouchableOpacity onPress={expandHeight}>
      <Animated.View style={[containerStyle, animatedStyles]}>
        <Text>{title}</Text>
        <Text>{content}</Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

export default FeedCard
