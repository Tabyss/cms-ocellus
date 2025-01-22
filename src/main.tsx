import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { RouteProvider } from './router'
import { HelmetProvider } from 'react-helmet-async'
import { Head } from './components'
import { theme } from './theme'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'

const ENV = import.meta.env.VITE_ENV

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
        mutations: {
            retry: false,
        },
    },
})

const MainApp = () => {
    return (
        <RouteProvider>
            <ChakraProvider theme={theme}>
                <HelmetProvider>
                    <Head title='Ocellus' />
                    <QueryClientProvider client={queryClient}>
                        {ENV == 'DEVELOPMENT'
                            ? <ReactQueryDevtools initialIsOpen={false} />
                            : null
                        }
                        <App />
                    </QueryClientProvider>
                </HelmetProvider>
            </ChakraProvider>
        </RouteProvider>
    )
}

ENV == 'DEVELOPMENT' && console.log({ theme })

ENV == 'DEVELOPMENT' && ReactDOM.createRoot(document.getElementById('root')!).render(
    <MainApp />,
)

ENV != 'DEVELOPMENT' && ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MainApp />
    </React.StrictMode>,
)