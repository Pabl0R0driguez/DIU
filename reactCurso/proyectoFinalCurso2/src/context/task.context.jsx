import { createContext } from "react";

const TasksContext = createContext

function TaskProviderContext(props){
    const [tasks, setTasks] = useState([
        [
            {
              "id": 1,
              "title": "Cocinar",
              "completed": false
            },
            {
              "id": 2,
              "title": "Estudiar",
              "completed": false
            },
            {
              "id": 3,
              "title": "Leer",
              "completed": false
            },
            {
              "id": 4,
              "title": "Ejercicio",
              "completed": false
            },
            {
              "id": 5,
              "title": "Limpiar",
              "completed": false
            },
            {
              "id": 6,
              "title": "Trabajar",
              "completed": false
            },
            {
              "id": 7,
              "title": "Comprar comida",
              "completed": false
            },
            {
              "id": 8,
              "title": "Llamar a mamá",
              "completed": false
            }
          ]
          
    ]); 

    return (
        <TasksContext.Provider value={{tasks, setTasks }}>
            {props.children}
        </TasksContext.Provider>
    )
}