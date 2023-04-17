import '@/styles/globals.css'
import { QueryClientProvider,QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()



export default function App({ Component, pageProps }) {

  return(
  <>
   <QueryClientProvider client={queryClient}>
   <Component {...pageProps} />
   <ReactQueryDevtools intialIsOpen={false} position="bottom-right" />
   </QueryClientProvider>
   </>
  )
}

