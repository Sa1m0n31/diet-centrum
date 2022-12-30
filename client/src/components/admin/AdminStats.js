import React, {useEffect, useState} from 'react';
import {getAllProducts} from "../../helpers/api/product";
import {getAllPurchases} from "../../helpers/api/purchase";
import {getAllArticles} from "../../helpers/api/blog";

const AdminStats = () => {
    const [products, setProducts] = useState(0);
    const [purchases, setPurchases] = useState(0);
    const [blogPosts, setBlogPosts] = useState(0);
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        getAllProducts()
            .then((res) => {
                if(res.status === 200) {
                    setProducts(res.data.length);
                }
            });

        getAllPurchases()
            .then((res) => {
               if(res.status === 200) {
                   const data = res.data;
                   setPurchases(data.length);
                   setRevenue(data.reduce((prev, curr) => {
                       return prev + curr.sum;
                   }, 0));
               }
            });

        getAllArticles()
            .then((res) => {
               if(res.status === 200) {
                   setBlogPosts(res.data.length);
               }
            });
    }, []);

    return <div className="admin__start__section">
        <h3 className="admin__start__section__header">
            Statystyki
        </h3>

        <div className="admin__start__statsWrapper">
            <div className="admin__start__stats">
                <span className="admin__start__stats__value">
                    {products}
                </span>
                <span className="admin__start__stats__key">
                    Produkty
                </span>
            </div>
            <div className="admin__start__stats">
                <span className="admin__start__stats__value">
                    {purchases}
                </span>
                <span className="admin__start__stats__key">
                    Zamówienia
                </span>
            </div>
            <div className="admin__start__stats">
                <span className="admin__start__stats__value">
                    {revenue} zł
                </span>
                <span className="admin__start__stats__key">
                    Łączny obrót
                </span>
            </div>
            <div className="admin__start__stats">
                <span className="admin__start__stats__value">
                    {blogPosts}
                </span>
                <span className="admin__start__stats__key">
                    Wpisy na blogu
                </span>
            </div>
        </div>
    </div>
};

export default AdminStats;
