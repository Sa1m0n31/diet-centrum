import React, {useEffect, useState} from 'react';
import {getNextNDays, isLeapYear, normalMonths, numberOfDaysInMonths} from "../../helpers/api/others";
import {getDays} from "../../helpers/api/admin";
import arrowIcon from '../../static/img/arrow.svg';

const OrderCalendar = ({selected, setSelected, setDatePrice}) => {
    const [daysToDisplay, setDaysToDisplay] = useState([[], [], []]);
    const [calendarPlaceholders, setCalendarPlaceholders] = useState([[], [], []]);
    const [daysInfo, setDaysInfo] = useState([]);
    const [days, setDays] = useState(getNextNDays(100, 0));
    const [excluded, setExcluded] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(0);

    useEffect(() => {
       if(days?.length) {
           getDays()
               .then((res) => {
                    if(res.status === 200) {
                        const blocked = res.data;
                        const currentMonthIndex = new Date().getMonth()+1;
                        const currentDay = new Date().getDate();

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
                                excluded: ((currentMonthIndex === monthNumber) && (currentDay > day - 2)) ? true : !blockedItem?.purchase_limit
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
                                limit: blockedItem?.purchase_limit ? (((currentMonthIndex === monthNumber) && (currentDay > day - 2)) ? 0 : blockedItem.purchase_limit) : 0
                            }
                        }).filter((item) => {
                            return item.limit === 0;
                        }).map((item) => ({
                            day: item.day,
                            month: item.monthNumber
                        })));
                    }
               });
       }
    }, [days]);

    useEffect(() => {
        if(daysInfo?.length) {
            let currentMonth = [];
            let nextMonth = [];
            let secondNextMonth = [];
            let monthIndex = 0;

            daysInfo.forEach((item, index, array) => {
                if(index > 0) {
                    if(item.monthNumber !== array[index-1].monthNumber) {
                        monthIndex++;
                    }
                }

                if(monthIndex === 0) {
                    currentMonth.push(item);
                }
                else if(monthIndex === 1) {
                    nextMonth.push(item);
                }
                else if(monthIndex === 2) {
                    secondNextMonth.push(item);
                }
            });

            setDaysToDisplay([currentMonth, nextMonth, secondNextMonth]);
        }
    }, [daysInfo]);

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
        }))
    }, [daysToDisplay]);

    const isExcluded = (d, m) => {
        return excluded.findIndex((item) => ((item.day === d) && (item.month === m))) !== -1;
    }

    const isSelected = (day, monthIndex) => {
        const daysInMonths = isLeapYear() ? numberOfDaysInMonths.map((item, index) => {
            return index === 1 ? 29 : item;
        }) : numberOfDaysInMonths;

        let daysBeforeSelectedDay = 0;
        for(let i=new Date().getMonth(); i<monthIndex; i++) {
            daysBeforeSelectedDay += daysInMonths[i];
        }

        return day + daysBeforeSelectedDay === selected;
    }

    const handleClick = (monthIndex, idx) => {
        const daysInMonths = isLeapYear() ? numberOfDaysInMonths.map((item, index) => {
            return index === 1 ? 29 : item;
        }) : numberOfDaysInMonths;

        let daysBeforeSelectedDay = 0;
        for(let i=new Date().getMonth(); i<monthIndex; i++) {
            daysBeforeSelectedDay += daysInMonths[i];
        }

        setSelected(daysBeforeSelectedDay + idx);
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
                    disabled={currentMonth === 2}
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
            return <button className={isSelected(index, item.monthNumber-1) ? "btn btn--calendar btn--calendar--selected" :
                    (isExcluded(item.day, item.monthNumber) ? "btn btn--calendar btn--calendar--excluded" : "btn btn--calendar")}
                                                                              onClick={() => { handleClick(item.monthNumber-1, index); }}
                                                                              disabled={isExcluded(item.day, item.monthNumber)}
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
        })}
    </div>
};

export default OrderCalendar;
