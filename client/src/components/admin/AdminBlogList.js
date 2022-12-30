import React, {useEffect, useState} from 'react';
import {API_URL} from "../../static/settings";
import editIcon from "../../static/img/edit.svg";
import trashIcon from "../../static/img/trash.svg";
import {deleteArticle, getAllArticles} from "../../helpers/api/blog";
import DeleteModal from "./DeleteModal";

const AdminBlogList = () => {
    const [articles, setArticles] = useState([]);
    const [deleteCandidate, setDeleteCandidate] = useState(0);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        getAllArticles()
            .then((res) => {
                if(res.status === 200) {
                    setArticles(res.data);
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

    const deleteArticleById = () => {
        deleteArticle(deleteCandidate)
            .then((res) => {
                if(res.status === 200) {
                    setSuccess('Artykuł został usunięty');
                    setTimeout(() => {
                        setDeleteCandidate(0);
                    }, 3000);
                }
            });
    }

    return <main className="admin">
        {deleteCandidate ? <DeleteModal header="Czy na pewno chcesz usunąć ten artykuł?"
                                        success={success}
                                        actionNo={() => { setDeleteCandidate(0); }}
                                        actionYes={() => { deleteArticleById(); }} /> : ''}

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
                return <div className="admin__products__item admin__products__item--blog flex" key={index}>
                    <div className="admin__products__item__column">
                        <figure>
                            <img className="img" src={`${API_URL}/${item.image}`} alt={item.title} />
                        </figure>
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
                            Tytuł
                        </span>
                        <span className="value">
                            {item.title}
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
