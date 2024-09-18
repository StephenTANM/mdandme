import updatePost from "@/requests/updatePost.request"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Post } from "@/requests"

const usePostMutation = () => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: updatePost,
    onSettled: async () => {
      return await queryClient.invalidateQueries()
    },
  })

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

  const sendCommentReply = (post: Post) => (commentReply: any) => {
    mutate({
      ...post,
      comments: {
        ...post.comments,
        [Object.keys(post.comments).length + 1]: {
          display_name: "You",
          text: commentReply.text,
          id: Object.keys(post.comments).length + 1,
          parent_id: commentReply.parent_id,
          created_at: new Date().toISOString(),
        },
      },
    })
  }

  return { sendHug, sendReply, sendCommentReply }
}
export default usePostMutation
