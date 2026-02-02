
import useFetch from '../hooks/useFetch.js';
import { Link, useParams, useLocation } from 'react-router-dom';

const DetalleCoche = () => {
    const { idmodelo } = useParams();
    //const modelo = useLocation().state;
    const location = useLocation();
    const modelo = location.state?.modelo;
    const { data, loading, error } = useFetch(`/api/modelo/${idmodelo}/acabados`);

    return (
        !loading && (
            <div className="container shadow">
                <div className="row justify-content-center px-4 pt-4">
                    <div className="col-md-8 mb-4">
                        <div className="card h-100">
                            <div className="card-body text-center">
                                <h2 className="card-title mb-4">{modelo.nombre}</h2>
                                <img
                                    src={modelo.imagen}
                                    alt={modelo.nombre}
                                    className="img-fluid mb-5"
                                />
                                {data.acabados.length > 0 && (
                                    <h3 className="mb-4">Acabados disponibles:</h3>
                                )}
                                <div className="accordion" id="acabadosAccordion">
                                    {data.acabados.map((acabado, index) => (
                                        <div className="accordion-item" key={acabado.id}>
                                            <h2 className="accordion-header" id={`heading${index}`}>
                                                <button
                                                    className="accordion-button collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#collapse${index}`}
                                                    aria-expanded="false"
                                                    aria-controls={`collapse${index}`}
                                                >
                                                    {acabado.nombre}
                                                </button>
                                            </h2>
                                            <div
                                                id={`collapse${index}`}
                                                className="accordion-collapse collapse"
                                                aria-labelledby={`heading${index}`}
                                                data-bs-parent="#acabadosAccordion"
                                            >
                                                <div className="accordion-body">
                                                    <ul>
                                                        {acabado.items.map((item, i) => (
                                                            <li key={i} className='text-start'>{item.nombre}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
export default DetalleCoche;