import React, {useEffect, useState} from 'react';
import {API_URL} from "../../static/settings";
import editIcon from "../../static/img/edit.svg";
import trashIcon from "../../static/img/trash.svg";
import {getAllArticles} from "../../helpers/api/blog";

const AdminBlogList = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getAllArticles()
            .then((res) => {
                if(res.status === 200) {
                    setArticles(res.data);
                }
            });
    }, []);

    const openDeleteModal = (id) => {

    }

    return <main className="admin">
        <div className="admin__header flex">
            <h1 className="admin__header">
                Lista wpisów
            </h1>

            <a className="btn btn--addProductPage" href="/panel/edycja-wpisu">
                Dodaj nowy wpis
            </a>
        </div>

        <div className="admin__products">
            {articles.map((item, index) => {
                return <div className="admin__products__item flex" key={index}>
                    <div className="admin__products__item__column">
                        <figure>
                            <img className="img" src={`${API_URL}/${item.image}`} alt={item.title} />
                        </figure>
                    </div>
                    <div className="admin__products__item__column">
                        <span className="key">
                            Tytuł
                        </span>
                        <span className="value">
                            {item.title}
                        </span>
                    </div>
                    <div className="admin__products__item__column">
                        <span className="key">
                            Data publikacji
                        </span>
                        <span className="value">
                            {item.created_at?.substring(0, 10)}<br/>
                            {item.created_at?.substring(11, 19)}
                        </span>
                    </div>
                    <div className="admin__products__item__column">
                        <span className="key">
                            Działania
                        </span>
                        <span className="value value--flex">
                            <a className="btn btn--productList" href={`/panel/edycja-wpisu?id=${item.id}`}>
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

export default AdminBlogList;
