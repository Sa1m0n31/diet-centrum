import React, {useEffect, useState} from 'react';
import editIcon from "../../static/img/edit.svg";
import {getAllPurchases} from "../../helpers/api/purchase";

const AdminPurchasesList = () => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        getAllPurchases()
            .then((res) => {
                if(res?.status === 200) {
                    setPurchases(res.data);
                }
            });
    }, []);

    return <main className="admin">
        <div className="admin__header flex">
            <h1 className="admin__header">
                Lista zamówień
            </h1>
        </div>

        <div className="admin__products">
            {purchases.map((item, index) => {
                return <div className="admin__products__item flex" key={index}>
                    <div className="admin__products__item__column">
                        <span className="value">
                            #{item.id}
                        </span>
                    </div>
                    <div className="admin__products__item__column">
                        <span className="key">
                            Imię i nazwisko
                        </span>
                        <span className="value">
                            {item.first_name} {item.last_name}
                        </span>
                    </div>
                    <div className="admin__products__item__column">
                        <span className="key">
                            E-mail
                        </span>
                        <span className="value">
                            {item.email_to_send}
                        </span>
                    </div>
                    <div className="admin__products__item__column">
                        <span className="key">
                            Wartość zamówienia
                        </span>
                        <span className="value">
                            {item.sum} PLN
                        </span>
                    </div>
                    <div className="admin__products__item__column">
                        <span className="key">
                            Działania
                        </span>
                        <span className="value value--flex">
                            <a className="btn btn--productList" href={`/panel/szczegoly-zamowienia?id=${item.id}`}>
                                <img className="img" src={editIcon} alt="edytuj" />
                            </a>
                        </span>
                    </div>
                </div>
            })}
        </div>
    </main>
};

export default AdminPurchasesList;
