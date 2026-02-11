
import { Outlet, useLocation } from "react-router"
import AdminNavbar from "../components/AdminNavbar";


const AdminLayout = () => {

    const location = useLocation();

    return (
        <div>
            <header>
                <p>current path : {location.pathname}</p>
                <AdminNavbar/>
            </header>
            <Outlet />
        </div>
    )
}

export default AdminLayout