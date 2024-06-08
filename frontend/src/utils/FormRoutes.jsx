import { Outlet, Navigate } from 'react-router-dom'

const FormRoutes = () => {
    let token = localStorage.getItem('token');
    let auth =  {'token' : token}
    let applicationFormCompleted = localStorage.getItem('applicationFormCompleted');
    let completed = {'applicationFormCompleted' : applicationFormCompleted === "true"}

    return (
        auth.token && !completed.applicationFormCompleted ? <Outlet/> : <Navigate to = '/dashboard'/>
    )
}

export default FormRoutes