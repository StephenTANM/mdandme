import {
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native"
import React, { FC, useState } from "react"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"

import InteractionBarStyles from "./InteractionBar.styles"
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  FadeInUp,
  FadeOutUp,
} from "react-native-reanimated"
import MDText from "../MDText/MDText"

const {
  containerStyle,
  interactionStyle,
  paddingStyle,
  inputStyle,
  inputContainerStyle,
} = InteractionBarStyles

interface Props {
  readonly commentCount?: number
  readonly hasComments: boolean
  readonly onHugPress?: (_: boolean) => void
  readonly onCommentPress?: () => void
  readonly onReplySend?: (_: string) => void
  readonly hasHugs?: boolean
  readonly hugCount?: number
}

const InteractionBar: FC<Props> = ({
  commentCount = 0,
  hasComments,
  onHugPress = (_: boolean) => {},
  onCommentPress,
  onReplySend = () => {},
  hasHugs,
  hugCount,
}) => {
  const [hugged, setHugged] = useState<boolean>(false)
  const [replying, setReplying] = useState<boolean>(false)
  const [replyText, setReplyText] = useState<string>("")

  // Shared value to control the scale for the heartbeat animation
  const scale = useSharedValue(1)

  // Define the animation style
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(scale.value, { duration: 200 }) }],
  }))

  // Function to trigger the heartbeat animation
  const handleHeartPress = () => {
    scale.value = 1.5
    setTimeout(() => {
      scale.value = 1
    }, 200)

    setHugged((prev) => !prev)
    onHugPress(!hugged)
  }

  const onReply = () => {
    setReplying((prev) => !prev)
  }

  const onSend = () => {
    onReplySend(replyText)
    setReplying(false)
  }

  const onBlur = () => {
    if (replyText === "") {
      setTimeout(() => {
        setReplying(false)
      }, 1000)
    }
  }

  return (
    <View style={paddingStyle}>
      <View style={containerStyle}>
        {hasHugs && (
          <TouchableOpacity
            onPress={handleHeartPress}
            style={interactionStyle}
            activeOpacity={0.8}
          >
            <Animated.View style={animatedStyles}>
              <FontAwesome
                name="heartbeat"
                size={18}
                color={hugged ? "#C51104" : "#497e91"}
              />
            </Animated.View>
            <MDText color={hugged ? "white" : "#497e91"}>
              {hugCount} Hugs
            </MDText>
          </TouchableOpacity>
        )}

        {hasComments && (
          <TouchableOpacity
            onPress={onCommentPress}
            style={[
              interactionStyle,
              {
                backgroundColor: "white",
              },
            ]}
            activeOpacity={0.8}
          >
            <FontAwesome name="comments-o" size={24} color="#497e91" />
            <MDText color="#497e91">{commentCount} Comments</MDText>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={onReply}
          style={[
            interactionStyle,
            {
              backgroundColor: "white",
            },
          ]}
          activeOpacity={0.8}
        >
          <MDText color="#497e91">Reply</MDText>
        </TouchableOpacity>
      </View>
      {replying && (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutUp}
          style={inputContainerStyle}
        >
          <TextInput
            multiline
            autoFocus
            style={inputStyle}
            onChangeText={setReplyText}
            onBlur={onBlur}
          />
          <TouchableOpacity
            onPress={onSend}
            style={[
              interactionStyle,
              {
                backgroundColor: "white",
              },
            ]}
            activeOpacity={0.8}
          >
            <MDText color="#497e91">Send</MDText>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  )
}

export default InteractionBar
