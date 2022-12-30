import React from 'react';
import {menu} from "../../helpers/admin/content";

const AdminQuickMenu = () => {
    return <div className="admin__start__section">
        <h3 className="admin__start__section__header">
            Szybki dostęp
        </h3>
        <div className="admin__start__statsWrapper">
            {menu.map((item, index) => {
                return <a className="admin__start__stats" key={index} href={item.link}>
                    <span className="admin__start__stats__value">
                        <img className="quickImg" src={item.icon} alt="modele" />
                    </span>
                    <span className="admin__start__stats__key">
                        {item.name}
                    </span>
                </a>
            })}
        </div>
    </div>
};

export default AdminQuickMenu;
