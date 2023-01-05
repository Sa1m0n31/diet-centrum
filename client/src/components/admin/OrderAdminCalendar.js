import React, {useEffect, useState} from 'react';
import {getNextNDays} from "../../helpers/api/others";
import {getDays} from "../../helpers/api/admin";

const OrderAdminCalendar = ({daysInfo, setDaysInfo, numberOfDays, offset}) => {
    const [days, setDays] = useState([]);

    useEffect(() => {
       if(days?.length) {
           getDays()
               .then((res) => {
                    if(res.status === 200) {
                        const blocked = res.data;

                        setDaysInfo(days.map((item, index) => {
                            const { day, monthNumber, year } = item;

                            const blockedItem = blocked.find((item) => {
                                return (item.day === day) && (item.month === monthNumber)
                                    && (item.year === year);
                            });

                            return {
                                ...item,
                                id: blockedItem?.id ? blockedItem.id : 1,
                                index,
                                price: blockedItem?.price ? blockedItem.price : 0,
                                limit: blockedItem?.purchase_limit ? blockedItem.purchase_limit : 0,
                                edited: false
                            }
                        }));
                    }
               });
       }
    }, [days]);

    useEffect(() => {
        if(numberOfDays && offset >= 0) {
            setDays(getNextNDays(numberOfDays, offset));
        }
    }, [numberOfDays, offset]);

    const handleChange = (val, key, i) => {
        setDaysInfo(prevState => prevState.map((item, index) => {
            if(index === i) {
                return {
                    ...item,
                    edited: true,
                    [key]: parseFloat(val)
                }
            }
            else {
                return item;
            }
        }));
    }

    return <div className="calendar calendar--edition flex">
        {daysInfo?.map((item, index) => {
            return <button className={item.limit === 0 ? "btn btn--calendar btn--calendar--excluded" : "btn btn--calendar"}
                           onClick={(e) => { e.preventDefault(); }}
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

                <span className="calendar__edition">
                    <span className="calendar__edition__limit">
                        Limit
                        <input className="input input--calendarLimit"
                               type="number"
                               min={0}
                               value={item.limit}
                               onChange={(e) => { handleChange(e.target.value, 'limit', index); }} />
                    </span>
                    <span className="calendar__edition__limit">
                        Cena
                        <input className="input input--calendarLimit"
                               type="number"
                               min={0}
                               value={item.price}
                               onChange={(e) => { handleChange(e.target.value, 'price', index); }} />
                    </span>
                </span>
            </button>
        })}
    </div>
};

export default OrderAdminCalendar;
