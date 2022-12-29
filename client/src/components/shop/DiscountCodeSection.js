import React, {useEffect, useState} from 'react';
import nextIcon from '../../static/img/next.svg';
import {verifyDiscountCode} from "../../helpers/api/code";

const DiscountCodeSection = ({cartSum, setCartSum, setDiscount, discountCode, setDiscountCode}) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if(discountCode) {
            setCode('');
        }
    }, [discountCode]);

    useEffect(() => {
        if(code) {
            setError('');
        }
    }, [code]);

    useEffect(() => {
        if(error) {
            setCode('');
        }
    }, [error]);

    const calculateNewCartSum = (type, value) => {
        setDiscountCode(code);

        if(type === 0) {
            setDiscount(value);
            setCartSum(prevState => (Math.max(0, prevState - value)));
        }
        else {
            const d = (cartSum * (value / 100)).toFixed();
            setDiscount(d);
            setCartSum(prevState => (Math.max(0, prevState - d)));
        }
    }

    const handleSubmit = (localStorageCode = null) => {
        const c = localStorageCode ? localStorageCode : code;

        if(c) {
            if(!discountCode) {
                if(c.length <= 3) {
                    setError('Podany kod nie istnieje');
                }
                else {
                    verifyDiscountCode(c)
                        .then((res) => {
                            if(res?.status === 200) {
                                localStorage.setItem('discountCode', c);
                                const codeObj = res.data;
                                calculateNewCartSum(codeObj.discount_type, codeObj.discount_value);
                            }
                        })
                        .catch(() => {
                            setError('Podany kod nie istnieje');
                        });
                }
            }
            else {
                setError('Kod rabatowy został już wykorzystany');
            }
        }
    }

    return <div className="discountCode flex">
        <span className="discountCode__caption">
            Podaj kod rabatowy
        </span>

        {error ? <span className="error error--discountCode">
            {error}
        </span> : ''}

        <input className="input input--discountCode"
               placeholder={!error ? "Podaj kod" : ""}
               value={code}
               onClick={() => { setError(''); }}
               onKeyDown={(e) => { if(e.key === 'Enter') handleSubmit(); }}
               onChange={(e) => { setCode(e.target.value); }} />
       <button className="btn btn--discountCode center"
               onClick={() => { handleSubmit(); }}>
           <img className="img" src={nextIcon} alt="dalej" />
       </button>
    </div>
};

export default DiscountCodeSection;
