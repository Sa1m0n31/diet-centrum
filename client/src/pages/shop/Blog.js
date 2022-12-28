import React, {useEffect, useState} from 'react';
import SiteHeader from "../../components/shop/SiteHeader";
import Footer from "../../components/shop/Footer";
import {getAllArticles, getAllCategories} from "../../helpers/api/blog";
import searchIcon from '../../static/img/search.svg';
import {API_URL} from "../../static/settings";
import {getStringDate} from "../../helpers/api/others";

const Blog = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [categoriesIds, setCategoriesIds] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentCategories, setCurrentCategories] = useState([0]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        getAllArticles()
            .then((res) => {
               if(res?.status === 200) {
                   setArticles(res.data);
                   setFilteredArticles(res.data);
               }
            });
    }, []);

    useEffect(() => {
        if(articles) {
            const allCategoriesWithDuplicates = articles.reduce((prev, curr) => {
                return [...prev, ...JSON.parse(curr.categories)];
            }, []);

            setCategoriesIds([...new Set(allCategoriesWithDuplicates)]);
        }
    }, [articles]);

    useEffect(() => {
        if(categoriesIds) {
            getAllCategories()
                .then((res) => {
                    if(res.status === 200) {
                        const categoriesObjects = res.data;

                        setCategories(categoriesIds.map((item) => {
                            const categoryId = item;
                            return categoriesObjects.find((item) => (item.id === categoryId));
                        }));
                    }
                })
        }
    }, [categoriesIds]);

    useEffect(() => {
        setFilteredArticles(articles.filter((item) => {
            const categories = JSON.parse(item.categories);
            let categoryCondition = false;

            if(currentCategories.includes(0)) {
                categoryCondition = true;
            }
            else {
                for(const filterCategoryId of currentCategories) {
                    if(categories.includes(filterCategoryId)) {
                        categoryCondition = true;
                    }
                }
            }

            let textCondition = item.title.toLowerCase().includes(searchValue.toLowerCase());

            return categoryCondition && textCondition;
        }));
    }, [currentCategories, searchValue]);

    const handleCategoriesChange = (id) => {
        if(id === 0) {
            setCurrentCategories([0]);
        }
        else {
            if(currentCategories.includes(id)) {
                setCurrentCategories(currentCategories.filter((item) => ((item !== id) && (item !== 0))));
            }
            else {
                setCurrentCategories([...currentCategories.filter((item) => (item !== 0)), id]);
            }
        }
    }

    const getCategoryById = (id) => {
        return categories.find((item) => (item.id === id))?.name || '';
    }

    return <div className="container container--blog">
        <SiteHeader />

        <main className="blog w">
            <h1 className="section__header">
                Blog
            </h1>

            <div className="blog__top flex">
                <div className="blog__categories flex flex--start">
                    <button className={currentCategories.includes(0) ? "btn btn--category btn--category--selected" : "btn btn--category"}
                            onClick={() => { handleCategoriesChange(0); }}>
                        Wszystkie wpisy
                    </button>

                    {categories.map((item, index) => {
                        return <button className={currentCategories.includes(item.id) ? "btn btn--category btn--category--selected" : "btn btn--category"}
                                       key={index}
                                       onClick={() => { handleCategoriesChange(item.id); }}>
                            {item.name}
                        </button>
                    })}
                </div>

                <div className="blog__search">
                    <label className="blog__search__label flex">
                        <input className="input input--search"
                               value={searchValue}
                               onChange={(e) => { setSearchValue(e.target.value); }}
                               placeholder="Szukaj artykułu..." />
                        <img className="img" src={searchIcon} alt="szukaj" />
                    </label>
                </div>
            </div>

            <div className="blog__articles flex">
                {filteredArticles.map((item, index) => {
                    const date = item.created_at.split('T')[0];
                    const splitDate = date.split('-');

                    return <a className="blog__articles__item"
                              key={index}
                              href={`/blog/${item.slug}`}>
                        <span className="blog__articles__item__categories flex flex--start">
                            {JSON.parse(item.categories).map((item, index) => {
                                return <span className="blog__articles__item__categories__item center"
                                             key={index}>
                                    {getCategoryById(item)}
                                </span>
                            })}
                        </span>

                        <figure className="blog__articles__item__image">
                            <img className="img" src={`${API_URL}/${item.image}`} alt={item.title} />
                        </figure>

                        <span className="blog__articles__item__date">
                            {getStringDate(splitDate[2], splitDate[1], splitDate[0])}
                        </span>
                        <h2 className="blog__articles__item__title">
                            {item.title}
                        </h2>

                        <span className="btn btn--blog center">
                            Przejdź do wpisu
                        </span>
                    </a>
                })}
            </div>
        </main>

        <Footer />
    </div>
};

export default Blog;
