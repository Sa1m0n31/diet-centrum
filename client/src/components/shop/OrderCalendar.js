import React, {useEffect, useState} from 'react';
import {getNextNDays} from "../../helpers/api/others";

const OrderCalendar = ({day, setDay, selected, setSelected, multipleSelected, setMultipleSelected,
                           numberOfDays, multiple, offset}) => {
    const [days, setDays] = useState([]);
    const [excluded, setExcluded] = useState([]);

    useEffect(() => {
        if(numberOfDays && offset >= 0) {
            setDays(getNextNDays(numberOfDays, offset));
        }
    }, [numberOfDays, offset]);

    const isExcluded = (id) => {
        return excluded.includes(id);
    }

    const isSelected = (id) => {
        return (id === selected) || (multipleSelected.includes(id));
    }

    const handleClick = (id) => {
        if(multiple) {
            setMultipleSelected(prevState => {
                if(prevState.includes(id)) {
                    return prevState.filter((item) => (item !== id));
                }
                else {
                    return [...prevState, id];
                }
            });
        }
        else {
            setSelected(id);
        }
    }

    return <div className="calendar flex">
        {days.map((item, index) => {
            return <button className={isExcluded(index) ? "btn btn--calendar btn--calendar--excluded" :
                (isSelected(index) ? "btn btn--calendar btn--calendar--selected" : "btn btn--calendar")}
                           onClick={() => { handleClick(index); }}
                           key={index}>
                <span className="calendar__day">
                    {item.day}
                </span>
                <span className="calendar__weekday">
                    {item.weekday}
                </span>
                <span className="calendar__month">
                    {item.month}
                </span>
            </button>
        })}
    </div>
};

export default OrderCalendar;
