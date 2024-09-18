import { View, Text } from "react-native"
import React from "react"
import { useLocalSearchParams } from "expo-router"
import { FeedCard } from "@/components"
import { usePost, usePostMutation } from "@/hooks"

const index = () => {
  const { id } = useLocalSearchParams()

  const { sendHug, sendReply, sendCommentReply } = usePostMutation()

  const { data } = usePost({
    id: Array.isArray(id) ? id[0] : id,
  })

  if (!data) {
    return null
  }

  const { assessment, title, comments, num_hugs } = data

  return (
    <View
      style={{
        padding: 16,
      }}
    >
      <FeedCard
        onHug={sendHug(data)}
        title={title}
        content={assessment}
        comments={comments}
        hugs={num_hugs}
        onReply={sendReply(data)}
        onCommentReply={sendCommentReply(data)}
        onExpand={() => {}}
      />
    </View>
  )
}

export default index
