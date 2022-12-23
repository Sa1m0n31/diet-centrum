import React, {useEffect} from 'react';
import starIcon from '../../static/img/star.svg';
import assetIcon from '../../static/img/asset2.png';

const referencesContent = [
    {
        name: 'Ania, -10kg w rok',
        text: 'Ze wsparcia dietetycznego Alicji korzystam od około roku. Uczę się od niej jak jeść zdrowiej, a przy okazji znacznie lepiej teraz gotuję. Nie czuję monotonii stosując się do zaleceń i to jest na pewno fajne. Ale dla mnie najważniejsze jest jednak to, że widzę po sobie efekty tej współpracy. Dziękuję!'
    },
    {
        name: 'Ania, -10kg w rok',
        text: 'Ze wsparcia dietetycznego Alicji korzystam od około roku. Uczę się od niej jak jeść zdrowiej, a przy okazji znacznie lepiej teraz gotuję. Nie czuję monotonii stosując się do zaleceń i to jest na pewno fajne. Ale dla mnie najważniejsze jest jednak to, że widzę po sobie efekty tej współpracy. Dziękuję!'
    },
    {
        name: 'Ania, -10kg w rok',
        text: 'Ze wsparcia dietetycznego Alicji korzystam od około roku. Uczę się od niej jak jeść zdrowiej, a przy okazji znacznie lepiej teraz gotuję. Nie czuję monotonii stosując się do zaleceń i to jest na pewno fajne. Ale dla mnie najważniejsze jest jednak to, że widzę po sobie efekty tej współpracy. Dziękuję!'
    }
];

const References = () => {
    return <div className="section section--references">
        <h3 className="section__header">
            Opinie
        </h3>
        <h4 className="section__subheader">
            Dołącz do grona usatysfakcjonowanych Klientów, którzy odmienili swoje życie i zrealizowali cele dzięki naszym planom żywieniowym.
        </h4>

        <div className="references w flex">
            {referencesContent.map((item, index) => {
                return <div className="references__item" key={index}>
                    <h5 className="references__item__header">
                        {item.name}
                    </h5>
                    <div className="references__item__stars flex">
                        {[1, 2, 3, 4, 5].map((item, index) => {
                            return <img key={index}
                                        className="img"
                                        src={starIcon}
                                        alt="gwiazdka" />
                        })}
                    </div>
                    <p className="references__item__text">
                        {item.text}
                    </p>
                </div>
            })}

            <img className="references__asset" src={assetIcon} alt="opinie-diet-centrum" />
        </div>
    </div>
};

export default References;
