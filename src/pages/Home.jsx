import React, { useEffect, useState, useContext, useRef } from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import {
    setCategoryId,
    setCurrentPage,
    setFilters,
} from '../redux/slices/filterSlice';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { categoryId, sort, currentPage } = useSelector(
        (state) => state.filterReducer
    );

    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoadnig] = useState(true);
    const { searchValue } = useContext(SearchContext);

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = (num) => {
        dispatch(setCurrentPage(num));
    };

    const fetchPizzas = () => {
        setIsLoadnig(true);

        axios
            .get(
                `http://localhost:3004/items?_page=${currentPage}&_limit=4&${
                    categoryId > 0 ? `category=${categoryId}` : ''
                }&_sort=${sort.sortProperty.replace('-', '')}&_order=${
                    sort.sortProperty.includes('-') ? 'asc' : 'desc'
                }&q=${searchValue ? `${searchValue}` : ''}`
            )
            .then((res) => {
                setPizzas(res.data);
                setIsLoadnig(false);
            });
    };

    // const category = categoryId > 0 ? `category=${categoryId}` : '';
    // const sortBy = sortType.sortProperty.replace('-', '');
    // const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    // const search = searchValue ? `&q=${searchValue}` : '';

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify(
                {
                    sortProperty: sort.sortProperty,
                    categoryId,
                    currentPage,
                },
                { addQueryPrefix: true }
            );

            navigate(`${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage]);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = sortList.find(
                (obj) => obj.sortProperty === params.sortProperty
            );

            dispatch(setFilters({ ...params, sort }));
        }
        isSearch.current = true;
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!isSearch.current) {
            fetchPizzas();
        }

        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ));
    const items = pizzas.map((pizza) => (
        <PizzaBlock key={pizza.id} {...pizza} />
    ));

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onClickCategory={onClickCategory}
                />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : items}
            </div>
            <Pagination currentPage={currentPage} onPageChange={onChangePage} />
        </div>
    );
};

export default Home;
