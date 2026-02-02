import { useContext } from 'react';
import { RootContext } from '../context/RootContext.jsx';

export function useUser() {
    const { setUsuario, setIsAuthenticated, setError } = useContext(RootContext);

    const login = async (nick, pass) => {
        try {
            const response = await fetch(`http://www.ies-azarquiel.es/paco/apiopel/usuario?nick=${nick}&pass=${pass}`);
            if (!response.ok) {
                throw new Error('Error al obtener el usuario');
            }

            const data = await response.json();
            if (data.usuario === null) {
                setIsAuthenticated(false);
                setError('Usuario o contraseña incorrectos');
            } else {
                setUsuario(data.usuario)
                setIsAuthenticated(true);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const logout = () => {
        setUsuario(null);
        setIsAuthenticated(false);
        setError(null);
    };

    const register = async (nick, pass) => {
        try {
            const response = await fetch(`http://www.ies-azarquiel.es/paco/apiopel/usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nick, pass }),
            });
            if (!response.ok) {
                throw new Error('Error al registrar el usuario');
            }
            // Registro exitoso, iniciar sesión automáticamente
            await login(nick, pass);
        } catch (err) {
            setError(err.message);
        }
    };

    return { login, logout, register };

};