import React from 'react';
import {menu} from "../../helpers/admin/content";
import logo from '../../static/img/logo.png';

const AdminMenu = ({selectedItem}) => {
    return <div className="adminMenu">
        <figure className="adminMenu__logo">
            <img className="img" src={logo} alt="logo" />
        </figure>

        {menu.map((item, index) => {
            return <a className={selectedItem === index ? "adminMenu__item adminMenu__item--selected" : "adminMenu__item"}
                      key={index}
                      href={item.link}>
                <img className="img" src={item.icon} alt="ikonka" />
                <span>
                    {item.name}
                </span>
            </a>
        })}
    </div>
};

export default AdminMenu;
