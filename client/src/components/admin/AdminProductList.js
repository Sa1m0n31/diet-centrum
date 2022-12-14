import React, {useEffect, useState} from 'react';
import {deleteProduct, getAllProducts} from "../../helpers/api/product";
import {API_URL} from "../../static/settings";
import editIcon from '../../static/img/edit.svg'
import trashIcon from '../../static/img/trash.svg'
import DeleteModal from "./DeleteModal";

const AdminProductList = () => {
    const [products, setProducts] = useState([]);
    const [deleteCandidate, setDeleteCandidate] = useState(0);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        getAllProducts()
            .then((res) => {
                if(res?.data) {
                    setProducts(res.data);
                }
            });
    }, [success]);

    useEffect(() => {
        if(!deleteCandidate) {
            setSuccess('');
        }
    }, [deleteCandidate]);

    const openDeleteModal = (id) => {
        setDeleteCandidate(id);
    }

    const deleteProductById = () => {
        deleteProduct(deleteCandidate)
            .then((res) => {
               if(res.status === 200) {
                   setSuccess('Produkt został usunięty');
                   setTimeout(() => {
                       setDeleteCandidate(0);
                   }, 3000);
               }
            });
    }

    return <main className="admin">
        {deleteCandidate ? <DeleteModal header="Czy na pewno chcesz usunąć ten produkt?"
                                        success={success}
                                        actionNo={() => { setDeleteCandidate(0); }}
                                        actionYes={() => { deleteProductById(); }} /> : ''}

        <div className="admin__header flex">
            <h1 className="admin__header">
                Lista produktów
            </h1>

            <a className="btn btn--addProductPage" href="/panel/edycja-produktu">
                Dodaj nowy produkt
            </a>
        </div>

        <div className="admin__products">
            {products.map((item, index) => {
                return <div className="admin__products__item flex" key={index}>
                    <div className="admin__products__item__column">
                        <figure>
                            <img className="img" src={`${API_URL}/${item.image}`} alt={item.title} />
                        </figure>
                    </div>
                    <div className="admin__products__item__column">
                        <span className="key">
                            Nazwa
                        </span>
                        <span className="value">
                            {item.title}
                        </span>
                    </div>
                    <div className="admin__products__item__column">
                        <span className="key">
                            Cena
                        </span>
                        <span className="value">
                            {item.price} PLN
                        </span>
                    </div>
                    <div className="admin__products__item__column">
                        <span className="key">
                            Typ
                        </span>
                        <span className="value">
                            {item.type === 0 ? 'Oferta indywidualna' : 'Oferta biznesowa'}
                        </span>
                    </div>
                    <div className="admin__products__item__column">
                        <span className="key">
                            Działania
                        </span>
                        <span className="value value--flex">
                            <a className="btn btn--productList" href={`/panel/edycja-produktu?id=${item.id}`}>
                                <img className="img" src={editIcon} alt="edytuj" />
                            </a>
                            <button className="btn btn--productList"
                                    onClick={() => { openDeleteModal(item.id) }}>
                                <img className="img" src={trashIcon} alt="usuń" />
                            </button>
                        </span>
                    </div>
                </div>
            })}
        </div>
    </main>
};

export default AdminProductList;
