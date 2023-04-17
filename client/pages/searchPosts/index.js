import PostComponent, {getServerSideProps} from '@/components/PostComponent'
import React from 'react'

export default function SearchPosts({posts}) {
  return (
    <>
    <PostComponent posts={posts}/>
    </>
  )
}

export {getServerSideProps}