import React, {useEffect, useState} from 'react';
import {getNextNDays} from "../../helpers/api/others";
import {getBlockedDays} from "../../helpers/api/admin";

const OrderCalendar = ({setSelectedDays, day, setDay, selected, setSelected, multipleSelected, setMultipleSelected,
                           numberOfDays, multiple, offset}) => {
    const [days, setDays] = useState([]);
    const [excluded, setExcluded] = useState([]);

    useEffect(() => {
       if(days?.length) {
           getBlockedDays()
               .then((res) => {
                    if(res.status === 200) {
                        const blocked = res.data;

                        setExcluded(days.map((item, index) => {
                            const { day, monthNumber, year } = item;

                            const i = blocked.findIndex((item) => {
                                return (item.day === day) && (item.month === monthNumber) && (item.year === year);
                            });

                            return {
                                ...item,
                                index: index,
                                blocked: i !== -1
                            }
                        }).filter((item) => {
                            return item.blocked;
                        }).map((item) => (item.index)));
                    }
               });
       }
    }, [days]);

    useEffect(() => {
        if(multiple) {
            setMultipleSelected((prevState => ([...prevState, ...excluded])));
        }
    }, [excluded]);

    useEffect(() => {
        if(numberOfDays && offset >= 0) {
            setDays(getNextNDays(numberOfDays, offset));
        }
    }, [numberOfDays, offset]);

    useEffect(() => {
        setSelectedDays(multipleSelected.map((item) => {
            const dayObject = days[item];

            return {
                day: dayObject.day,
                month: dayObject.monthNumber,
                year: dayObject.year
            }
        }));
    }, [multipleSelected]);

    const isExcluded = (i) => {
        return excluded.includes(i);
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
                (isSelected(index) ? (multiple ? "btn btn--calendar btn--calendar--excluded" : "btn btn--calendar btn--calendar--selected") : "btn btn--calendar")}
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
