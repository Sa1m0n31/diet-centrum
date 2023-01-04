import React, {useEffect, useState} from 'react';
import {updateDays} from "../../helpers/api/admin";
import {errorText} from "../../helpers/admin/content";
import {scrollToTop} from "../../helpers/api/others";
import Loader from "./Loader";
import OrderAdminCalendar from "./OrderAdminCalendar";

const AdminCalendarEdition = () => {
    const [daysInfo, setDaysInfo] = useState([]);

    const [selectedDays, setSelectedDays] = useState(-1);
    const [multipleSelected, setMultipleSelected] = useState([]);
    const [info, setInfo] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(info || error) {
            scrollToTop();
            setLoading(false);
        }
    }, [info, error]);

    const handleSubmit = () => {
        setLoading(true);

        const editedDaysInfo = daysInfo.filter((item) => (item.edited));

        updateDays(editedDaysInfo)
            .then((res) => {
                if(res.status === 201) {
                    setInfo('Dostępne dni zostały zaktualizowane');
                }
                else {
                    setError(errorText);
                }
            })
            .catch(() => {
                setError(errorText);
            });
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
            Kliknij w wybrany dzień, aby wyłączyć go z dostępności, a następnie zatwierdź zmiany klikając "Aktualizuj dostępne dni".
        </h2>

        <OrderAdminCalendar numberOfDays={365}
                           offset={2}
                           daysInfo={daysInfo}
                           setDaysInfo={setDaysInfo} />

        {loading ? <div className="center">
            <Loader />
        </div> : <button className="btn btn--submitProduct btn--submitCalendar"
                         onClick={() => { handleSubmit(); }}>
            Aktualizuj dostępne dni
        </button>}
    </main>
};

export default AdminCalendarEdition;
