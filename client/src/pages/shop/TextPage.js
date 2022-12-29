import React, {useContext, useEffect, useState} from 'react';
import {ContentContext} from "../../App";
import draftToHtml from "draftjs-to-html";
import SiteHeader from "../../components/shop/SiteHeader";
import Footer from "../../components/shop/Footer";

const TextPage = ({header}) => {
    const { c } = useContext(ContentContext);

    const [text, setText] = useState('');

    useEffect(() => {
        if(c && header) {
            let data = '';

            switch(header) {
                case 'Regulamin':
                    data = c.termsOfService;
                    break;
                case 'Polityka prywatności':
                    data = c.privacyPolicy;
                    break;
                default:
                    break;
            }

            if(data) {
                setText(draftToHtml(JSON.parse(data)));
            }
        }
    }, [c, header]);

    return <div className="container container--blog">
        <SiteHeader />

        <main className="blog blog--single blog--text w">
            <h1 className="singleArticle__title">
                {header}
            </h1>

            <article className="singleArticle__content" dangerouslySetInnerHTML={{
                __html: text
            }}>

            </article>
        </main>

        <Footer />
    </div>
};

export default TextPage;
