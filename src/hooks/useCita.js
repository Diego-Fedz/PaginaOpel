
import { useContext } from 'react';
import { RootContext } from '../context/RootContext.jsx';

export const useCita = () => {
    const { setError } = useContext(RootContext);

    const pedirCita = async (usuarioId, modeloId, fecha) => {
        try {
            const response = await fetch(`/api/modelo/${modeloId}/cita`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    usuario: usuarioId,
                    modelo: modeloId,
                    fecha: fecha
                }),
            });

            if (!response.ok) throw new Error('Error al pedir la cita');

            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    
    return { pedirCita };
};


