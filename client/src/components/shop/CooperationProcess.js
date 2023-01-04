import React, {useContext, useEffect, useState} from 'react';
import {ContentContext} from "../../App";

const CooperationProcess = () => {
    const { c } = useContext(ContentContext);

    const [cooperationPoints, setCooperationPoints] = useState([]);

    useEffect(() => {
        if(c) {
            setCooperationPoints([
                {
                    title: c.cooperationPoint1Header,
                    text: c.cooperationPoint1Text
                },
                {
                    title: c.cooperationPoint2Header,
                    text: c.cooperationPoint2Text
                },
                {
                    title: c.cooperationPoint3Header,
                    text: c.cooperationPoint3Text
                },
                {
                    title: c.cooperationPoint4Header,
                    text: c.cooperationPoint4Text
                }
            ]);
        }
    }, [c]);

    return cooperationPoints ? <div className="section section--cooperation">
        <h2 className="section__header">
            Jak przebiega współpraca?
        </h2>

        <div className="cooperation flex">
            {cooperationPoints.map((item, index) => {
                return <div className="cooperation__item" key={index}>
                    <span className="cooperation__item__number center">
                        {index+1}.
                    </span>
                    <h3 className="cooperation__item__header">
                        {item.title}
                    </h3>
                    <p className="cooperation__item__text">
                        {item.text}
                    </p>
                </div>
            })}
        </div>
    </div> : '';
};

export default CooperationProcess;
