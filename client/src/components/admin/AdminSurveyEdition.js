import React, {useEffect, useState} from 'react';
import ImageDropdown from "./ImageDropdown";
import Loader from "./Loader";
import {scrollToTop} from "../../helpers/api/others";
import {errorText} from "../../helpers/admin/content";
import {updateAttachment} from "../../helpers/api/admin";

const AdminSurveyEdition = () => {
    const [attachment, setAttachment] = useState(null);
    const [info, setInfo] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(info || error) {
            scrollToTop();
            setLoading(false);
        }
    }, [info, error]);

    const uploadAttachment = (files) => {
        let file = files[0];
        if(file) {
            setAttachment(file);
        }
    }

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setInfo('');

        try {
            let res = await updateAttachment(attachment);

            if(res) {
                setInfo('Ankieta została zaktualizowana');
            }
            else {
                setError(errorText);
            }
        }
        catch(e) {
            setError(errorText);
        }
    }

    return <main className="admin admin--productEdition">
        <div className="admin__main__header flex">
            <h1 className="admin__header">
                Edycja ankiety
            </h1>

            {info ? <span className="info">
                {info}
            </span> : ''}

            {error ? <span className="info info--error">
                {error}
            </span> : ''}
        </div>

        <div className="admin__label admin__label--image">
            <h4 className="admin__header--image">
                Bieżąca ankieta do pobrania przez klientów zostanie zastąpiona dokumentem przesłanym poniżej.
            </h4>
            <ImageDropdown image={attachment}
                           pdf={true}
                           removeImage={() => { setAttachment(null); }}
                           handleFileUpload={uploadAttachment} />
        </div>

        {loading ? <div className="center">
            <Loader />
        </div> : <button className="btn btn--submit btn--submitProduct" onClick={() => { handleSubmit(); }}>
            Zaktualizuj ankietę
        </button>}

    </main>
};

export default AdminSurveyEdition;
