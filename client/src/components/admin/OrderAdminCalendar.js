import React, {useEffect, useState} from 'react';
import {getNextNDays, isLeapYear, normalMonths, numberOfDaysInMonths} from "../../helpers/api/others";
import {getDays} from "../../helpers/api/admin";
import arrowIcon from "../../static/img/arrow.svg";

const OrderAdminCalendar = ({daysInfo, setDaysInfo, numberOfDays, offset}) => {
    const [days, setDays] = useState([]);
    const [daysToDisplay, setDaysToDisplay] = useState([]);
    const [calendarPlaceholders, setCalendarPlaceholders] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(0);

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

    useEffect(() => {
        setCalendarPlaceholders(daysToDisplay.map((item) => {
            let numberOfEmptyToInsert = 0;

            switch(item[0]?.weekday) {
                case 'wt':
                    numberOfEmptyToInsert = 1;
                    break;
                case 'śr':
                    numberOfEmptyToInsert = 2;
                    break;
                case 'czw':
                    numberOfEmptyToInsert = 3;
                    break;
                case 'pt':
                    numberOfEmptyToInsert = 4;
                    break;
                case 'sob':
                    numberOfEmptyToInsert = 5;
                    break;
                case 'ndz':
                    numberOfEmptyToInsert = 6;
                    break;
                default:
                    break;
            }

            return Array.from(Array(numberOfEmptyToInsert).keys()).map(() => ({empty: true}));
        }));
    }, [daysToDisplay]);

    const handleChange = (val, key, i, month) => {
        const daysInMonths = isLeapYear() ? numberOfDaysInMonths.map((item, index) => {
            return index === 1 ? 29 : item;
        }) : numberOfDaysInMonths;

        let daysBeforeSelectedDay = 0;
        for(let i=new Date().getMonth(); i<month; i++) {
            daysBeforeSelectedDay += daysInMonths[i];
        }

        setDaysInfo(prevState => prevState.map((item, index) => {
            if(index === i + daysBeforeSelectedDay) {
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

    useEffect(() => {
        let newArray = [];
        let daysToDisplayTmp = [];
        daysInfo.forEach((item, index, array) => {
            if(index > 0) {
                if(item.monthNumber !== array[index-1].monthNumber) {
                    daysToDisplayTmp.push(newArray);
                    newArray = [];
                }
            }

            newArray.push(item);
        });
        daysToDisplayTmp.push(newArray);

        setDaysToDisplay(daysToDisplayTmp);
    }, [daysInfo]);

    return <div className="calendar calendar--edition flex">
        <div className="calendar__monthWrapper center">
            <button className="btn btn--monthArrow btn--monthArrow--prev center"
                    disabled={currentMonth === 0}
                    onClick={() => { setCurrentMonth(prevState => (prevState-1)); }}>
                <img className="img" src={arrowIcon} alt="poprzedni" />
            </button>
            <h4 className="calendar__month__name">
                {normalMonths[new Date().getMonth() + currentMonth]}
            </h4>
            <button className="btn btn--monthArrow btn--monthArrow--next center"
                    disabled={currentMonth === 11}
                    onClick={() => { setCurrentMonth(prevState => (prevState+1)); }}>
                <img className="img" src={arrowIcon} alt="poprzedni" />
            </button>
        </div>

        <div className="calendar__weekdays flex">
            <h5 className="calendar__weekdays__item">
                pon
            </h5>
            <h5 className="calendar__weekdays__item">
                wt
            </h5>
            <h5 className="calendar__weekdays__item">
                śr
            </h5>
            <h5 className="calendar__weekdays__item">
                czw
            </h5>
            <h5 className="calendar__weekdays__item">
                pt
            </h5>
            <h5 className="calendar__weekdays__item">
                sob
            </h5>
            <h5 className="calendar__weekdays__item">
                ndz
            </h5>
        </div>

        {calendarPlaceholders[currentMonth]?.map((item, index) => {
            return <span className="btn--calendar btn--calendar--empty"
                         key={index}>

            </span>
        })}

        {daysToDisplay[currentMonth]?.map((item, index) => {
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
                               onChange={(e) => { handleChange(e.target.value, 'limit', index, item.monthNumber-1); }} />
                    </span>
                    <span className="calendar__edition__limit">
                        Cena
                        <input className="input input--calendarLimit"
                               type="number"
                               min={0}
                               value={item.price}
                               onChange={(e) => { handleChange(e.target.value, 'price', index, item.monthNumber-1); }} />
                    </span>
                </span>
                </button>
        })}
    </div>
};

export default OrderAdminCalendar;
