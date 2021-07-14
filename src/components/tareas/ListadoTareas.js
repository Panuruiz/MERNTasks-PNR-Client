import React, {Fragment, useContext} from 'react'
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from "../../context/tareas/tareaContext";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTareas = () => {

    // Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    // Obtener las tareas del proyecto
    const tareasContext = useContext(TareaContext);
    const { tareasproyecto } = tareasContext;

    // Si no hay proyecto seleccionado
    if(!proyecto) return <h2>Select a project to start creating tasks</h2>;

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;


    // Eliminar un proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id);
    };

    return ( 
        <Fragment>
            <h2>Project: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                { tareasproyecto.length === 0
                    ?
                        (
                            <li className="tarea">
                                <p>There are no Tasks</p>
                            </li>
                        )
                    : <TransitionGroup>
                        {tareasproyecto.map(tarea => (
                            <CSSTransition
                                key={tarea._id}
                                timeout={350}
                                classNames="tarea"
                            >
                                <Tarea
                                    
                                    tarea={tarea}

                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                            
                 }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Delete Project</button>
        </Fragment>
        
     );
}
 
export default ListadoTareas;