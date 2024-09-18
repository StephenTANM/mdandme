import { api } from "@/utils"
import { AxiosResponse } from "axios"
type GetFeedRequestParams = {
  page: number
  limit: number
}

export type Comment = {
  id: number
  parent_id: number | null
  display_name: string
  text: string
  created_at: string
}

export type Post = {
  post_url: string
  title: string
  created_at: string
  num_hugs: number
  patient_description: string
  assessment: string
  question: string
  comments: Record<string, Comment>
  id: string
}

export type Page = {
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
  data: Post[]
}

const getFeedRequest = async (params: GetFeedRequestParams) => {
  try {
    const response = await api.get(
      `/posts?_page=${params.page}&_per_page=${params.limit}`
    )

    return response.data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error("An unknown error occurred")
    }
  }
}

export default getFeedRequest
