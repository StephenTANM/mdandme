import { Comment } from "@/requests"

const groupComments = (comments: Record<string, Comment>) => {
  const grouped: { [key: string]: Comment & { children: Comment[] } } = {}

  // Initialize parent comments
  Object.values(comments).forEach((comment) => {
    if (!comment.parent_id) {
      grouped[comment.id] = { ...comment, children: [] }
    }
  })

  // Add children to their respective parents
  Object.values(comments).forEach((comment) => {
    if (comment.parent_id && grouped[comment.parent_id]) {
      grouped[comment.parent_id].children.push(comment)
    }
  })

  return Object.values(grouped)
}

export default groupComments
