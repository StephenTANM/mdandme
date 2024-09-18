import { api } from "@/utils"
import { AxiosResponse } from "axios"
import { Post } from "./getFeed.request"

const updatePost = async (post: Post) => {
  try {
    const response: AxiosResponse = await api.patch(`/posts/${post.id}`, post)

    return response.data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error("An unknown error occurred")
    }
  }
}

export default updatePost
