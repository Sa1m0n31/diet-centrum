import homeIcon from '../../static/img/home.svg'
import productIcon from '../../static/img/package.svg'
import orderIcon from '../../static/img/shopping-bag.svg'
import contentIcon from '../../static/img/content.svg'
import termsIcon from '../../static/img/agreement.svg'
import blogIcon from '../../static/img/blog.svg'
import calendarIcon from '../../static/img/calendar.svg';
import discountIcon from '../../static/img/discount.svg';
import problem1Icon from "../../static/img/problem-1.svg";
import problem2Icon from "../../static/img/problem-2.svg";
import problem3Icon from "../../static/img/problem-3.svg";
import problem4Icon from "../../static/img/problem-4.svg";
import problem5Icon from "../../static/img/problem-5.svg";
import problem6Icon from "../../static/img/problem-6.svg";
import problem7Icon from "../../static/img/problem-7.svg";
import problem8Icon from "../../static/img/problem-8.svg";
import problem9Icon from "../../static/img/problem-9.svg";
import problem10Icon from "../../static/img/problem-10.svg";
import problem11Icon from "../../static/img/problem-11.svg";
import problem12Icon from "../../static/img/problem-12.svg";

const menu = [
    {
        name: 'Home',
        icon: homeIcon,
        link: '/panel'
    },
    {
        name: 'Produkty',
        icon: productIcon,
        link: '/panel/lista-produktow'
    },
    {
        name: 'Zamówienia',
        icon: orderIcon,
        link: '/panel/zamowienia'
    },
    {
        name: 'Blog',
        icon: blogIcon,
        link: '/panel/lista-wpisow'
    },
    {
        name: 'Edycja treści',
        icon: contentIcon,
        link: '/panel/edycja-tresci'
    },
    {
        name: 'Regulaminy',
        icon: termsIcon,
        link: '/panel/regulaminy'
    },
    {
        name: 'Kody rabatowe',
        icon: discountIcon,
        link: '/panel/kody-rabatowe'
    },
    {
        name: 'Edycja dni',
        icon: calendarIcon,
        link: '/panel/kalendarz'
    }
]

const errorText = 'Coś poszło nie tak... Prosimy spróbować później';

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
];

const offerColors = [
    '#EBF1EA', '#EFF6FF', '#FFFBEC', '#FFF5F5', '#F5FFFF', '#F8F8F8'
];

export { menu, errorText, problems, offerColors }
