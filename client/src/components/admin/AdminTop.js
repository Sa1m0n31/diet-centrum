import React from 'react';
import logoutIcon from '../../static/img/logout.svg';
import {logoutAdmin} from "../../helpers/api/admin";

const AdminTop = () => {
    return <div className="adminTop">
        <span className="adminTop__header">
            Panel administratora: Diet Centrum
        </span>

        <button className="adminTop__btn center" onClick={() => { logoutAdmin(); }}>
            <img className="img" src={logoutIcon} alt="menu" />
        </button>
    </div>
};

export default AdminTop;
