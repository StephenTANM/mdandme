import { api } from "@/utils"

type getPostRequestParams = {
  id: string
}

const getPostRequest = async (params: getPostRequestParams) => {
  try {
    const response = await api.get(`/posts/${params.id}`)

    return response.data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error("An unknown error occurred")
    }
  }
}

export default getPostRequest
