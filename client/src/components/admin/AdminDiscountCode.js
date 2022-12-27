import React, {useEffect, useState} from 'react';
import {addDiscountCode, deleteDiscountCode, getAllDiscountCodes, updateDiscountCode} from "../../helpers/api/code";
import {errorText} from "../../helpers/admin/content";
import {scrollToTop} from "../../helpers/api/others";
import Loader from "./Loader";
import editIcon from "../../static/img/edit.svg";
import trashIcon from "../../static/img/trash.svg";

const AdminDiscountCode = () => {
    const [id, setId] = useState(0);
    const [updateMode, setUpdateMode] = useState(false);
    const [code, setCode] = useState('');
    const [discountType, setDiscountType] = useState(0);
    const [discountValue, setDiscountValue] = useState(0);
    const [allCodes, setAllCodes] = useState([]);
    const [info, setInfo] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if(params) {
            const paramId = params.get('id');
            if(paramId) {
                setId(parseInt(paramId));
            }
        }
    }, []);

    useEffect(() => {
        if(!loading) {
            getAllDiscountCodes()
                .then((res) => {
                    if(res.status === 200) {
                        setAllCodes(res.data);
                    }
                });
        }
    }, [loading]);

    useEffect(() => {
        if(id && allCodes?.length) {
            const currentCode = allCodes.find((item) => (item.id === id));

            if(currentCode) {
                setUpdateMode(true);
                setCode(currentCode.code);
                setDiscountType(currentCode.discount_type);
                setDiscountValue(currentCode.discount_value);
            }
        }
    }, [id, allCodes]);

    useEffect(() => {
        if(info || error) {
            scrollToTop();
            setLoading(false);

            if(info) {
                setCode('');
                setDiscountValue(0);
                setDiscountType(0);
            }
        }
    }, [info, error]);

    const deleteCode = (codeId) => {
        setLoading(true);
        setInfo('');
        setError('');

        deleteDiscountCode(codeId)
            .then((res) => {
                if(res?.status === 200) {
                    setInfo('Kod został usunięty')
                }
                else {
                    setError(errorText);
                }
            })
            .catch(() => {
                setError(errorText);
            });
    }

    const validateData = () => {
        if(code.length < 3) {
            setError('Wpisz co najmniej trzyznakowy kod rabatowy');
            return 0;
        }
        if(!discountValue) {
            setError('Wpisz wartość kodu rabatowego');
            return 0;
        }

        return 1;
    }

    const handleSubmit = async () => {
        if(validateData()) {
            setInfo('');
            setError('');
            setLoading(true);

            try {
                let res;

                if(updateMode) {
                    res = await updateDiscountCode(id, code, discountType, discountValue)
                }
                else {
                    res = await addDiscountCode(code, discountType, discountValue);
                }

                if(res) {
                    setInfo(updateMode ? 'Kod rabatowy został zaktualizowany' : 'Kod rabatowy został dodany');
                }
                else {
                    setError(errorText);
                }
            }
            catch(e) {
                setError(errorText);
            }
        }
    }

    return <main className="admin admin--discountCode">
        <div className="admin__main__header flex">
            <h1 className="admin__header">
                {updateMode ? 'Aktualizacja kodu rabatowego' : 'Dodawanie kodu rabatowego'}
            </h1>

            {info ? <span className="info">
                {info}
            </span> : ''}

            {error ? <span className="info info--error">
                {error}
            </span> : ''}
        </div>

        <div className="discountPanel__form">
            <div className="admin__label admin__label--choice">
                <label className={discountType === 0 ? "adminSelect" : ""}>
                    <button className="btn btn--adminSelect" onClick={() => { setDiscountType(0); }}>

                    </button>
                    Rabat w zł
                </label>
                <label className={discountType === 1 ? "adminSelect" : ""}>
                    <button className="btn btn--adminSelect" onClick={() => { setDiscountType(1); }}>

                    </button>
                    Rabat procentowy
                </label>
            </div>
            <label className="admin__label">
                <span>
                   Kod rabatowy
                </span>
                <input className="input input--admin"
                       value={code}
                       onChange={(e) => { setCode(e.target.value); }}
                       placeholder="Kod rabatowy" />
            </label>
            <label className="admin__label">
                <span>
                   Wartość
                </span>
                <input className="input input--admin input--discountValue"
                       type="number"
                       value={discountValue}
                       onChange={(e) => { setDiscountValue(e.target.value); }}
                       placeholder="Wartość (w procentach lub w zł)" />
                <span className="discountType center">
                    {discountType === 0 ? 'zł' : '%'}
                </span>
            </label>

            {loading ? <div className="center">
                <Loader />
            </div> : <button className="btn btn--submitProduct btn--submitDiscountCode"
                             onClick={() => { handleSubmit(); }}>
                {updateMode ? 'Aktualizuj' : 'Dodaj'} kod rabatowy
            </button>}
        </div>

        {allCodes.length ? <div className="discountPanel__list">
            <h3 className="discountPanel__header">
                Dostępne kody rabatowe
            </h3>

            <div className="discountPanel__list__item discountPanel__list__item--header flex">
                <span>
                    l.p.
                </span>
                <span>
                    Kod
                </span>
                <span>
                    Wartość
                </span>
                <span>
                    Działania
                </span>
            </div>

            {allCodes.map((item, index) => {
                return <div className="discountPanel__list__item flex"
                            key={index}>
                    <span>
                        {index+1}
                    </span>
                    <span>
                        {item.code}
                    </span>
                    <span>
                        {item.discount_value} {item.discount_type === 0 ? 'zł' : '%'}
                    </span>
                    <span className="discountPanel__list__item__options">
                        <a className="btn btn--productList" href={`/panel/kody-rabatowe?id=${item.id}`}>
                            <img className="img" src={editIcon} alt="edytuj" />
                        </a>
                        <button className="btn btn--productList"
                                onClick={() => { deleteCode(item.id); }}>
                            <img className="img" src={trashIcon} alt="usuń" />
                        </button>
                    </span>
                </div>
            })}
        </div> : ''}
    </main>
};

export default AdminDiscountCode;
