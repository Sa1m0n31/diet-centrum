import homeIcon from '../../static/img/home.svg'
import productIcon from '../../static/img/package.svg'
import orderIcon from '../../static/img/shopping-bag.svg'
import contentIcon from '../../static/img/content.svg'
import termsIcon from '../../static/img/agreement.svg'
import blogIcon from '../../static/img/blog.svg'

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
        link: '/panel/blog'
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
    }
]

export { menu }
