import { Router as ReactRouter } from 'react-router-dom'
import { Update, createBrowserHistory } from 'history'
import { 
    ReactNode, 
    useLayoutEffect, 
    useState, 
    startTransition, 
} from 'react'

const history = createBrowserHistory()

type TRouteProvider = {
    children: ReactNode
    basename?: string
}

function RouteProvider(props: TRouteProvider) {
    const { children, basename } = props

    const [routeState, setRouteState] = useState({
        action: history.action,
        location: history.location,
    })

    useLayoutEffect(() => {
        history.listen((update: Update) => {
            startTransition(() => {
                setRouteState(update)
            })
        })
    }, [history])

    return (
        <ReactRouter
            basename={basename}
            location={routeState.location}
            navigationType={routeState.action}
            navigator={history}
        >
            {children}
        </ReactRouter>
    )
}

export default RouteProvider
