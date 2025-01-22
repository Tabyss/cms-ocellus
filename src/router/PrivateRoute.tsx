import React from 'react'
import ROUTE_NAME from './routeName'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateOutlet: React.FC = () => {
    const token = localStorage?.getItem('access_token')
    if (!token) return <Navigate to={ROUTE_NAME?.LOGIN} />

    return <Outlet />
}

export default PrivateOutlet