import { useState } from 'react';
import { useUser } from '../hooks/useUser';
const Login = ({ onClose }) => {
    const [nick, setNick] = useState('');
    const [pass, setPass] = useState('');
    const { login } = useUser();

     const handleSubmit = async (e) => {
        e.preventDefault();
        await login(nick, pass);
        onClose();
    };

    return (
        <div className="login-container">
            <h2 className="bg-secondary text-white text-center mb-4 p-1">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <label htmlFor="nick">Nick:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="nick"
                        value={nick}
                        onChange={(e) => setNick(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="pass">Password:</label>
                    <input
                        className="form-control"
                        type="password"
                        id="pass"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        required
                    />
                </div>
                <div className="d-flex justify-content-end">
                    <button type="button" className='btn btn-secondary fs-5 me-2' onClick={onClose}>Cancelar</button>
                    <button type="submit" className="btn btn-secondary fs-5">Iniciar sesión</button>
                </div>
            </form>
        </div>
    );
};

export default Login;