import { createContext, useState } from 'react';

export const RootContext = createContext();

export const RootProvider = ({ children }) => {
    const [endpoint, setEndpoint] = useState("api/modeloscontipo");
    const [tipo, setTipo] = useState("TODOS"); // guardamos tipo seleccionado
     const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isNewComment, setIsNewComment] = useState(false);

    return (
        <RootContext.Provider value={{
            endpoint,
            setEndpoint,
            tipo,
            setTipo,
            usuario,
            setUsuario,
            error,
            setError,
            isAuthenticated,
            setIsAuthenticated,
            isNewComment,
            setIsNewComment
        }}>
            {children}
        </RootContext.Provider>
    );
};