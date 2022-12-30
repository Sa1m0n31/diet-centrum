import React, {useEffect, useState} from 'react';
import addIcon from '../../static/img/add.svg'
import ImageDropdown from "./ImageDropdown";
import {Editor} from "react-draft-wysiwyg";
import {convertFromRaw, EditorState} from "draft-js";
import Loader from "./Loader";
import {addProduct, getProductById, updateProduct} from "../../helpers/api/product";
import {scrollToTop} from "../../helpers/api/others";

const AdminProductEdition = () => {
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [type, setType] = useState(0);
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [points, setPoints] = useState(['']);
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(0);
    const [updateMode, setUpdateMode] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState('');

    useEffect(() => {
        const idParam = new URLSearchParams(window.location.search).get('id');

        if(idParam) {
            setId(parseInt(idParam));
            setUpdateMode(true);

            getProductById(idParam)
                .then((res) => {
                   const result = res?.data;

                   if(result) {
                       setTitle(result.title);
                       setPrice(result.price);
                       setType(result.type ? 1 : 0);
                       setShortDescription(result.short_description);
                       setLongDescription(EditorState.createWithContent(convertFromRaw(JSON.parse(result.long_description))));
                       setPoints(JSON.parse(result.points));
                       setImage(result.image);
                   }
                });
        }
    }, []);

    useEffect(() => {
        if(info || error) {
            scrollToTop();
            setLoading(false);
        }
    }, [info, error]);

    const deletePoint = (i) => {
        setPoints(prevState => (prevState.filter((item, index) => (index !== i))));
    }

    const addPoint = () => {
        setPoints(prevState => ([...prevState, '']));
    }

    const uploadImage = (files) => {
        let file = files[0];
        if(file) {
            setImage(file);
        }
    }

    const validateData = () => {
        if(!title) {
            return 'Uzupełnij tytuł produktu';
        }
        if(!shortDescription) {
            return 'Uzupełnij krótki opis produktu';
        }
        if(!longDescription) {
            return 'Uzupełnij długi opis produktu';
        }
    }

    const handleSubmit = async () => {
        const err = validateData();

        if(!err) {
            setLoading(true);

            try {
                if(updateMode) {
                    await updateProduct(id, title, price, type, shortDescription, longDescription, points, image);
                    setInfo('Produkt został zaktualizowany');
                }
                else {
                    await addProduct(title, price, type, shortDescription, longDescription, points, image);
                    setInfo('Produkt został dodany');
                }
            }
            catch(err) {
                setError('Coś poszło nie tak... Prosimy spróbować później lub skontaktować się z administratorem systemu.');
            }
        }
        else {
            setError(err);
        }
    }

    return <main className="admin admin--productEdition">
        <div className="admin__main__header flex">
            <h1 className="admin__header">
                Edycja produktu
            </h1>

            {info ? <span className="info">
                {info}
            </span> : ''}

            {error ? <span className="info info--error">
                {error}
            </span> : ''}
        </div>

        <div className="flex flex--alignEnd admin__productEdition--top">
            <label className="admin__label">
                <h3 className="admin__offerTypeHeader mb">
                    Podstawowe informacje
                </h3>
                <span>
                   Tytuł
                </span>
                <input className="input input--admin"
                       value={title}
                       onChange={(e) => { setTitle(e.target.value); }}
                       placeholder="Tytuł" />
            </label>
            <label className="admin__label">
                <span>
                   Cena
                </span>
                <input className="input input--admin"
                       type="number"
                       value={price}
                       onChange={(e) => { setPrice(e.target.value); }}
                       placeholder="Cena" />
            </label>
        </div>

        <div className="admin__label admin__label--choice">
            <h2 className="admin__offerTypeHeader">
                Rodzaj oferty
            </h2>
            <label className={type === 0 ? "adminSelect" : ""}>
                <button className="btn btn--adminSelect" onClick={() => { setType(0); }}>

                </button>
                Oferta indywidualna
            </label>
            <label className={type === 1 ? "adminSelect" : ""}>
                <button className="btn btn--adminSelect" onClick={() => { setType(1); }}>

                </button>
                Oferta biznesowa
            </label>
        </div>

        <div className="admin__label admin__label--points">
            <h3 className="admin__offerTypeHeader">
                Punkty oferty
            </h3>

            {points.map((item, index) => {
                return <div className="admin__points__item" key={index}>
                    <input className="input input--admin"
                           placeholder="Zawartość produktu"
                           value={item}
                           onChange={(e) => { setPoints(prevState => {
                               return prevState.map((item, pointsIndex) => {
                                   if(pointsIndex === index) {
                                       return e.target.value;
                                   }
                                   else {
                                       return item;
                                   }
                               });
                           }) }} />

                   <button className="btn btn--deletePoint"
                           onClick={() => { deletePoint(index); }}>
                       &times;
                   </button>
                </div>
            })}

            <button className="btn btn--addPoint"
                    onClick={() => { addPoint(); }}>
                Dodaj punkt
                <img className="img" src={addIcon} alt="dodaj" />
            </button>
        </div>

        <label className="admin__label">
            <h3 className="admin__offerTypeHeader mb">
                Opisy produktu
            </h3>
            <span>
                Krótki opis
            </span>
            <textarea className="input input--textarea"
                      value={shortDescription}
                      onChange={(e) => { setShortDescription(e.target.value); }}
                      placeholder="Krótki opis produktu" />
        </label>
        <label className="admin__label">
            <span>
                Długi opis
            </span>
            <Editor
                editorState={longDescription}
                wrapperClassName="wrapperClassName"
                editorClassName="editor"
                onEditorStateChange={(text) => { setLongDescription(text); }}
            />
        </label>

        <div className="admin__label admin__label--image">
            <h3 className="admin__offerTypeHeader">
                Zdjęcie produktu
            </h3>
            <h4 className="admin__header--image">
                Zalecane rozmiary: 400 x 400 px
            </h4>

            <ImageDropdown image={image}
                           removeImage={() => { setImage(null); }}
                           handleFileUpload={uploadImage} />
        </div>

        {loading ? <div className="center">
            <Loader />
        </div> : <button className="btn btn--submit btn--submitProduct" onClick={() => { handleSubmit(); }}>
            {updateMode ? "Zaktualizuj produkt" : "Dodaj produkt"}
        </button>}
    </main>
};

export default AdminProductEdition;
