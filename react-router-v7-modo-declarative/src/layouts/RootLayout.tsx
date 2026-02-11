
import { Outlet } from 'react-router'

const RootLayout = () => {
    return (
        <div className='container'>
            <Outlet />
        </div>
    )
}

export default RootLayout