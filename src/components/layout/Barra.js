import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/authentication/authContext';

const Barra = () => {

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;
 
    useEffect(() => {
        usuarioAutenticado()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return ( 
        <header className="app-header">
            {
                usuario 
                ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> 
                : null
            }
            
            <nav className="nav-principal">
                <button
                    className="btn btn-blank btn-logout cerrar-sesion"
                    onClick={() => cerrarSesion()}
                >Cerrar Sesión</button>
            </nav>
        </header>
     );
}
 
export default Barra;