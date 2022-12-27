import React from 'react';

const EmptyCart = () => {
    return <div className="emptyCart center">
        <h1 className="section__header">
            Twój koszyk jest pusty
        </h1>

        <a href="/" className="btn btn--emptyCart">
            Wróć na stronę głowną
        </a>
    </div>
};

export default EmptyCart;
