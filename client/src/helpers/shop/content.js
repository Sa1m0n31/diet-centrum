import icon1 from "../../static/img/book.svg";
import icon2 from "../../static/img/individual.svg";
import icon3 from "../../static/img/contact-mail.svg";
import facebookIcon from '../../static/img/facebook.svg'
import instagramIcon from '../../static/img/instagram.svg'

const landingPageBenefits = [
    {
        header: 'Wykształcenie i wiedza',
        subheader: 'Lata doświadczeń, dziesiątki kursów.',
        icon: icon1
    },
    {
        header: 'Indywidualne podejście',
        subheader: 'Dieta dopasowana do Ciebie, nie na odwrót.',
        icon: icon2
    },
    {
        header: 'Stały kontakt',
        subheader: 'Zawsze odpowiadamy na Twoje pytania.',
        icon: icon3
    }
];

const socialMedia = [
    {
        icon: facebookIcon,
        link: 'https://facebook.com'
    },
    {
        icon: instagramIcon,
        link: 'https://instagram.com'
    }
]

export { landingPageBenefits, socialMedia }
