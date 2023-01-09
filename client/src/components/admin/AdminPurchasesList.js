import React, {useEffect, useState} from 'react';
import editIcon from "../../static/img/edit.svg";
import {getAllPurchases} from "../../helpers/api/purchase";
import {getDaysBetweenTwoDays} from "../../helpers/api/others";

const AdminPurchasesList = () => {
    const [purchases, setPurchases] = useState([]);
    const [filteredPurchases, setFilteredPurchases] = useState([]);
    const [filterType, setFilterType] = useState(0);

    useEffect(() => {
        getAllPurchases()
            .then((res) => {
                if(res?.status === 200) {
                    setPurchases(res.data?.sort((a, b) => {
                        return a.id > b.id ? -1 : 1;
                    }));
                }
            });
    }, []);

    useEffect(() => {
        if(purchases?.length) {
            setFilteredPurchases(purchases);
        }
    }, [purchases]);

    useEffect(() => {
        switch(filterType) {
            case 0:
                setFilteredPurchases(purchases);
                break;
            case 1:
                setFilteredPurchases(purchases.filter((item) => (item.status === 'W realizacji')));
                break;
            case 2:
                setFilteredPurchases(purchases.filter((item) => (item.status === 'Zrealizowane')));
                break;
            default:
                break;
        }
    }, [filterType]);

    return <main className="admin">
        <div className="admin__header flex">
            <h1 className="admin__header">
                Lista zamówień
            </h1>
        </div>

        <div className="admin__purchase__filter flex flex--start">
            <h2 className="admin__purchase__filter__header">
                Filtruj zamówienia:
            </h2>

            <label className={filterType === 0 ? "adminSelect" : ""}>
                <button className="btn btn--adminSelect" onClick={() => { setFilterType(0); }}>

                </button>
                Wszystkie
            </label>
            <label className={filterType === 1 ? "adminSelect" : ""}>
                <button className="btn btn--adminSelect" onClick={() => { setFilterType(1); }}>

                </button>
                W realizacji
            </label>
            <label className={filterType === 2? "adminSelect" : ""}>
                <button className="btn btn--adminSelect" onClick={() => { setFilterType(2); }}>

                </button>
                Zrealizowane
            </label>
        </div>

        <div className="admin__products">
            {filteredPurchases.map((item, index) => {
                const sendDateObject = JSON.parse(item.send_date);
                const sendDate = new Date(sendDateObject.year, sendDateObject.monthNumber-1, sendDateObject.day);

                const daysToGo = getDaysBetweenTwoDays(sendDate, new Date());

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
                            Status
                        </span>
                        <span className="value">
                            {item.status === 'W realizacji' ? <span className="red">
                            W realizacji
                        </span> : <span className="green">
                            Zrealizowane
                        </span>}
                        </span>
                    </div>
                    <div className="admin__products__item__column">
                        <span className="key">
                            Dni do wysłania
                        </span>
                        <span className="value">
                            {daysToGo > 0 ? daysToGo : (daysToGo === 0) ? <span className="red">Dzisiaj</span> : 'Wysłano'}
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
