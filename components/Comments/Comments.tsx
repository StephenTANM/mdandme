import React, { FC, useState } from "react"
import { View, Text, FlatList } from "react-native"
import { Comment } from "@/requests"

import Svg, { Line, Circle } from "react-native-svg"
import InteractionBar from "../InteractionBar/InteractionBar"
import { groupComments } from "@/utils"
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated"

const VerticalLineWithCircle = ({
  width = 50,
  height = 150,
  lineColor = "grey",
  circleColor = "#C51104",
  strokeWidth = 2,
}) => {
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
      }}
    >
      <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
        <Line
          x1={width / 2}
          y1={0}
          x2={width / 2}
          y2={height}
          stroke={lineColor}
          strokeWidth={strokeWidth}
        />

        <Circle cx={width / 2} cy={height / 4} r={5} fill={circleColor} />
      </Svg>
    </View>
  )
}

interface Props {
  comments: Record<string, Comment>
  onCommentReply: (_: { parent_id: number | null; text: string }) => void
}

// Comment item component
interface CommentItemProps {
  item: Comment & { children: Comment[] }
  onCommentReply: (_: { parent_id: number | null; text: string }) => void
}

const CommentItem: FC<CommentItemProps> = ({ item, onCommentReply }) => {
  const [threadExpanded, setThreadExpanded] = useState<boolean>(false)

  const onComment = (args: { parent_id: number | null }) => (text: string) => {
    onCommentReply({ text, parent_id: args.parent_id })
  }

  const expandThread = () => {
    setThreadExpanded((prev) => !prev)
  }

  return (
    <Animated.View entering={FadeInUp} style={{ backgroundColor: "white" }}>
      <View
        style={{
          padding: 8,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{item.display_name}</Text>
        <Text>{item.text}</Text>
        <Text style={{ color: "grey", marginTop: 5 }}>
          {new Date(item.created_at).toLocaleString()}
        </Text>
        <InteractionBar
          commentCount={item.children.length}
          hasComments={item.children.length > 0}
          onCommentPress={expandThread}
          onReplySend={onComment({ parent_id: item.id })}
        />
      </View>
      {threadExpanded &&
        item.children.length > 0 &&
        item.children.reverse().map((child) => (
          <Animated.View
            entering={FadeInUp}
            exiting={FadeOutUp}
            key={JSON.stringify(child)}
            style={{
              paddingLeft: 50,
              paddingVertical: 5,
            }}
          >
            <VerticalLineWithCircle />
            <Text style={{ fontWeight: "bold" }}>{child.display_name}</Text>
            <Text>{child.text}</Text>
            <Text style={{ color: "grey", marginTop: 5 }}>
              {new Date(child.created_at).toLocaleString()}
            </Text>
            <InteractionBar
              hasComments={false}
              hasHugs={false}
              onReplySend={onComment({ parent_id: item.id })}
            />
          </Animated.View>
        ))}
    </Animated.View>
  )
}

const Comments: FC<Props> = ({ comments, onCommentReply }) => {
  const groupedComments = groupComments(comments)

  const renderItem = ({
    item,
  }: {
    item: Comment & { children: Comment[] }
  }) => <CommentItem item={item} onCommentReply={onCommentReply} />

  return (
    <FlatList
      style={{ backgroundColor: "white", padding: 16 }}
      data={groupedComments}
      keyExtractor={(item) => item.id.toString() + item.created_at}
      renderItem={renderItem}
    />
  )
}

export default Comments
