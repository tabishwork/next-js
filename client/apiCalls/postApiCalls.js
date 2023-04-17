import axios from "axios"

export async function getPosts() {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      return res.data
 
    }

export async function getPostDetails(postId) {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      return res.data
    }