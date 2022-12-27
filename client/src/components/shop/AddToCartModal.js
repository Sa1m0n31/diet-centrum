import React, {useEffect} from 'react';
import successIcon from '../../static/img/added-to-cart.svg';

const AddToCartModal = ({closeModal, modalRef}) => {
    useEffect(() => {
        document.addEventListener('keyup', (e) => {
            if(e.key === 'Escape') {
                closeModal();
            }
        });
    }, []);

    return <div className="modal center"
                onClick={closeModal}
                ref={modalRef}>
        <div className="modal__inner"
             onClick={(e) => { e.stopPropagation(); }}>
            <img className="img" src={successIcon} alt="sukces" />

            <h4 className="modal__header">
                Produkt został dodany do koszyka
            </h4>

            <div className="modal__buttons flex">
                <button className="btn btn--closeModal"
                        onClick={closeModal}>
                    Kontynuuj zakupy
                </button>
                <a href="/koszyk" className="btn btn--goToCart">
                    Idź do kasy
                </a>
            </div>
        </div>
    </div>
};

export default AddToCartModal;
