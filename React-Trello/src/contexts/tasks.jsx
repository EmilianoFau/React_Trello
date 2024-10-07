import { createContext, useContext, useState } from "react";

export const TareasContext = createContext();

export const useTareas = () => {
    return useContext(TareasContext);
}

export function TareasProvider ({ children }) {
    const [tareas, setTareas] = useState([]);

    return (
        <TareasContext.Provider value={{tareas, setTareas}}>
            {children}
        </TareasContext.Provider>
    );
};