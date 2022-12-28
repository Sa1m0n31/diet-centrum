import React, {useEffect, useState} from 'react';
import {addCategory, getAllCategories, updateCategory} from "../../helpers/api/blog";
import {errorText} from "../../helpers/admin/content";
import trashIcon from '../../static/img/trash.svg';
import updateIcon from '../../static/img/edit.svg';
import checkIcon from '../../static/img/check.svg';

const AdminBlogCategories = ({categories, setCategories, setError}) => {
    const [allCategories, setAllCategories] = useState([]);
    const [name, setName] = useState('');
    const [updateId, setUpdateId] = useState(-1);
    const [updateName, setUpdateName] = useState('');

    useEffect(() => {
        if(!name || !updateName) {
            getAllCategories()
                .then((res) => {
                    if(res.status === 200) {
                        setAllCategories(res.data);
                    }
                });
        }
    }, [name, updateName]);

    const openDeleteModal = (id) => {

    }

    const handleSelect = (id) => {
        if(categories.includes(id)) {
            setCategories(prevState => (prevState.filter((item) => (item !== id))));
        }
        else {
            setCategories(prevState => ([...prevState, id]));
        }
    }

    const handleAddNew = () => {
        if(name) {
            addCategory(name)
                .then((res) => {
                    if(res.status === 201) {
                        setName('');
                    }
                    else {
                        setError(errorText);
                    }
                })
                .catch((e) => {
                    setError(errorText);
                });
        }
    }

    const handleUpdate = (id) => {
        if(id && updateName) {
            updateCategory(id, updateName)
                .then((res) => {
                    if(res.status === 200) {
                        setUpdateName('');
                        setUpdateId(-1);
                    }
                    else {
                        setError(errorText);
                    }
                })
                .catch((e) => {
                    setError(errorText);
                });
        }
    }

    const isSelected = (id) => {
        return categories.includes(id);
    }

    return <div className="categories">
        <h3 className="categories__header">
            Wybierz kategorie
        </h3>

        <div className="categories__list">
            {allCategories.map((item, index) => {
                return <div className="categories__list__item flex"
                            key={index}>
                    <label className={isSelected(item.id) ? "adminSelect flex flex--start" : "flex flex--start"}>
                        <button className="btn btn--adminSelect" onClick={() => { handleSelect(item.id); }}>

                        </button>
                        {updateId === item.id ? <input className="input input--updateCategory"
                                                       onKeyUp={(e) => { if(e.key === 'Enter') handleUpdate(item.id); }}
                                                       value={updateName}
                                                       onChange={(e) => { setUpdateName(e.target.value); }} /> : item.name}
                    </label>

                    <div className="categories__list__item__buttons flex flex--end">
                        <button className="btn btn--deleteCategory"
                                onClick={() => { openDeleteModal(item.id); }}>
                            <img className="img" src={trashIcon} alt="usuń" />
                        </button>
                        {updateId !== item.id ? <button className="btn btn--updateCategory"
                                            onClick={() => { setUpdateId(item.id); setUpdateName(item.name); }}>
                            <img className="img" src={updateIcon} alt="edytuj" />
                        </button> : <button className="btn btn--updateCategory"
                                            onClick={() => { handleUpdate(item.id); }}>
                            <img className="img" src={checkIcon} alt="edytuj" />
                        </button>}
                    </div>
                </div>
            })}
        </div>

        <div className="addNewCategory flex flex--start">
            <input className='input input--newCategory'
                   onKeyUp={(e) => { if(e.key === 'Enter') handleAddNew(); }}
                   value={name}
                   onChange={(e) => { setName(e.target.value); }}
                   placeholder="Dodaj nową kategorię" />

           <button className="btn btn--addNewCategory"
                   onClick={() => { handleAddNew(); }}>
               Dodaj kategorię
           </button>
        </div>
    </div>
};

export default AdminBlogCategories;
