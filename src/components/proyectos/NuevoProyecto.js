import React, {Fragment, useState, useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    // Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    // State para proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    })

    // Extraer nombre de proyecto
    const {nombre} = proyecto;


    // Lee los contenidos del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    // Cuando el usuario envía un proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();

        // Validar el proyecto
        if(nombre === '') {
            mostrarError();
            return;
        }
        // agregar el proyecto al State
        agregarProyecto(proyecto);

        // Reiniciar el form
        guardarProyecto({
            nombre: ''
        });
    }

    // Mostrar el formulario
    const onClickFormulario = () => {
        mostrarFormulario();
    }

    //TODO: posibilidad de cerrar el formulario sin agregar un nuevo proyecto
    //TODO: Antes de cerrar sesión, cerrar el formulario de nuevo proyecto  
    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickFormulario}
            >New Project</button>
            
            {
                formulario
                ?
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmitProyecto}
                        >
                            <input 
                                type="text" 
                                className="input-text"
                                placeholder="Project Name"
                                name="nombre"
                                value={nombre}
                                onChange={onChangeProyecto}
                            />
                            <input 
                                type="submit" 
                                className="btn btn-primario btn-block"
                                value="Add Project"
                            />
                        </form>
                    )
                :
                  null }

            {errorformulario 
                ? <p className="mensaje error">A Name is required</p>
                : null
            }

        </Fragment>
        
     );
}
 
export default NuevoProyecto;