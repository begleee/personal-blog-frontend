import React from 'react'
import { Navigate, Outlet } from 'react-router';

export default function ProtectedRoute({ allowedRoles }) {
    const userProfile = JSON.parse(localStorage.getItem("user_profile"));

    if(!userProfile) {
        return <Navigate to="/login" replace/>
    }

    if(allowedRoles && !allowedRoles.includes(userProfile?.role)) {
        return <Navigate to="/error" replace />
    }

    return <Outlet/>;
}
