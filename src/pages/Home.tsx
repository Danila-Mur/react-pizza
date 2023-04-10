import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import {
    selectFilter,
    setCategoryId,
    setCurrentPage,
    setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizza } from '../redux/slices/pizzaSlice';

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { categoryId, sort, currentPage, searchValue } =
        useSelector(selectFilter);
    const { items, status } = useSelector(selectPizza);

    const onClickCategory = (id: number) => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = (num: number) => {
        dispatch(setCurrentPage(num));
    };

    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const search = searchValue ? `&q=${searchValue}` : '';

        dispatch(
            // @ts-ignore
            fetchPizzas({
                category,
                sortBy,
                order,
                search,
                currentPage,
            })
        );

        window.scrollTo(0, 0);
    };

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
        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ));
    const pizzas = items.map((pizza: any) => (
        <Link to={`/pizza/${pizza.id}`} key={pizza.id}>
            <PizzaBlock {...pizza} />
        </Link>
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
            {status === 'error' ? (
                <>
                    <h1>
                        <span>😕</span>
                        <br />
                        Произошла ошибка
                    </h1>
                    <p>К сожалению, не удалось получить пиццы.</p>
                </>
            ) : (
                <>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {status === 'loading' ? skeletons : pizzas}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        onPageChange={onChangePage}
                    />
                </>
            )}
        </div>
    );
};

export default Home;
