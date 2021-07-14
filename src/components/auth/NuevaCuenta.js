import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/authentication/authContext';

const NuevaCuenta = (props) => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;


    // En caso de que el usuario se haya autenticado, registrado, 
    // o sea un registro duplicado
    useEffect(() => {
        if(autenticado) {
            props.history.push('/proyectos');
        }

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mensaje, autenticado, props.history])

     // State para iniciar sesión
     const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''    
    })

    // Extraer de usuario
    const {nombre, email, password, confirmar} = usuario;

    const onChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    // Cuando el usuario quiere iniciar sesión
    const onSubmit = e => {
        e.preventDefault();

        // Validar que no haya campos vacíos
        if(
            nombre.trim() === '' || 
            email.trim() === '' ||
            password.trim() === '' ||
            confirmar.trim() === '' ) {
                mostrarAlerta('Todos los campos son obligatorios', "alerta-error");
                return;
            }

        // Password mínimo de 6 caracteres
        if(password.length < 6 ) {
            mostrarAlerta('El Password debe contener al menos 6 caracteres', "alerta-error");
            return;
        }

        // Los dos passwords son iguales
        if(password !== confirmar) {
            mostrarAlerta('Las Passwords no son iguales', "alerta-error");
            return;
        }

        // Pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        });

    }

    return ( 
        <div className="form-usuario">
            {alerta ?  ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Create a new account</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="nombre"
                            name="nombre"
                            placeholder="Your Name"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">E-Mail</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email"
                            placeholder="Your E-Mail"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            placeholder="Give a new Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repeat your new Password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block" 
                            value="Register"
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Back to Log-In
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;