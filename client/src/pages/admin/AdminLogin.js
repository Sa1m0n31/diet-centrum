import React, {useState} from 'react';
import logo from '../../static/img/logo.png'

const AdminLogin = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if(login && password) {

        }
    }

    return <div className="container container--login center">
        <div className="loginForm shadow">
            <figure className="loginForm__logo">
                <img className="img" src={logo} alt="diet-centrum" />
            </figure>
            <label className="label">
                <input className="input"
                       placeholder="Login"
                       value={login}
                       onChange={(e) => { setLogin(e.target.value); }} />
            </label>
            <label className="label">
                <input className="input"
                       type="password"
                       placeholder="Hasło"
                       value={password}
                       onChange={(e) => { setPassword(e.target.value); }} />
            </label>
            <button className="btn btn--loginSubmit" onClick={(e) => { handleLogin(); }}>
                Zaloguj się
            </button>
        </div>
    </div>
};

export default AdminLogin;
