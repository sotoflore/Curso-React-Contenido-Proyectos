import { Link, useNavigate } from 'react-router'

const NotFoundPage = () => {

    const navigate = useNavigate();


  return (
      <div>
          <h1>404 Not Found</h1>
          <p>La página que buscas no existe</p>
          <Link className='btn btn-info me-2' to='/'>Volver al inicio con NavLink</Link>
          <button onClick={() => navigate('/')} className='btn btn-primary'>regresar con navigate</button>
    </div>
  )
}

export default NotFoundPage