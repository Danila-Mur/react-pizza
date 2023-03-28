import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';


const Home = () => {
    const dispatch = useDispatch();

    const { categoryId, sort, currentPage } = useSelector((state) => state.filterReducer);

    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoadnig] = useState(true);
    const { searchValue } = useContext(SearchContext);

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = (num) => {
        dispatch(setCurrentPage(num))
    }

    // const category = categoryId > 0 ? `category=${categoryId}` : '';
    // const sortBy = sortType.sortProperty.replace('-', '');
    // const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    // const search = searchValue ? `&q=${searchValue}` : '';

    useEffect(() => {
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
        window.scrollTo(0, 0);
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
