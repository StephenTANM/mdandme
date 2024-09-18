import { FeedCard } from "@/components"
import { useFeed } from "@/hooks"
import { Post } from "@/requests"
import { useRef } from "react"

import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native"
import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Index = () => {
  const { isFetching, data, fetchNextPage, posts, mutate } = useFeed()
  const flatListRef = useRef<FlatList>(null)

  // const { height } = useGradualAnimation()

  // const fakeView = useAnimatedStyle(() => {
  //   return {
  //     height: Math.abs(height.value),
  //   }
  // }, [])

  const focusPost = (index: number) => () => {
    // Handle focus, if necessary (based on the platform)
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    })
  }

  const sendHug = (post: Post) => (hugged: boolean) => {
    mutate({
      ...post,
      num_hugs: hugged ? post.num_hugs + 1 : post.num_hugs - 1,
    })
  }

  const sendReply = (post: Post) => (text: string) => {
    mutate({
      ...post,
      comments: {
        ...post.comments,
        [Object.keys(post.comments).length + 1]: {
          display_name: "You",
          text,
          id: Object.keys(post.comments).length + 1,
          created_at: new Date().toISOString(),
        },
      },
    })
  }

  const renderFeedCard = ({ item, index }: { item: Post; index: number }) => {
    const { assessment, title, id, comments, num_hugs } = item
    return (
      <FeedCard
        onHug={sendHug(item)}
        key={id}
        title={title}
        content={assessment}
        comments={comments}
        onExpand={focusPost(index)}
        hugs={num_hugs}
        onReply={sendReply(item)}
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
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
          ref={flatListRef}
          onEndReachedThreshold={0.2} // Trigger fetching when 20% from the bottom
          ListFooterComponent={
            isFetching ? <ActivityIndicator animating={isFetching} /> : null
          }
        />
      </KeyboardAvoidingView>
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
