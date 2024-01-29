import React from 'react'
import './style.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../Firebase/firebase'
import { Navigate, Outlet } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

function PrivateRoutes() {

    const [user, loading, error] = useAuthState(auth)


    if (loading) {
        return (
            <p className='loading-screen'>
                <LoadingOutlined />
            </p>
        )
    } else if (!user || error) {
        return <Navigate to="/" replace />
    } else {
        return <Outlet />;
    }
}

export default PrivateRoutes;