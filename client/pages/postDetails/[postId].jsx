import { getPostDetails} from '@/apiCalls/postApiCalls'
import React from 'react'

export default function PostDetails({post}) {
  return (
    <div>
        {post.title}
        <h1>{post.body}</h1>
    </div>
  )
}


  export async function getServerSideProps(context) {
    const {params} = context
    const post = await getPostDetails(params.postId)
    console.log(params)
    return {
      props: {
        post
      }
    }
  }