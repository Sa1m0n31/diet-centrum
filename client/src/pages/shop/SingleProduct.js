import React, {useContext, useEffect, useRef, useState} from 'react';
import SiteHeader from "../../components/shop/SiteHeader";
import Footer from "../../components/shop/Footer";
import CooperationProcess from "../../components/shop/CooperationProcess";
import DifferentProducts from "../../components/shop/DifferentProducts";
import SingleProductMain from "../../components/shop/SingleProductMain";
import {getProductBySlugAndType} from "../../helpers/api/product";
import AddToCartModal from "../../components/shop/AddToCartModal";
import {CartContext} from "../../App";

const SingleProduct = () => {
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState({});
    const [offerType, setOfferType] = useState('Oferta indywidualna');

    const addToCartModal = useRef(null);

    useEffect(() => {
        const url = window.location.href.split('/').slice(-2);
        const offerTypeSlug = url[0];
        const offerProductSlug = url[1];

        const offerTypeId = offerTypeSlug === 'oferta-indywidualna' ? 0 : 1;
        setOfferType(offerTypeId === 0 ? 'Oferta indywidualna' : 'Oferta biznesowa');

        getProductBySlugAndType(offerProductSlug, offerTypeId)
            .then((res) => {
                if(res?.status === 200) {
                    setProduct(res.data);
                }
            });
    }, []);

    const addToCartWrapper = () => {
       if(product.id) {
           addToCart(product.id);
       }

        addToCartModal.current.style.opacity = '1';
        addToCartModal.current.style.zIndex = '99';
        addToCartModal.current.style.transition = '.3s opacity';
    }

    const closeAddToCartModal = () => {
        addToCartModal.current.style.opacity = '0';
        addToCartModal.current.style.zIndex = '-99';
        addToCartModal.current.style.transition = '.3s all';
    }

    return <div className="container container--singleProduct">
        <AddToCartModal modalRef={addToCartModal}
                        closeModal={() => { closeAddToCartModal(); }} />

        <SiteHeader breadcrumb={['Home', offerType, product.title]} />
        <SingleProductMain product={product}
                           addToCart={() => { addToCartWrapper(); }} />
        <CooperationProcess />
        <DifferentProducts excludedOffer={product.id}
                           offerType={product.type} />
        <Footer />
    </div>
};

export default SingleProduct;
