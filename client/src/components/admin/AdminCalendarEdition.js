import React, {useState} from 'react';
import OrderCalendar from "../shop/OrderCalendar";

const AdminCalendarEdition = () => {
    const [selected, setSelected] = useState(-1);
    const [multipleSelected, setMultipleSelected] = useState([]);
    const [info, setInfo] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        console.log(multipleSelected);
    }

    return <main className="admin admin--productEdition">
        <div className="admin__main__header flex">
            <h1 className="admin__header">
                Edycja dostępnych dni
            </h1>

            {info ? <span className="info">
                {info}
            </span> : ''}

            {error ? <span className="info info--error">
                {error}
            </span> : ''}
        </div>

        <h2 className="calendarEditionHeader">
            Kliknij w wybrany dzień, aby wyłączyć go z dostępności, a następnie zatwierdź zmiany
        </h2>

        <OrderCalendar numberOfDays={35}
                       offset={2}
                       selected={selected}
                       setSelected={setSelected}
                       multipleSelected={multipleSelected}
                       setMultipleSelected={setMultipleSelected}
                       multiple={true} />

        <button className="btn btn--submitProduct btn--submitCalendar"
                onClick={() => { handleSubmit(); }}>
            Aktualizuj dostępne dni
        </button>

    </main>
};

export default AdminCalendarEdition;
