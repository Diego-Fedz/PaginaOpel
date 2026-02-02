import { useState } from 'react';
import useFetch from '../hooks/useFetch.js';
import { RootContext } from '../context/RootContext.jsx';
import { useContext } from 'react';
import { useCita } from '../hooks/useCita.js';
const Citas = ({ onClose }) => {
    const { data, loading, error } = useFetch(`/api/modelos`);
    const [modeloSeleccionado, setModeloSeleccionado] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const { usuario, isAuthenticated, setError } = useContext(RootContext);
    const { pedirCita } = useCita();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!modeloSeleccionado) {
            alert('Selecciona un modelo antes de continuar');
            return;
        }
        const fechaHora = `${fecha}T${hora}`;
        const exito = await pedirCita(usuario.id, modeloSeleccionado, fechaHora);
        if (exito) {
            alert('Cita pedida con éxito');
            onClose();
        } else {
            alert('Error al pedir la cita');
        }
    };
    return (
        <div className="login-container">
            <h2 className="bg-secondary text-white text-center mb-4 p-1">Pedir Cita</h2>
            <p className="text-center">
                Buenas {usuario?.nick}, aquí puedes agendar una cita para revisar tu coche.
            </p>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="modelo">Modelo:</label>
                    <select
                        id="modelo"
                        className="form-control"
                        value={modeloSeleccionado}
                        onChange={(e) => setModeloSeleccionado(e.target.value)}
                        required
                    >
                        <option value="">-- Selecciona un modelo --</option>
                        {!loading && data?.modelos?.map((modelo) => (
                            <option key={modelo.id} value={modelo.id}>
                                {modelo.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="fecha">Fecha:</label>
                    <input
                        type="date"
                        id="fecha"
                        className="form-control"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="hora">Hora:</label>
                    <input
                        type="time"
                        id="hora"
                        className="form-control"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        required
                    />
                </div>
                <div className="d-flex justify-content-end">
                <button type="button" className='btn btn-secondary fs-5 me-2' onClick={onClose}>Cancelar</button>
                <button type="submit" className="btn btn-secondary fs-5">Aceptar</button>
        </div>
            </form >
        </div >
    );
}
export default Citas;