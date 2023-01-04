import React, {useEffect, useState} from 'react';
import logo from '../../static/img/logo.png'
import {authAdmin, loginAdmin} from "../../helpers/api/admin";
import Cookies from "universal-cookie";
import {errorText} from "../../helpers/admin/content";
import Loader from "../../components/admin/Loader";
import LoadingPage from "../shop/LoadingPage";

const AdminLogin = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [render, setRender] = useState(false);

    useEffect(() => {
        authAdmin()
            .then((res) => {
                if(res.status === 201) {
                    window.location = '/panel';
                }
                setRender(true);
            })
            .catch(() => {
                setRender(true);
            })
    }, []);

    useEffect(() => {
        if(error) {
            setLoading(false);
        }
    }, [error]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if(login && password) {
            setLoading(true);
            try {
                const loginResult = await loginAdmin(login, password);
                if(loginResult.status === 201) {
                    const jwt = loginResult?.data?.access_token;
                    if(jwt) {
                        const cookies = new Cookies();
                        cookies.set('access_token_admin', jwt, { path: '/' });
                        cookies.set('username', login, { path: '/' });
                        cookies.set('role', 'admin', { path: '/' });
                        window.location = '/panel';
                    }
                    else {
                        setError(errorText);
                    }
                }
                else {
                    setError('Niepoprawny login lub hasło');
                }
            }
            catch(e) {
                setError('Niepoprawny login lub hasło');
            }
        }
    }

    return render ? <div className="container container--login center">
        <form className="loginForm shadow">
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

            {loading ? <div className="center">
                <Loader />
            </div> : <button className="btn btn--loginSubmit"
                             onClick={(e) => { handleLogin(e); }}>
                Zaloguj się
            </button>}

            {error ? <span className="error text-center">
                {error}
            </span> : ''}
        </form>
    </div> : <LoadingPage />
};

export default AdminLogin;
