import { Outlet } from "react-router"


const PublicLayout = () => {
    return (
        <>
            <header>public header</header>
            <main>
                <Outlet />
            </main>
            <footer>public footer</footer>
        </>
    )
}

export default PublicLayout