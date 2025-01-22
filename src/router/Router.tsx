import React, { LazyExoticComponent, lazy } from 'react'
import MainLayout from '../components/MainLayout'
import { ROUTE_NAME } from '.'
import { Error } from '../pages'
import { Route, Routes } from 'react-router-dom'
import GuestOutlet from './GuestRoute'
import PrivateOutlet from './PrivateRoute'

const Login: LazyExoticComponent<any> = lazy(() => import('../pages/Login/Login'))
const News: LazyExoticComponent<any> = lazy(() => import('../pages/News/News'))
const CreateNews: LazyExoticComponent<any> = lazy(() => import('../pages/News/components/CreateNews/CreateNews'))
const ContactUs: LazyExoticComponent<any> = lazy(() => import('../pages/ContactUs/ContactUs'))


const Router: React.FC = () => {
    return (
        <Routes>
            <Route element={<GuestOutlet />}>
                <Route path={ROUTE_NAME?.LOGIN} element={<Login />} />
            </Route>
            <Route element={<PrivateOutlet />}>
                <Route element={<MainLayout />}>
                    <Route path={ROUTE_NAME?.HOME} element={<News />} />
                    <Route path={ROUTE_NAME?.CREATE_NEWS} element={<CreateNews />} />
                    <Route path={ROUTE_NAME?.UPDATE_NEWS} element={<CreateNews />} />
                    <Route path={ROUTE_NAME?.CONTACT_US} element={<ContactUs />} />
                </Route>
            </Route>
            <Route path='/*' element={<Error errorCode={404} errorMessage='PAGE NOT FOUND' />} />
        </Routes>
    )
}

export default Router