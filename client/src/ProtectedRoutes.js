import { Navigate, Outlet } from 'react-router-dom';
import React from 'react'

function ProtectedRoutes() {
    const LoggedIn = sessionStorage.getItem('LoggedIn');
    if (LoggedIn) {
        return <Outlet />
    } else {
        return <Navigate to='/login' />
    }
}


export { ProtectedRoutes }