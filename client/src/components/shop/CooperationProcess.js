import React from 'react';

const cooperationPoints = [
    {
        title: 'Wybierz interesujący Cię plan',
        text: 'Wybierz swój plan opieki dietetycznej — 1 miesiąc, 3 miesiące lub 6 miesięcy.'
    },
    {
        title: 'Konsultacja dietetyczna',
        text: 'Chcemy poznać Twoje preferencje, oczekiwania i cele, by dopasować do Ciebie dietę online.'
    },
    {
        title: 'Indywidualna dieta online',
        text: 'Chcemy poznać Twoje preferencje, oczekiwania i cele, by dopasować do Ciebie dietę online.'
    },
    {
        title: 'Ostatni punkt',
        text: 'Wybierz swój plan opieki dietetycznej — 1 miesiąc, 3 miesiące lub 6 miesięcy.'
    }
]

const CooperationProcess = () => {
    return <div className="section section--cooperation">
        <h2 className="section__header">
            Jak przebiega współpraca?
        </h2>

        <div className="cooperation flex">
            {cooperationPoints.map((item, index) => {
                return <div className="cooperation__item" key={index}>
                    <span className="cooperation__item__number center">
                        {index+1}.
                    </span>
                    <h3 className="cooperation__item__header">
                        {item.title}
                    </h3>
                    <p className="cooperation__item__text">
                        {item.text}
                    </p>
                </div>
            })}
        </div>
    </div>
};

export default CooperationProcess;
