import React, {useEffect, useState} from 'react';
import {getPurchaseById} from "../../helpers/api/purchase";
import {getAllProducts} from "../../helpers/api/product";
import {API_URL} from "../../static/settings";
import downloadIcon from '../../static/img/download.svg';

const AdminPurchaseDetails = () => {
    const [purchase, setPurchase] = useState({});
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if(id) {
            getPurchaseById(id)
                .then((res) => {
                    if(res?.status === 200) {
                        const data = res.data;
                        setPurchase({
                            ...data,
                            cart: JSON.parse(data.cart),
                            invoice: data.invoice ? JSON.parse(data.invoice) : null,
                            send_date: JSON.parse(data.send_date)
                        });
                    }
                });

            getAllProducts()
                .then((res) => {
                    if(res?.status === 200) {
                        setProducts(res.data);
                    }
                })
        }
        else {
            window.location = '/panel';
        }
    }, []);

    useEffect(() => {
        if(purchase?.cart && products?.length) {
            setCart(purchase.cart.map((item) => {
                const product = getProductFromList(item.id);
                return {
                    ...product,
                    price: item.price
                }
            }));
        }
    }, [purchase, products]);

    const getProductFromList = (id) => {
        return products.find((item) => (item.id === id));
    }

    return <main className="admin admin--productEdition">
        <div className="admin__main__header admin__main__header--purchaseDetails flex">
            <h1 className="admin__header">
                Szczegóły zamówienia #{purchase.id}
            </h1>

            <h2 className="admin__purchase__emailToSend">
                <span>zamówienie na mail:</span>
                {purchase.email_to_send}
            </h2>
        </div>

        <div className="admin__purchase">
            <div className="flex flex--alignStart flex--start">
                <div className="admin__purchase__section">
                    <h2 className="admin__purchase__section__header">
                        Dane zamawiającego:
                    </h2>
                    <span className="admin__purchase__section__data">
                    {purchase.first_name} {purchase.last_name}
                </span>
                    <span className="admin__purchase__section__data">
                    {purchase.street} {purchase.building}{purchase.flat ? `/${purchase.flat}` : ''}
                </span>
                    <span className="admin__purchase__section__data">
                    {purchase.postal_code} {purchase.city}
                </span>
                    <span className="admin__purchase__section__data">
                    tel: {purchase.phone_number}
                </span>
                    <span className="admin__purchase__section__data">
                    mail: {purchase.email}
                </span>
                </div>
                <div className="admin__purchase__section">
                    {purchase.invoice ? <>
                        <h2 className="admin__purchase__section__header">
                            Dane do faktury:
                        </h2>
                        <span className="admin__purchase__section__data">
                        {purchase.invoice.companyName}
                    </span>
                        <span className="admin__purchase__section__data">
                        {purchase.invoice.street} {purchase.invoice.building}{purchase.invoice.flat ? `/${purchase.invoice.flat}` : ''}
                    </span>
                        <span className="admin__purchase__section__data">
                        {purchase.invoice.postalCode} {purchase.invoice.city}
                    </span>
                        <span className="admin__purchase__section__data">
                        NIP: {purchase.invoice.nip}
                    </span>
                    </> : <h2 className="admin__purchase__section__header">
                        Faktura: NIE
                    </h2>}
                </div>

                <div className="admin__purchase__section">
                    <h2 className="admin__purchase__section__header">
                        Dzień wysłania:
                    </h2>
                    {purchase.send_date ? <span className="paymentStatus paymentStatus--neutral">
                        {purchase.send_date.day} {purchase.send_date.month} {purchase.send_date.year}
                    </span> : ''}
                </div>

                <div className="admin__purchase__section">
                    <h2 className="admin__purchase__section__header">
                        Status płatności:
                    </h2>
                    {purchase.payment_status === 'Opłacone' ? <span className="paymentStatus paymentStatus--positive">
                        Opłacone
                    </span> : <span className="paymentStatus paymentStatus--negative">
                        Nieopłacone
                    </span>}
                </div>
            </div>

            <div className="flex flex--start flex--alignStart">
                <div className="admin__purchase__cart">
                    <h2 className="admin__purchase__section__header">
                        Zamówione produkty:
                    </h2>

                    {cart?.map((item, index) => {
                        return <div className="admin__purchase__cart__item flex flex--start"
                                    key={index}>
                            <figure className="admin__purchase__cart__item__col admin__purchase__cart__item__col--image">
                                <img className="img" src={`${API_URL}/${item.image}`} alt={item.title} />
                            </figure>
                            <span className="admin__purchase__cart__item__col">
                            {item.title}
                        </span>
                            <span className="admin__purchase__cart__item__col">
                            {item.price} zł
                        </span>
                        </div>
                    })}

                    <h3 className="admin__purchase__cart__sum admin__purchase__cart__sum--value">
                        <span>Wersja papierowa:</span> {purchase.paper_version ? 'TAK' : 'NIE'}
                    </h3>
                    <h3 className="admin__purchase__cart__sum admin__purchase__cart__sum--value">
                        <span>Wartość:</span> {purchase.sum + purchase.discount_value} zł
                    </h3>
                    <h3 className="admin__purchase__cart__sum admin__purchase__cart__sum--discount">
                        <span>Kod rabatowy:</span> {purchase.discount_value ? `${purchase.discount_code} (-${purchase.discount_value} zł)` : '-'}
                    </h3>
                    <h3 className="admin__purchase__cart__sum">
                        <span>Do zapłaty:</span> {purchase.sum} zł
                    </h3>
                </div>

                <div className="admin__purchase__paymentStatus">
                    <h2 className="admin__purchase__section__header">
                        Załącznik:
                    </h2>
                    <a className="btn btn--adminDownload center"
                       target="_blank"
                       href={`${API_URL}/${purchase.attachment}`}>
                        <img className="img" src={downloadIcon} alt="pobierz" />
                        Pobierz załącznik
                    </a>
                </div>
            </div>
        </div>
    </main>
};

export default AdminPurchaseDetails;
