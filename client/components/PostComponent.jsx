import { getPosts } from '@/apiCalls/postApiCalls'
import Link from 'next/link'
import React from 'react'

export default function PostComponent(posts) {
    console.log(posts)
  return (
    <>
    {posts.posts.map((post) => (
      <div key={post.id}>
        <Link href={`/postDetails/${post.id}`}>{post.title}</Link>
      </div>
    ))}
  </>
  )
}

export async function getServerSideProps() {
    try {
      const posts = await getPosts()
      return {
        props: {
          posts,
        }
      }
    } catch (error) {
      console.error(error)
    } 
      
    }