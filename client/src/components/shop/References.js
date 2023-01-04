import React, {useContext, useEffect, useRef, useState} from 'react';
import starIcon from '../../static/img/star.svg';
import assetIcon from '../../static/img/asset2.png';
import {ContentContext} from "../../App";

const References = () => {
    const { c } = useContext(ContentContext);

    let block1 = useRef(null);
    let block2 = useRef(null);

    useEffect(() => {
        if(block1?.current && block2?.current) {
            let currentBlock = 1;

            if(window.innerWidth > 768) {
                setInterval(() => {
                    if(currentBlock === 1) {
                        block1.current.style.opacity = '0';
                        block1.current.style.zIndex = '-3';
                        block2.current.style.opacity = '1';
                        block2.current.style.zIndex = '3';

                        currentBlock = 2;
                    }
                    else {
                        block2.current.style.opacity = '0';
                        block2.current.style.zIndex = '-3';
                        block1.current.style.opacity = '1';
                        block1.current.style.zIndex = '3';

                        currentBlock = 1;
                    }
                }, 5000);
            }
        }
    }, [block1?.current, block2?.current]);

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
                },
                {
                    name: c.reference4Header,
                    text: c.reference4Text
                },
                {
                    name: c.reference5Header,
                    text: c.reference5Text
                },
                {
                    name: c.reference6Header,
                    text: c.reference6Text
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

        <div className="references w">
                <div className="references__block flex" ref={block1}>
                    {referencesContent.slice(0, 3).map((item, index) => {
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
                </div>
            <div className="references__block flex" ref={block2}>
                {referencesContent.slice(2, 5).map((item, index) => {
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
            </div>

            <img className="references__asset" src={assetIcon} alt="opinie-diet-centrum" />
        </div>
    </div>
};

export default References;
