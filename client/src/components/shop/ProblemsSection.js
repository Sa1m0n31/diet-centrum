import React, {useContext} from 'react';
import {ContentContext} from "../../App";
import {problems} from "../../helpers/admin/content";
import draftToHtml from 'draftjs-to-html';

const ProblemsSection = () => {
    const { c } = useContext(ContentContext);

    return <div className="section section--problems">
        <h2 className="section__header">
            Z jakimi problemami mogę Ci pomóc?
        </h2>

        <div className="flex flex--alignStart w">
            <div className="problems__left">
                {problems.map((item, index) => {
                    return <div className="problems__left__item" key={index}>
                        <figure className="center">
                            <img className="img" src={item.icon} alt={item.text} />
                        </figure>
                        <span>
                        {item.text}
                    </span>
                    </div>
                })}
            </div>
            {c.aboutMeContent ? <div className="problems__right" dangerouslySetInnerHTML={{
                __html: draftToHtml(JSON.parse(c.aboutMeContent))
            }}>

            </div> : ''}
        </div>
    </div>
};

export default ProblemsSection;
