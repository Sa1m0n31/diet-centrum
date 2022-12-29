import React, {useContext, useEffect, useState} from 'react';
import starIcon from '../../static/img/star.svg';
import assetIcon from '../../static/img/asset2.png';
import {ContentContext} from "../../App";

const References = () => {
    const { c } = useContext(ContentContext);

    const [referencesContent, setReferencesContent] = useState([]);

    useEffect(() => {
        if(c) {
            setReferencesContent([
                {
                    name: c.reference1Header,
                    text: c.reference1Text
                },
                {
                    name: c.reference2Header,
                    text: c.reference2Text
                },
                {
                    name: c.reference3Header,
                    text: c.reference3Text
                }
            ])
        }
    }, [c]);

    return <div className="section section--references">
        <h3 className="section__header">
            Opinie
        </h3>
        <h4 className="section__subheader">
            {c.referencesText}
        </h4>

        <div className="references w flex">
            {referencesContent.map((item, index) => {
                return <div className="references__item" key={index}>
                    <h5 className="references__item__header">
                        {item.name}
                    </h5>
                    <div className="references__item__stars flex">
                        {[1, 2, 3, 4, 5].map((item, index) => {
                            return <img key={index}
                                        className="img"
                                        src={starIcon}
                                        alt="gwiazdka" />
                        })}
                    </div>
                    <p className="references__item__text">
                        {item.text}
                    </p>
                </div>
            })}

            <img className="references__asset" src={assetIcon} alt="opinie-diet-centrum" />
        </div>
    </div>
};

export default References;
