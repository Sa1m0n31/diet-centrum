import { saveAs } from 'file-saver';
import { getBinaryContent } from 'jszip-utils';
import {API_URL} from "../../static/settings";

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

const isEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

const numberOfDaysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const normalMonths = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
const months = ['sty', 'lut', 'mar', 'kwi', 'maj', 'czw', 'lip', 'sie', 'wrz', 'paz', 'lis', 'gru'];

const weekdays = ['ndz', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob'];

const polishMonths = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];

const getNextNDays = (n, offset) => {
    const today = new Date();
    const nextDays = [];
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    for(let i=offset; i<offset+n; i++) {
        const nextDay = new Date();
        nextDay.setDate(firstDayOfMonth.getDate() + i);
        nextDays.push({
            day: nextDay.getDate(),
            month: months[nextDay.getMonth()],
            monthNumber: nextDay.getMonth()+1,
            weekday: weekdays[nextDay.getDay()],
            year: nextDay.getFullYear()
        });
    }

    return nextDays;
}

const getStringDate = (day, month, year) => {
    return `${day} ${polishMonths[month-1]} ${year}`;
}

const getAmountInArray = (el, arr) => {
    return arr.reduce((prev, curr) => {
        return prev + (curr === el ? 1 : 0);
    }, 0);
}

const getDaysBetweenTwoDays = (date1, date2) => {
    const oneDay = 1000 * 60 * 60 * 24;
    const differenceInMilliseconds = date1 - date2;
    return Math.ceil(differenceInMilliseconds / oneDay);
}

async function downloadData(files, orderId) {
    const zip = require('jszip')();
    let i = 0;

    for(const file of files) {
        const format = file.split('.').slice(-1)[0];
        await getBinaryContent(`${API_URL}/${file}`, (err, data) => {
           zip.file(`zalacznik-${i}.${format}`, data, { binary: true });
           i++;

           if(i === files.length) {
               zip.generateAsync({ type: 'blob' }).then(function(content) {
                   saveAs(content, `zamowienie-${orderId}.zip`);
               });
           }
        });
    }
}

const isLeapYear = () => {
    let today = new Date();
    let year = today.getMonth() === 11 ? today.getFullYear()+1 : new Date().getFullYear();
    if(year % 4 === 0) {
        if(year % 100 === 0) {
            if(year % 400 === 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    } else {
        return false;
    }
}

export { scrollToTop, isEmail, getNextNDays, getStringDate, getAmountInArray, getDaysBetweenTwoDays,
    downloadData, normalMonths, numberOfDaysInMonths, isLeapYear }
