import React from 'react';
import plusIcon from '../../static/img/add.svg'
import trashIcon from '../../static/img/trash.svg'
import {API_URL} from "../../static/settings";

const ImageDropdown = ({image, removeImage, handleFileUpload}) => {
    return <div className="label">
        <div className={image ? "filesUploadLabel center" : "filesUploadLabel filesUploadLabel--noBorder center"}>
            {!image ? <div className="filesUploadLabel__inner">
                Dodaj zdjęcie
                <img className="img" src={plusIcon} alt="dodaj-pliki" />
            </div> : <div className="filesUploadLabel__profileImage">
                <button className="removeProfileImageBtn" onClick={() => { removeImage(); }}>
                    <img className="img" src={trashIcon} alt="usun" />
                </button>
                <img className="img"
                     src={typeof image === "string" ? `${API_URL}/${image}` : window.URL.createObjectURL(image)}
                     alt="zdjecie-profilowe" />
            </div>}
            <input className="input input--file"
                   type="file"
                   multiple={false}
                   onChange={(e) => { handleFileUpload(e.target.files); }} />
        </div>
    </div>
};

export default ImageDropdown;
