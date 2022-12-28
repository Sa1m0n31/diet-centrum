import React, {useEffect, useState} from 'react';
import {Editor} from "react-draft-wysiwyg";
import ImageDropdown from "./ImageDropdown";
import Loader from "./Loader";
import {scrollToTop} from "../../helpers/api/others";
import {convertFromRaw, EditorState} from "draft-js";
import {addArticle, getArticleById, updateArticle} from "../../helpers/api/blog";
import {errorText} from "../../helpers/admin/content";
import AdminBlogCategories from "./AdminBlogCategories";

const AdminBlogEdition = () => {
    const [id, setId] = useState(-1);
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [info, setInfo] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const idParam = new URLSearchParams(window.location.search).get('id');

        if(idParam) {
            setId(parseInt(idParam));
            setUpdateMode(true);

            getArticleById(parseInt(idParam))
                .then((res) => {
                    const result = res?.data;

                    if(result) {
                        setTitle(result.title);
                        setExcerpt(result.excerpt);
                        setContent(EditorState.createWithContent(convertFromRaw(JSON.parse(result.content))));
                        setCategories(JSON.parse(result.categories));
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

    const uploadImage = (files) => {
        let file = files[0];
        if(file) {
            setImage(file);
        }
    }

    const validateData = () => {
        if(!title) {
            setError('Dodaj tytuł artykułu');
            return 0;
        }
        if(!excerpt) {
            setError('Dodaj zajawkę artykułu');
            return 0;
        }
        if(!image) {
            setError('Dodaj zdjęcie artykułu');
            return 0;
        }
        if(!content) {
            setError('Dodaj treść artykułu');
            return 0;
        }

        return 1;
    }

    const handleSubmit = async () => {
        if(validateData()) {
            setLoading(true);
            setError('');
            setInfo('');

            try {
                let res;

                if(updateMode) {
                    res = await updateArticle(id, title, excerpt, content, image, categories);
                }
                else {
                    res = await addArticle(title, excerpt, content, image, categories);
                }

                if(res) {
                    setInfo(updateMode ? 'Wpis został zaktualizowany' : 'Wpis został dodany');
                }
                else {
                    setError(errorText);
                }
            }
            catch(e) {
                setError(errorText);
            }
        }
    }

    return <main className="admin admin--productEdition">
        <div className="admin__main__header flex">
            <h1 className="admin__header">
                Edycja wpisu
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
                   Tytuł
                </span>
            <input className="input input--admin"
                   value={title}
                   onChange={(e) => { setTitle(e.target.value); }}
                   placeholder="Tytuł" />
        </label>
        <label className="admin__label">
                <span>
                   Zajawka
                </span>
            <textarea className="input input--admin input--textarea"
                      value={excerpt}
                      onChange={(e) => { setExcerpt(e.target.value); }}
                      placeholder="Zajawka" />
        </label>

        <label className="admin__label">
            <span>
                Treść
            </span>
            <Editor
                editorState={content}
                wrapperClassName="wrapperClassName"
                editorClassName="editor"
                onEditorStateChange={(text) => { setContent(text); }}
            />
        </label>

        <div className="admin__label admin__label--image">
            <h3 className="admin__offerTypeHeader">
                Zdjęcie wpisu
            </h3>
            <h4 className="admin__header--image">
                Zalecane rozmiary: 1800 x 1200
            </h4>

            <ImageDropdown image={image}
                           removeImage={() => { setImage(null); }}
                           handleFileUpload={uploadImage} />
        </div>

        <AdminBlogCategories categories={categories}
                             setCategories={setCategories}
                             setError={setError} />

        {loading ? <div className="center">
            <Loader />
        </div> : <button className="btn btn--submit btn--submitProduct" onClick={() => { handleSubmit(); }}>
            {updateMode ? "Zaktualizuj wpis" : "Dodaj wpis"}
        </button>}

    </main>
};

export default AdminBlogEdition;
