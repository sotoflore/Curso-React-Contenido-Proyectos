import { Outlet } from "react-router"


const AuthLayout = () => {
  return (
      <>
          <header>auth header</header>
          <main>
              <Outlet />
          </main>
          <footer>auth footer</footer>
      </>
  )
}

export default AuthLayout