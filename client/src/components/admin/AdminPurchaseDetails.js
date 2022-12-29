import React, {useEffect, useState} from 'react';
import {getPurchaseById} from "../../helpers/api/purchase";
import {getAllProducts} from "../../helpers/api/product";

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
        if(purchase && products?.length) {
            setCart(purchase.cart.map((item) => {
                return getProductFromList(item.id);
            }));
        }
    }, [purchase, products]);

    useEffect(() => {
        console.log(cart);
    }, [cart]);

    const getProductFromList = (id) => {
        return products.find((item) => (item.id === id));
    }

    return <main className="admin admin--productEdition">
        <div className="admin__main__header flex">
            <h1 className="admin__header">
                Szczegóły zamówienia #{purchase.id}
            </h1>
        </div>
    </main>
};

export default AdminPurchaseDetails;
