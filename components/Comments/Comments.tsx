import React, { useState } from "react"
import { View, Text, FlatList } from "react-native"
import { Comment } from "@/requests"

import Svg, { Line, Circle } from "react-native-svg"
import InteractionBar from "../InteractionBar/InteractionBar"
import { groupComments } from "@/utils"
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated"

const VerticalLineWithCircle = ({
  width = 50,
  height = 70,
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

        <Circle cx={width / 2} cy={height / 2} r={5} fill={circleColor} />
      </Svg>
    </View>
  )
}

const Comments = ({ comments }: { comments: Record<string, Comment> }) => {
  const groupedComments = groupComments(comments)
  const [threadExpanded, setThreadExpanded] = useState<boolean>(false)

  const expandThread = () => {
    setThreadExpanded((prev) => !prev)
  }

  const renderItem = ({
    item,
  }: {
    item: Comment & { children: Comment[] }
  }) => (
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
          onHugPress={() => {}}
          onReplyPress={() => {}}
        />
      </View>
      {threadExpanded &&
        item.children.length > 0 &&
        item.children.map((child) => (
          <>
            <Animated.View
              entering={FadeInUp}
              exiting={FadeOutUp}
              key={child.id}
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
              <InteractionBar hasComments={false} hasHugs={false} />
            </Animated.View>
          </>
        ))}
    </Animated.View>
  )

  return (
    <FlatList
      style={{ backgroundColor: "white", padding: 16 }}
      data={groupedComments}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  )
}

export default Comments
