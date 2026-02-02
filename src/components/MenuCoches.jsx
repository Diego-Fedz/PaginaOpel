import useFetch from '../hooks/useFetch.js';
import { useContext } from 'react';
import { RootContext } from '../context/RootContext.jsx';
import { Link } from 'react-router-dom';
const MenuCoches = () => {
    //Asi es como sacamos y pintamos los datos de las comunidades con el hook useFetch
    const { endpoint, tipo } = useContext(RootContext);
    const { data, loading, error } = useFetch(endpoint);
    const { setEndpoint } = useContext(RootContext);
    //Con el end point le digo la ruta de la que tiene que sacar los datos segun la comunidad que pulse
    // si id = 0 saca todos los parques debido a lo de españa, si no saca los parques de la comunidad seleccionada

    if (loading) return <p>Loading...</p>;
    if (error) return <div className='p-5'>Sorry: {error.message}</div>;
    if (!data || !data.modelos) return <p>No models available</p>;
    if (error) return <div className='p-5'>Sorry: {error.message}</div>;

    const modelosFiltrados = tipo === "TODOS"
        ? data.modelos
        : data.modelos.filter(m => m.tipo === tipo);

   // Elimina duplicados basándose en el nombre o id
    const modelosUnicos = modelosFiltrados.filter(
        (modelo, index, self) =>
            index === self.findIndex(m => m.id === modelo.id && m.nombre === modelo.nombre)
    );

    return (
        !loading && (
            <div className="container shadow">
                <div className="row justify-content-center px-4 pt-4">
                    {modelosUnicos.map((modelo) => (
                        <div key={modelo.id} className="col-12 col-md-6 col-lg-4 mb-4">
                            <Link to={`/modelo/${modelo.id}/acabados`} className="text-decoration-none w-100" state={{ modelo }}>
                                <div className="card h-100">
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{modelo.nombre}</h5>
                                        <img
                                            src={modelo.imagen}
                                            alt={modelo.nombre}
                                            className="img-fluid mb-3"
                                        />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        )
    );
}
export default MenuCoches;