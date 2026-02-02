import logo from '../assets/logo.png';
import { useState } from 'react';
import useFetch from '../hooks/useFetch.js';
import { useContext } from 'react';
import { RootContext } from '../context/RootContext.jsx';
import { useUser } from '../hooks/useUser.js';
import { useEffect } from 'react';
import Login from './Login.jsx';
import Register from './Register.jsx';
import { Link } from 'react-router-dom';
import Citas from './Citas.jsx';
const Header = ({ tipo }) => {
    const { data, loading, error } = useFetch('/api/tipos');
    const [tipoSeleccionado, setTipoSeleccionado] = useState("TODOS");
    const { setTipo } = useContext(RootContext); // guardamos tipo seleccionado en el contexto

    const handleOnClickTipo = (tipo) => {
        setTipo(tipo); // actualiza el tipo en el contexto
        setTipoSeleccionado(tipo);
    }

    //variable de estado para abri/cerrar el modal de login
    const [showLogin, setShowLogin] = useState(false);
    //variable de estado para abri/cerrar el modal de registro
    const [showRegister, setShowRegister] = useState(false);
    //variable de estado para abri/cerrar el modal de cita
    const [showCita, setShowCita] = useState(false);
    //variables para controlar al usuario
    const { usuario, isAuthenticated, setError } = useContext(RootContext);
    const { logout } = useUser();
    // si surge un error al loguearse, lo mostramos 3 segundos y luego lo ocultamos
    useEffect(() => {
        if (!error) return;
        const t = setTimeout(() => setError(null), 3000);
        return () => clearTimeout(t);
    }, [error, setError]);

    return (
        <div className="container shadow ">
            <header>
                <div className="row justify-content-between align-items-center">
                    <div className="col-12 col-md-4 text-center text-md-start">
                        <Link to="/">
                            <img src={logo} alt="" className='w-25 pt-3 ps-3 pb-3' />
                        </Link>
                    </div>
                    <div className="col-12 col-md-4 text-center">
                        {loading && <p>Loading types...</p>}
                        {error && <p>Error loading types: {error.message}</p>}
                        {!loading && !error && (
                            <nav className="d-flex justify-content-center flex-nowrap">
                                <button
                                    className="nav-link btn btn-link text-dark pe-3"
                                    onClick={() => handleOnClickTipo("TODOS")}
                                    style={{ whiteSpace: 'nowrap' }}
                                >Todos</button>
                                {data.tipos.map((tipo) => (
                                    <button
                                        key={tipo.id}
                                        className="nav-link btn btn-link text-dark pe-3"
                                        onClick={() => handleOnClickTipo(tipo.nombre)}
                                        style={{ whiteSpace: 'nowrap' }}
                                    >
                                        {tipo.nombre}
                                    </button>
                                ))}
                            </nav>
                        )}
                    </div>
                    <div className="col-12 col-md-4 text-center text-md-end">
                        {!isAuthenticated ? (
                            <span class="d-flex align-items-center justify-content-end gap-3">
                                <button class="btn btn-secondary fs-4" onClick={() => setShowRegister(true)}>
                                    Register
                                </button>
                                <button class="btn btn-secondary fs-4" onClick={() => setShowLogin(true)}>
                                    Login
                                </button>
                            </span>) : (
                            <span class="d-flex align-items-center justify-content-end gap-3">
                                <span className="fs-2 text-secondary">Welcome {usuario.nick}!</span>
                                <button class="btn btn-secondary fs-4" onClick={logout}>
                                    Logout
                                </button>
                                <button className="btn btn-primary fs-7" onClick={() => setShowCita(true)}>
                                    Pedir Cita
                                </button>
                            </span>
                        )}
                    </div>
                </div>
                <section>
                    {/* Renderizado condicional del modal de login */}
                    {showLogin && (
                        // ponemos un fondo oscuro semi-transparente que cubre toda la pantalla
                        <div
                            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                            style={{ background: "rgba(0,0,0,0.5)", zIndex: 10 }}
                            onMouseDown={() => setShowLogin(false)} // cerrar al hacer clic fuera de la modal
                        >
                            {/* Contenido del modal */}
                            <div
                                className="bg-white rounded p-4"
                                style={{ width: 360, maxWidth: "95%" }}
                                onMouseDown={(e) => e.stopPropagation()} // evitar cerrar al hacer clic dentro de la modal pues pasaría el evento al fondo
                            >
                                <Login onClose={() => setShowLogin(false)} />
                            </div>
                        </div>
                    )}
                    {/* Renderizado condicional del modal de register */}
                    {showRegister && (
                        // ponemos un fondo oscuro semi-transparente que cubre toda la pantalla
                        <div
                            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                            style={{ background: "rgba(0,0,0,0.5)", zIndex: 10 }}
                            onMouseDown={() => setShowRegister(false)} // cerrar al hacer clic fuera de la modal
                        >
                            {/* Contenido del modal */}
                            <div
                                className="bg-white rounded p-4"
                                style={{ width: 360, maxWidth: "95%" }}
                                onMouseDown={(e) => e.stopPropagation()} // evitar cerrar al hacer clic dentro de la modal pues pasaría el evento al fondo
                            >
                                <Register onClose={() => setShowRegister(false)} />
                            </div>
                        </div>
                    )}
                    {/* Renderizado condicional del modal de cita */}
                    {showCita && (
                        // ponemos un fondo oscuro semi-transparente que cubre toda la pantalla
                        <div
                            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                            style={{ background: "rgba(0,0,0,0.5)", zIndex: 10 }}
                            onMouseDown={() => setShowCita(false)} // cerrar al hacer clic fuera de la modal
                        >
                            {/* Contenido del modal */}
                            <div
                                className="bg-white rounded p-4"
                                style={{ width: 360, maxWidth: "95%" }}
                                onMouseDown={(e) => e.stopPropagation()} // evitar cerrar al hacer clic dentro de la modal pues pasaría el evento al fondo
                            >
                                <Citas onClose={() => setShowCita(false)} />
                            </div>
                        </div>
                    )}
                    {/* Toast de errores */}
                    {error && (
                        <div className="alert alert-danger position-fixed top-0 start-50 translate-middle-x mt-3" role="alert">
                            <div className="d-flex justify-content-between align-items-start">
                                <div className="me-2">{error}</div>
                            </div>
                        </div>
                    )}
                </section>
            </header>
        </div >
    );
};

export default Header;