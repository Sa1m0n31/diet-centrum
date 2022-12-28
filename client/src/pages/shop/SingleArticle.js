import React, {useEffect, useState} from 'react';
import SiteHeader from "../../components/shop/SiteHeader";
import Footer from "../../components/shop/Footer";
import {getProductBySlugAndType} from "../../helpers/api/product";
import {getArticleBySlug} from "../../helpers/api/blog";
import {API_URL} from "../../static/settings";
import draftToHtml from "draftjs-to-html";

const SingleArticle = () => {
    const [article, setArticle] = useState({});

    useEffect(() => {
        const url = window.location.href.split('/').slice(-1);
        const articleSlug = url[0];

        getArticleBySlug(articleSlug)
            .then((res) => {
                if(res?.status === 200) {
                    setArticle(res.data);
                }
            });
    }, []);

    return <div className="container container--blog">
        <SiteHeader />

        <main className="blog blog--single w">
            <figure className="singleArticle__image">
                <img className="img"  src={`${API_URL}/${article.image}`} />
            </figure>

            <h1 className="singleArticle__title">
                {article.title}
            </h1>

            <article className="singleArticle__content" dangerouslySetInnerHTML={{
                __html: article.content ? draftToHtml(JSON.parse(article.content)) : ''
            }}>

            </article>
        </main>

        <Footer />
    </div>
};

export default SingleArticle;
