import { getFeedRequest, Page, Post } from "@/requests"
import updatePost from "@/requests/updatePost.request"

import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query"
import { useMemo } from "react"

type PagesData = {
  pages: Page[]
  pageParams: number[]
}

const DEFAULT_LIMIT = 5
type UseFeedResult = UseInfiniteQueryResult<PagesData> &
  UseMutationResult & {
    posts: Post[]
  }

const useFeed = (): UseFeedResult => {
  const query: UseInfiniteQueryResult<PagesData> = useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: ({ pageParam }) => {
      return getFeedRequest({ page: pageParam, limit: DEFAULT_LIMIT })
    },
    initialPageParam: 1,
    getNextPageParam: (pages) => {
      return pages.next
    },
    placeholderData: {
      pages: [],
      pageParams: [],
    },
  })

  const posts = useMemo(
    () =>
      query.data?.pages.reduce<any[]>(
        (acc: any[], page: Page) => [...acc, ...page.data],
        []
      ),
    [query.data]
  )

  return { ...query, posts } as UseFeedResult
}

export default useFeed
