import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children, admin }) {
    const { loggedIn, user } = useAuth()

    if (admin && user.role !== 'admin') {
        return <Navigate to={{ pathname: "/" }} />
    }

    if (!loggedIn) {
        return <Navigate to={{ pathname: "/" }} />
    }
    return children
}
