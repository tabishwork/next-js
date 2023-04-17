import Image from 'next/image'
import { Inter } from 'next/font/google'
import PostComponent, {getServerSideProps} from '@/components/PostComponent'






const inter = Inter({ subsets: ['latin'] })

export default function Home({posts}) {

  return (
    <main>
     <PostComponent posts={posts}/>
    </main>
  )
}

export {getServerSideProps}