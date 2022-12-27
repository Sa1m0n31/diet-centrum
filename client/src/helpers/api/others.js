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

const months = ['Stycznia', 'Lutego', 'Marca', 'Kwietnia', 'Maja', 'Czerwca', 'Lipca', 'Sierpnia', 'Września', 'Października', 'Listopada', 'Grudnia'];

const weekdays = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];

const getNextNDays = (n, offset) => {
    const today = new Date();
    const nextDays = [];

    for(let i=offset; i<offset+n; i++) {
        const nextDay = new Date();
        nextDay.setDate(today.getDate() + i);
        nextDays.push({
            day: nextDay.getDate(),
            month: months[nextDay.getMonth()],
            weekday: weekdays[nextDay.getDay()]
        });
    }

    return nextDays;
}

export { scrollToTop, isEmail, getNextNDays }
