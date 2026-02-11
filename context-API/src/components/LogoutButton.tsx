import { useAuth } from "../hooks/use-auth";


export const LogoutButton = () => {
     const {logout } = useAuth();
  return (
    <button className='btn btn-danger' onClick={logout}>Logout</button>
  )
}
