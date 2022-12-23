import React from 'react';
import problem1Icon from '../../static/img/problem-1.svg';
import problem2Icon from '../../static/img/problem-2.svg';
import problem3Icon from '../../static/img/problem-3.svg';
import problem4Icon from '../../static/img/problem-4.svg';
import problem5Icon from '../../static/img/problem-5.svg';
import problem6Icon from '../../static/img/problem-6.svg';
import problem7Icon from '../../static/img/problem-7.svg';
import problem8Icon from '../../static/img/problem-8.svg';
import problem9Icon from '../../static/img/problem-9.svg';
import problem10Icon from '../../static/img/problem-10.svg';
import problem11Icon from '../../static/img/problem-11.svg';
import problem12Icon from '../../static/img/problem-12.svg';

const problems = [
    {
        icon: problem1Icon, text: 'Odchudzanie'
    },
    {
        icon: problem2Icon, text: 'Nadciśnienie tętnicze'
    },
    {
        icon: problem3Icon, text: 'Wysoki cholesterol'
    },
    {
        icon: problem4Icon, text: 'Zaparcia, biegunki'
    },
    {
        icon: problem5Icon, text: 'Problemy skórne'
    },
    {
        icon: problem6Icon, text: 'Insulinooporność'
    },
    {
        icon: problem7Icon, text: 'Nidoczynność tarczycy'
    },
    {
        icon: problem8Icon, text: 'Dna moczanowa'
    },
    {
        icon: problem9Icon, text: 'Refluks'
    },
    {
        icon: problem10Icon, text: 'Osteoporoza'
    },
    {
        icon: problem11Icon, text: 'PCOS, IBS, SIBO'
    },
    {
        icon: problem12Icon, text: 'Cukrzyca typu I i II'
    },
]

const ProblemsSection = () => {
    return <div className="section section--problems">
        <h2 className="section__header">
            Z jakimi problemami mogę Ci pomóc?
        </h2>

        <div className="flex w">
            <div className="problems__left">
                {problems.map((item, index) => {
                    return <div className="problems__left__item" key={index}>
                        <figure className="center">
                            <img className="img" src={item.icon} alt={item.text} />
                        </figure>
                        <span>
                        {item.text}
                    </span>
                    </div>
                })}
            </div>
            <div className="problems__right">
                <h3 className="problems__subheader">
                    Opieka dietetyczna online z dietetykiem klinicznym Tomkiem Dębińskim
                </h3>
            </div>
        </div>
    </div>
};

export default ProblemsSection;
