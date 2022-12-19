import React, {useState} from 'react';
import userIcon from '../../static/img/account.svg'

const AdminTop = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const handleLogout = () => {

    }

    return <div className="adminTop">
        <span className="adminTop__header">
            Panel administratora: Diet Centrum
        </span>

        <button className="adminTop__btn" onClick={() => { setMenuVisible(p => !p); }}>
            <img className="img" src={userIcon} alt="menu" />
        </button>

        {menuVisible ? <div className="adminTop__menu">
            <a className="btn btn--adminTopMenu" href="/zmiana-hasla">
                Zmień hasło
            </a>
            <button className="btn btn--adminTopMenu" onClick={() => { handleLogout(); }}>
                Wyloguj się
            </button>
        </div> : ''}
    </div>
};

export default AdminTop;
