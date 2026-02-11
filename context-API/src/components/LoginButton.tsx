import { useAuth } from "../hooks/use-auth";



export const LoginButton = () => {
    const { user, login} = useAuth();
    
  return (
      <button
          className='btn btn-primary'
          onClick={login}
      > LoginButton {user ? `(${user.name})` : 'Sin conexion'}</button>
  )
}
