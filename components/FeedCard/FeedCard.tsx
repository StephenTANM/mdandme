import { Text, TouchableOpacity, LayoutChangeEvent, View } from "react-native"
import React, { FC, useState } from "react"
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from "react-native-reanimated"
import { Comment, Post } from "@/requests"
import Markdown from "react-native-markdown-display"

import InteractionBar from "../InteractionBar/InteractionBar"
import MDText from "../MDText/MDText"
import Comments from "../Comments/Comments"
import FeedCardStyles from "./FeedCard.styles"

const { containerStyle, titleContainerStyle, insetShadowStyle, paddingStyle } =
  FeedCardStyles

interface Props {
  readonly title: string
  readonly content: string
  readonly onExpand: () => any
  readonly comments: Record<string, Comment>
  readonly onHug: (_: boolean) => void
  readonly hugs: number
  readonly onReply: (_: string) => void
}

const FeedCard: FC<Props> = ({
  title,
  content,
  comments,
  hugs,
  onExpand,
  onHug,
  onReply,
}) => {
  const [postLayout, setPostLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  const [contentHeight, setContentHeight] = useState(0)
  const [showComments, setShowComments] = useState(false)

  const maxHeight = useSharedValue<number>(150)
  const shadowOpacity = useSharedValue(1)
  const animatedStyles = useAnimatedStyle(() => ({
    maxHeight: withTiming(maxHeight.value, { duration: 700 }),
  }))
  const shadowStyle = useAnimatedStyle(() => ({
    opacity: withTiming(shadowOpacity.value, { duration: 300 }),
  }))

  const expandHeight = () => {
    const isExpanding = maxHeight.value === 150
    if (isExpanding) {
      onExpand()
    }
    maxHeight.value = isExpanding ? contentHeight + postLayout.height : 150
    shadowOpacity.value = isExpanding ? 0 : 1 // Hide shadow when expanded, show when collapsed
  }

  const expandComments = () => {
    setShowComments((prev) => !prev)
  }

  const startReply = (text: string) => {
    onReply(text)
  }

  const layoutHandle = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout
    setPostLayout(layout)
  }

  const onContentLayout = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout
    setContentHeight(layout.height) // Set contentHeight to the full height of the content
  }

  return (
    <Animated.View style={containerStyle}>
      <View>
        <TouchableOpacity
          onPress={expandHeight}
          onLayout={layoutHandle}
          style={[paddingStyle]}
        >
          <Animated.View style={animatedStyles}>
            <View style={titleContainerStyle}>
              <MDText size="h5" bold>
                {title}
              </MDText>
            </View>
            <View onLayout={onContentLayout}>
              <Markdown>{content}</Markdown>
            </View>
          </Animated.View>
        </TouchableOpacity>
        <Animated.View
          style={[
            insetShadowStyle,
            shadowStyle, // Animate the opacity of the shadow
          ]}
        />
      </View>
      <View
        style={[
          paddingStyle,
          {
            backgroundColor: "white",
          },
        ]}
      >
        <InteractionBar
          onHugPress={onHug}
          onCommentPress={expandComments}
          onReplySend={startReply}
          hasComments={Object.keys(comments).length > 0}
          hasHugs
          commentCount={Object.keys(comments).length}
          hugCount={hugs}
        />
      </View>
      {showComments && <Comments comments={comments} />}
    </Animated.View>
  )
}

export default FeedCard
