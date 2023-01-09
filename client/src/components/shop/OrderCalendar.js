import React, {useEffect, useState} from 'react';
import {getNextNDays} from "../../helpers/api/others";
import {getDays} from "../../helpers/api/admin";

const OrderCalendar = ({selected, setSelected, numberOfDays, offset, setDatePrice}) => {
    const [daysInfo, setDaysInfo] = useState([]);
    const [days, setDays] = useState([]);
    const [excluded, setExcluded] = useState([]);

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
                                index,
                                price: blockedItem ? blockedItem.price : 0,
                                excluded: !blockedItem?.purchase_limit
                            }
                        }))

                        setExcluded(days.map((item, index) => {
                            const { day, monthNumber, year } = item;

                            const blockedItem = blocked.find((item) => {
                                return (item.day === day) && (item.month === monthNumber)
                                    && (item.year === year);
                            });

                            return {
                                ...item,
                                index,
                                price: blockedItem ? blockedItem.price : 0,
                                limit: blockedItem?.purchase_limit ? blockedItem.purchase_limit : 0
                            }
                        }).filter((item) => {
                            return item.limit === 0;
                        }).map((item) => (item.index)));
                    }
               });
       }
    }, [days]);

    useEffect(() => {
        if(numberOfDays && offset >= 0) {
            setDays(getNextNDays(numberOfDays, offset));
        }
    }, [numberOfDays, offset]);

    const isExcluded = (i) => {
        return excluded.includes(i);
    }

    const isSelected = (id) => {
        return id === selected;
    }

    const handleClick = (idx) => {
        setSelected(idx);
    }

    useEffect(() => {
        if(selected >= 0) {
            setDatePrice(prevState => {
                const obj = daysInfo.find((item, index) => {
                    return index === selected;
                });

                if(obj) {
                    return obj.price;
                }
                else {
                    return prevState;
                }
            });
        }
    }, [selected]);

    return <div className="calendar calendar--order flex">
        {daysInfo?.map((item, index) => {
            let divider = false;
            if(index > 0) {
                if(daysInfo[index-1]?.month !== item?.month) {
                    divider = true;
                }
            }

            return <>
                {divider ? <span className="calendarDivider"></span> : ''}
                <button className={isSelected(index) ? "btn btn--calendar btn--calendar--selected" :
                    (isExcluded(index) ? "btn btn--calendar btn--calendar--excluded" : "btn btn--calendar")}
                        onClick={() => { handleClick(index); }}
                        disabled={isExcluded(index)}
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

                    {item.price ? <span className="calendar__price">
                    {item.price} zł
                </span> : ''}
                </button>
            </>
        })}
    </div>
};

export default OrderCalendar;
