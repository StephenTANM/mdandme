import { FeedCard } from "@/components"
import { useFeed } from "@/hooks"
import { Post } from "@/requests"

import { ActivityIndicator, FlatList, View } from "react-native"
import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Index = () => {
  const { isFetching, data, fetchNextPage, posts, mutate } = useFeed()

  const focusPost = (layout: {
    x: number
    y: number
    width: number
    height: number
  }) => {
    // Handle focus, if necessary (based on the platform)
  }

  const sendHug = (post: Post) => () => {
    mutate({ ...post, num_hugs: post.num_hugs + 1 })
  }

  const renderFeedCard = ({ item }: { item: Post }) => {
    const { assessment, title, id, comments, num_hugs } = item
    return (
      <FeedCard
        onHug={sendHug(item)}
        key={id}
        title={title}
        content={assessment}
        comments={comments}
        onExpand={focusPost}
        hugs={num_hugs}
      />
    )
  }

  if (!data) {
    return null
  }

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <FlatList
        data={posts}
        renderItem={renderFeedCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={contentContainerStyle}
        onEndReached={() => {
          if (!isFetching) {
            fetchNextPage()
          }
        }}
        onEndReachedThreshold={0.2} // Trigger fetching when 20% from the bottom
        ListFooterComponent={
          isFetching ? <ActivityIndicator animating={isFetching} /> : null
        }
      />
    </SafeAreaView>
  )
}

const { contentContainerStyle } = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: "#F3F6F9",
    padding: 10,
    gap: 16,
  },
})

export default Index
