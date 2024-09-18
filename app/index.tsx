import { FeedCard } from "@/components"
import { useFeed } from "@/hooks"
import { useState } from "react"
import { ActivityIndicator, ScrollView, View } from "react-native"
import {
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native"

const Index = () => {
  const { isFetching, data, fetchNextPage, posts } = useFeed()
  console.log(data)

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent

    // Prevent incrementing page while data is being fetched
    if (
      !isFetching &&
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    ) {
      fetchNextPage()
    }
  }

  console.log(posts, "POSTS")

  if (!data) {
    return null
  }

  return (
    <ScrollView
      style={containerStyle}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      contentContainerStyle={contentContainerStyle}
    >
      {posts.map(({ assessment, title, id }) => (
        <FeedCard key={id} title={title} content={assessment} />
      ))}

      <ActivityIndicator animating={isFetching} />
    </ScrollView>
  )
}

const { containerStyle, contentContainerStyle } = StyleSheet.create({
  containerStyle: {
    backgroundColor: "#F3F6F9",
    padding: 10,
  },
  contentContainerStyle: {
    gap: 16,
  },
})

export default Index
