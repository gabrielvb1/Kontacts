import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import SignUp from './pages/Signup/SignUp';
import { getItem } from './utils/storage';
export default function ProjectRoutes() {
    function ProtectedRoutes({ redirectTo }) {
        const token = getItem('token')
        return token ? <Outlet /> : <Navigate to={redirectTo} />
    }
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<SignUp />}></Route>

            <Route element={<ProtectedRoutes redirectTo={'/'}/>}>
                <Route path='/main' element={<Main/>}/>
            </Route>
        </Routes>
    )
}