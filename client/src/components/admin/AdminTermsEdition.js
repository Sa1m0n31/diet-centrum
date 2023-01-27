import React, {useEffect, useState} from 'react';
import {getContent, updateTexts} from "../../helpers/api/admin";
import Loader from "./Loader";
import {errorText} from "../../helpers/admin/content";
import {Editor} from "react-draft-wysiwyg";
import {convertFromRaw, EditorState} from "draft-js";
import {scrollToTop} from "../../helpers/api/others";

const AdminTermsEdition = () => {
    const [termsOfService, setTermsOfService] = useState('');
    const [privacyPolicy, setPrivacyPolicy] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getContent()
            .then((res) => {
                if(res.status === 200) {
                    const data = res.data;
                    setPrivacyPolicy(EditorState.createWithContent(convertFromRaw(JSON.parse(data.find((item) => (item.field === 'privacyPolicy'))?.value))));
                    setTermsOfService(EditorState.createWithContent(convertFromRaw(JSON.parse(data.find((item) => (item.field === 'termsOfService'))?.value))))
                }
            });
    }, []);

    useEffect(() => {
        if(info || error) {
            scrollToTop();
            setLoading(false);
        }
    }, [info, error]);

    const handleSubmit = () => {
        setInfo('');
        setError('');
        setLoading(true);
        updateTexts(termsOfService, privacyPolicy)
            .then((res) => {
                if(res?.status === 200) {
                    setInfo('Teksty zostały zaktualizowane');
                }
                else {
                    setError(errorText);
                }
            })
            .catch((e) => {
                setError(errorText);
            })
    }

    return <main className="admin admin--contentEdition">
        <div className="admin__header flex">
            <h1 className="admin__header">
                Edycja treści
            </h1>

            {info ? <span className="info">
                {info}
            </span> : ''}

            {error ? <span className="info info--error">
                {error}
            </span> : ''}
        </div>

        <label className="admin__label">
            <span>
                Regulamin
            </span>
            <Editor
                editorState={termsOfService}
                wrapperClassName="wrapperClassName"
                editorClassName="editor"
                onEditorStateChange={(text) => { setTermsOfService(text); }}
            />
        </label>

        <label className="admin__label">
            <span>
                Polityka prywatności
            </span>
            <Editor
                editorState={privacyPolicy}
                wrapperClassName="wrapperClassName"
                editorClassName="editor"
                onEditorStateChange={(text) => { setPrivacyPolicy(text); }}
            />
        </label>

        {loading ? <div className="center">
            <Loader />
        </div> : <button className="btn btn--submitProduct"
                         onClick={() => { handleSubmit(); }}>
            Aktualizuj teksty
        </button>}
    </main>
};

export default AdminTermsEdition;
