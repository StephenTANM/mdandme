import { getPostRequest } from "@/requests"
import updatePost from "@/requests/updatePost.request"

import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query"

const usePost = ({ id }: { id: string }) => {
  const query: UseQueryResult<any> = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostRequest({ id }),
    placeholderData: {
      post_url: "",
      title: "",
      created_at: "",
      num_hugs: 0,
      patient_description: "",
      assessment: "",
      question: "",
      comments: {},
      id: "",
    },
  })

  const { mutate } = useMutation({
    mutationFn: updatePost,
    onSuccess: async () => {
      await query.refetch()
    },
  })

  return { ...query, mutate }
}

export default usePost
