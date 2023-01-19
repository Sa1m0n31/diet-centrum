import React, { useState, useEffect } from 'react';
import {getContent, updateContent} from "../../helpers/api/admin";
import {errorText} from "../../helpers/admin/content";
import {Editor} from "react-draft-wysiwyg";
import {convertFromRaw, convertToRaw, EditorState} from "draft-js";
import {scrollToTop} from "../../helpers/api/others";
import Loader from "./Loader";

const AdminContentEdition = () => {
    const [landingHeader, setLandingHeader] = useState('');
    const [landingSubheader, setLandingSubheader] = useState('');
    const [landingBtn1Text, setLandingBtn1Text] = useState('');
    const [landingBtn2Text, setLandingBtn2Text] = useState('');
    const [landingBtn1Link, setLandingBtn1Link] = useState('');
    const [landingBtn2Link, setLandingBtn2Link] = useState('');
    const [aboutMeHeader, setAboutMeHeader] = useState('');
    const [aboutMeText, setAboutMeText] = useState('');
    const [aboutMeContent, setAboutMeContent] = useState('');
    const [referencesText, setReferencesText] = useState('');
    const [reference1Header, setReference1Header] = useState('');
    const [reference2Header, setReference2Header] = useState('');
    const [reference3Header, setReference3Header] = useState('');
    const [reference4Header, setReference4Header] = useState('');
    const [reference5Header, setReference5Header] = useState('');
    const [reference6Header, setReference6Header] = useState('');
    const [reference1Text, setReference1Text] = useState('');
    const [reference2Text, setReference2Text] = useState('');
    const [reference3Text, setReference3Text] = useState('');
    const [reference4Text, setReference4Text] = useState('');
    const [reference5Text, setReference5Text] = useState('');
    const [reference6Text, setReference6Text] = useState('');
    const [cooperationHeader, setCooperationHeader] = useState('');
    const [cooperationPoint1Header, setCooperationPoint1Header] = useState('');
    const [cooperationPoint2Header, setCooperationPoint2Header] = useState('');
    const [cooperationPoint3Header, setCooperationPoint3Header] = useState('');
    const [cooperationPoint4Header, setCooperationPoint4Header] = useState('');
    const [cooperationPoint1Text, setCooperationPoint1Text] = useState('');
    const [cooperationPoint2Text, setCooperationPoint2Text] = useState('');
    const [cooperationPoint3Text, setCooperationPoint3Text] = useState('');
    const [cooperationPoint4Text, setCooperationPoint4Text] = useState('');
    const [beforeFooterHeader, setBeforeFooterHeader] = useState('');
    const [beforeFooterSubheader, setBeforeFooterSubheader] = useState('');
    const [beforeFooterButtonText, setBeforeFooterButtonText] = useState('');
    const [beforeFooterButtonLink, setBeforeFooterButtonLink] = useState('');
    const [footerText, setFooterText] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getContent()
            .then((res) => {
                if(res?.status === 200) {
                    const r = Object.fromEntries(res?.data?.map((item) => ([item.field, item.value])));

                    setLandingHeader(r.landingHeader);
                    setLandingSubheader(r.landingSubheader);
                    setLandingBtn1Text(r.landingBtn1Text);
                    setLandingBtn1Link(r.landingBtn1Link);
                    setLandingBtn2Text(r.landingBtn2Text);
                    setLandingBtn2Link(r.landingBtn2Link);
                    setAboutMeHeader(r.aboutMeHeader);
                    setAboutMeText(r.aboutMeText);
                    setAboutMeContent(EditorState.createWithContent(convertFromRaw(JSON.parse(r.aboutMeContent))));
                    setReferencesText(r.referencesText);
                    setReference1Header(r.reference1Header);
                    setReference1Text(r.reference1Text);
                    setReference2Header(r.reference2Header);
                    setReference2Text(r.reference2Text);
                    setReference3Header(r.reference3Header);
                    setReference3Text(r.reference3Text);
                    setReference4Header(r.reference4Header);
                    setReference4Text(r.reference4Text);
                    setReference5Header(r.reference5Header);
                    setReference5Text(r.reference5Text);
                    setReference6Header(r.reference6Header);
                    setReference6Text(r.reference6Text);
                    setCooperationHeader(r.cooperationHeader);
                    setCooperationPoint1Header(r.cooperationPoint1Header);
                    setCooperationPoint2Header(r.cooperationPoint2Header);
                    setCooperationPoint3Header(r.cooperationPoint3Header);
                    setCooperationPoint4Header(r.cooperationPoint4Header);
                    setCooperationPoint1Text(r.cooperationPoint1Text);
                    setCooperationPoint2Text(r.cooperationPoint2Text);
                    setCooperationPoint3Text(r.cooperationPoint3Text);
                    setCooperationPoint4Text(r.cooperationPoint4Text);
                    setBeforeFooterHeader(r.beforeFooterHeader);
                    setBeforeFooterSubheader(r.beforeFooterSubheader);
                    setBeforeFooterButtonText(r.beforeFooterButtonText);
                    setBeforeFooterButtonLink(r.beforeFooterButtonLink);
                    setFooterText(r.footerText);
                    setPhoneNumber(r.phoneNumber);
                    setEmail(r.email);
                    setFacebook(r.facebook);
                    setInstagram(r.instagram);
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
        const data = {
            landingHeader, landingSubheader, landingBtn1Text, landingBtn1Link, landingBtn2Text, landingBtn2Link,
            aboutMeHeader, aboutMeText,
            aboutMeContent: JSON.stringify(convertToRaw(aboutMeContent?.getCurrentContent())),
            referencesText, reference1Header, reference1Text, reference2Header, reference2Text, reference3Header, reference3Text,
            reference4Header, reference4Text, reference5Header, reference5Text, reference6Header, reference6Text,
            cooperationHeader, cooperationPoint1Header, cooperationPoint1Text, cooperationPoint2Header, cooperationPoint2Text,
            cooperationPoint3Header, cooperationPoint3Text, cooperationPoint4Header, cooperationPoint4Text,
            beforeFooterHeader, beforeFooterSubheader, beforeFooterButtonText, beforeFooterButtonLink,
            footerText, phoneNumber, email, facebook, instagram
        }

        setLoading(true);

        updateContent(data)
            .then((res) => {
                if(res?.status === 200) {
                    setInfo('Treści zostały zaktualizowane');
                }
                else {
                    setError(errorText);
                }
            })
            .catch(() => {
                setError(errorText);
            });
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

        {/* Landing page */}
        <label className="admin__label">
            <h3 className="admin__offerTypeHeader mb">
                Strona główna
            </h3>
            <span>
                Nagłówek na stronie głównej
            </span>
            <input className="input input--admin"
                   value={landingHeader}
                   onChange={(e) => { setLandingHeader(e.target.value); }}
                   placeholder="Nagłówek strony" />
        </label>
        <label className="admin__label">
            <span>
                Tekst na stronie głównej
            </span>
            <textarea className="input input--admin input--textarea"
                   value={landingSubheader}
                   onChange={(e) => { setLandingSubheader(e.target.value); }}
                   placeholder="Tekst na górze strony" />
        </label>
        <div className="admin--content--flex">
            <label className="admin__label">
                <span>
                    Tekst na pierwszym buttonie na stronie głównej
                </span>
                <input className="input input--admin"
                       value={landingBtn1Text}
                       onChange={(e) => { setLandingBtn1Text(e.target.value); }}
                       placeholder="Tekst na pierwszym buttonie na stronie głównej" />
            </label>
            <label className="admin__label">
                <span>
                    Tekst na drugim buttonie na stronie głównej
                </span>
                <input className="input input--admin"
                       value={landingBtn2Text}
                       onChange={(e) => { setLandingBtn2Text(e.target.value); }}
                       placeholder="Tekst na drugim buttonie na stronie głównej" />
            </label>
        </div>
        <div className="admin--content--flex">
            <label className="admin__label">
                <span>
                    Link do pierwszego buttona na stronie głównej
                </span>
                <input className="input input--admin"
                       value={landingBtn1Link}
                       onChange={(e) => { setLandingBtn1Link(e.target.value); }}
                       placeholder="Link do pierwszego buttona na stronie głównej" />
            </label>
            <label className="admin__label">
                <span>
                    Link do drugiego buttona na stronie głównej
                </span>
                <input className="input input--admin"
                       value={landingBtn2Link}
                       onChange={(e) => { setLandingBtn2Link(e.target.value); }}
                       placeholder="Link do drugiego buttona na stronie głównej" />
            </label>
        </div>

        {/* About me */}
        <label className="admin__label">
            <h3 className="admin__offerTypeHeader mb">
                O mnie
            </h3>
            <span>
                O mnie - nagłówek
            </span>
            <input className="input input--admin"
                   value={aboutMeHeader}
                   onChange={(e) => { setAboutMeHeader(e.target.value); }}
                   placeholder="O mnie - nagłówek" />
        </label>
        <label className="admin__label">
            <span>
                O mnie - tekst
            </span>
            <textarea className="input input--admin input--textarea"
                   value={aboutMeText}
                   onChange={(e) => { setAboutMeText(e.target.value); }}
                   placeholder="O mnie - tekst" />
        </label>
        <label className="admin__label">
            <span>
                O mnie - tekst rozbudowany
            </span>
            <Editor
                editorState={aboutMeContent}
                wrapperClassName="wrapperClassName"
                editorClassName="editor"
                onEditorStateChange={(text) => { setAboutMeContent(text); }}
            />
        </label>

        {/* References */}
        <label className="admin__label">
            <h3 className="admin__offerTypeHeader mb">
                Opinie
            </h3>
            <span>
                Tekst przed opiniami
            </span>
            <textarea className="input input--admin input--textarea"
                   value={referencesText}
                   onChange={(e) => { setReferencesText(e.target.value); }}
                   placeholder="Tekst przed opiniami" />
        </label>
        <label className="admin__label">
            <span>
                Opinia 1 - nagłówek
            </span>
            <input className="input input--admin"
                   value={reference1Header}
                   onChange={(e) => { setReference1Header(e.target.value); }}
                   placeholder="Opinia 1 - nagłówek" />
        </label>
        <label className="admin__label">
            <span>
                Opinia 1 - tekst
            </span>
            <textarea className="input input--admin input--textarea"
                   value={reference1Text}
                   onChange={(e) => { setReference1Text(e.target.value); }}
                   placeholder="Opinia 1 - tekst" />
        </label>
        <label className="admin__label">
            <span>
                Opinia 2 - nagłówek
            </span>
            <input className="input input--admin"
                   value={reference2Header}
                   onChange={(e) => { setReference2Header(e.target.value); }}
                   placeholder="Opinia 2 - nagłówek" />
        </label>
        <label className="admin__label">
            <span>
                Opinia 2 - tekst
            </span>
            <textarea className="input input--admin input--textarea"
                      value={reference2Text}
                      onChange={(e) => { setReference2Text(e.target.value); }}
                      placeholder="Opinia 2 - tekst" />
        </label>
        <label className="admin__label">
            <span>
                Opinia 3 - nagłówek
            </span>
            <input className="input input--admin"
                   value={reference3Header}
                   onChange={(e) => { setReference3Header(e.target.value); }}
                   placeholder="Opinia 3 - nagłówek" />
        </label>
        <label className="admin__label">
            <span>
                Opinia 3 - tekst
            </span>
            <textarea className="input input--admin input--textarea"
                      value={reference3Text}
                      onChange={(e) => { setReference3Text(e.target.value); }}
                      placeholder="Opinia 3 - tekst" />
        </label>

        <label className="admin__label">
            <span>
                Opinia 4 - nagłówek
            </span>
            <input className="input input--admin"
                   value={reference4Header}
                   onChange={(e) => { setReference4Header(e.target.value); }}
                   placeholder="Opinia 4 - nagłówek" />
        </label>
        <label className="admin__label">
            <span>
                Opinia 4 - tekst
            </span>
            <textarea className="input input--admin input--textarea"
                      value={reference4Text}
                      onChange={(e) => { setReference4Text(e.target.value); }}
                      placeholder="Opinia 4 - tekst" />
        </label>
        <label className="admin__label">
            <span>
                Opinia 5 - nagłówek
            </span>
            <input className="input input--admin"
                   value={reference5Header}
                   onChange={(e) => { setReference5Header(e.target.value); }}
                   placeholder="Opinia 5 - nagłówek" />
        </label>
        <label className="admin__label">
            <span>
                Opinia 5 - tekst
            </span>
            <textarea className="input input--admin input--textarea"
                      value={reference5Text}
                      onChange={(e) => { setReference5Text(e.target.value); }}
                      placeholder="Opinia 5 - tekst" />
        </label>
        <label className="admin__label">
            <span>
                Opinia 6 - nagłówek
            </span>
            <input className="input input--admin"
                   value={reference6Header}
                   onChange={(e) => { setReference6Header(e.target.value); }}
                   placeholder="Opinia 6 - nagłówek" />
        </label>
        <label className="admin__label">
            <span>
                Opinia 6 - tekst
            </span>
            <textarea className="input input--admin input--textarea"
                      value={reference6Text}
                      onChange={(e) => { setReference6Text(e.target.value); }}
                      placeholder="Opinia 6 - tekst" />
        </label>

        {/* Cooperation */}
        <label className="admin__label">
            <h3 className="admin__offerTypeHeader mb">
                Współpraca
            </h3>
            <span>
                Współpraca - nagłówek
            </span>
            <input className="input input--admin"
                      value={cooperationHeader}
                      onChange={(e) => { setCooperationHeader(e.target.value); }}
                      placeholder="Współpraca - nagłówek" />
        </label>
        <label className="admin__label">
            <span>
                Współpraca - punkt 1, nagłóek
            </span>
            <input className="input input--admin"
                   value={cooperationPoint1Header}
                   onChange={(e) => { setCooperationPoint1Header(e.target.value); }}
                   placeholder="Współpraca - punkt 1, nagłówek" />
        </label>
        <label className="admin__label">
            <span>
                Współpraca - punkt 1, tekst
            </span>
            <textarea className="input input--admin input--textarea"
                   value={cooperationPoint1Text}
                   onChange={(e) => { setCooperationPoint1Text(e.target.value); }}
                   placeholder="Współpraca - punkt 1, tekst" />
        </label>
        <label className="admin__label">
            <span>
                Współpraca - punkt 2, nagłóek
            </span>
            <input className="input input--admin"
                   value={cooperationPoint2Header}
                   onChange={(e) => { setCooperationPoint2Header(e.target.value); }}
                   placeholder="Współpraca - punkt 2, nagłówek" />
        </label>
        <label className="admin__label">
            <span>
                Współpraca - punkt 2, tekst
            </span>
            <textarea className="input input--admin input--textarea"
                      value={cooperationPoint2Text}
                      onChange={(e) => { setCooperationPoint2Text(e.target.value); }}
                      placeholder="Współpraca - punkt 2, tekst" />
        </label>
        <label className="admin__label">
            <span>
                Współpraca - punkt 3, nagłóek
            </span>
            <input className="input input--admin"
                   value={cooperationPoint3Header}
                   onChange={(e) => { setCooperationPoint3Header(e.target.value); }}
                   placeholder="Współpraca - punkt 3, nagłówek" />
        </label>
        <label className="admin__label">
            <span>
                Współpraca - punkt 3, tekst
            </span>
            <textarea className="input input--admin input--textarea"
                      value={cooperationPoint3Text}
                      onChange={(e) => { setCooperationPoint3Text(e.target.value); }}
                      placeholder="Współpraca - punkt 3, tekst" />
        </label>
        <label className="admin__label">
            <span>
                Współpraca - punkt 4, nagłóek
            </span>
            <input className="input input--admin"
                   value={cooperationPoint4Header}
                   onChange={(e) => { setCooperationPoint4Header(e.target.value); }}
                   placeholder="Współpraca - punkt 4, nagłówek" />
        </label>
        <label className="admin__label">
            <span>
                Współpraca - punkt 4, tekst
            </span>
            <textarea className="input input--admin input--textarea"
                      value={cooperationPoint4Text}
                      onChange={(e) => { setCooperationPoint4Text(e.target.value); }}
                      placeholder="Współpraca - punkt 4, tekst" />
        </label>

        {/* Before footer */}
        <label className="admin__label">
            <h3 className="admin__offerTypeHeader mb">
                Sekcja powyżej stopki
            </h3>
            <span>
                Sekcja powyżej stopki - nagłówek
            </span>
            <input className="input input--admin"
                   value={beforeFooterHeader}
                   onChange={(e) => { setBeforeFooterHeader(e.target.value); }}
                   placeholder="Sekcja powyżej stopki - nagłówek" />
        </label>
        <label className="admin__label">
            <span>
                Sekcja powyżej stopki - tekst (HTML)
            </span>
            <textarea className="input input--admin input--textarea"
                   value={beforeFooterSubheader}
                   onChange={(e) => { setBeforeFooterSubheader(e.target.value); }}
                   placeholder="Sekcja powyżej stopki - tekst (HTML)" />
        </label>
        <div className="admin--content--flex">
            <label className="admin__label">
                <span>
                    Sekcja powyżej stopki - napis na buttonie
                </span>
                <input className="input input--admin"
                       value={beforeFooterButtonText}
                       onChange={(e) => { setBeforeFooterButtonText(e.target.value); }}
                       placeholder="Sekcja powyżej stopki - napis na buttonie" />
            </label>
            <label className="admin__label">
                <span>
                    Sekcja powyżej stopki - link do buttona
                </span>
                <input className="input input--admin"
                       value={beforeFooterButtonLink}
                       onChange={(e) => { setBeforeFooterButtonLink(e.target.value); }}
                       placeholder="Sekcja powyżej stopki - link do buttona" />
            </label>
        </div>

        {/* Footer */}
        <label className="admin__label">
            <h3 className="admin__offerTypeHeader mb">
                Stopka
            </h3>
            <span>
                Tekst w stopce
            </span>
            <textarea className="input input--admin input--textarea"
                   value={footerText}
                   onChange={(e) => { setFooterText(e.target.value); }}
                   placeholder="Tekst w stopce" />
        </label>
        <label className="admin__label">
            <span>
                Numer telefonu
            </span>
            <input className="input input--admin"
                   value={phoneNumber}
                   onChange={(e) => { setPhoneNumber(e.target.value); }}
                   placeholder="Numer telefonu" />
        </label>
        <label className="admin__label">
            <span>
                Adres e-mail
            </span>
            <input className="input input--admin"
                   value={email}
                   onChange={(e) => { setEmail(e.target.value); }}
                   placeholder="Adres e-mail" />
        </label>

        {/* Social media */}
        <label className="admin__label">
            <h3 className="admin__offerTypeHeader mb">
                Social media
            </h3>
            <span>
                Facebook
            </span>
            <input className="input input--admin"
                   value={facebook}
                   onChange={(e) => { setFacebook(e.target.value); }}
                   placeholder="Facebook" />
        </label>
        <label className="admin__label">
            <span>
                Instagram
            </span>
            <input className="input input--admin"
                   value={instagram}
                   onChange={(e) => { setInstagram(e.target.value); }}
                   placeholder="Instagram" />
        </label>

        {loading ? <div className="center">
            <Loader />
        </div> : <button className="btn btn--submitProduct"
                         onClick={() => { handleSubmit(); }}>
            Aktualizuj treści
        </button>}
    </main>
};

export default AdminContentEdition;
