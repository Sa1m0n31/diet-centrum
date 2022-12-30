import React, {useEffect} from 'react';
import successIcon from '../../static/img/check-green.svg';
import deleteIcon from '../../static/img/trash.svg';

const DeleteModal = ({header, actionYes, actionNo, success}) => {
    useEffect(() => {
        document.addEventListener('keyup', (e) => {
            if(e.key === 'Escape') {
                actionNo();
            }
        });
    }, []);

    return <div className="modal center modal--delete" onClick={actionNo}>
        <div className="modal__inner" onClick={(e) => { e.stopPropagation(); }}>
            <img className="img" src={success ? successIcon : deleteIcon} alt="sukces" />

            <h4 className="modal__header">
                {!success ? header : success}
            </h4>

            {!success ? <div className="modal__buttons flex">
                <button className="btn btn--delete"
                        onClick={actionYes}>
                    Tak
                </button>
                <button className="btn btn--closeModal"
                        onClick={actionNo}>
                    Nie
                </button>
            </div> : ''}
        </div>
    </div>
};

export default DeleteModal;
