import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import axios from 'axios';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoadnig] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating',
    });

    // const category = categoryId > 0 ? `category=${categoryId}` : '';
    // const sortBy = sortType.sortProperty.replace('-', '');
    // const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    // const search = searchValue ? `&q=${searchValue}` : '';

    useEffect(() => {
        setIsLoadnig(true);
        axios
            .get(
                `http://localhost:3004/items?_page=${currentPage}&_limit=4${
                    categoryId > 0 ? `category=${categoryId}` : ''
                }&_sort=${sortType.sortProperty.replace('-', '')}&_order=${
                    sortType.sortProperty.includes('-') ? 'asc' : 'desc'
                }&q=${searchValue ? `${searchValue}` : ''}`
            )
            .then((res) => {
                setPizzas(res.data);
                setIsLoadnig(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

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
                    onClickCategory={(i) => setCategoryId(i)}
                />
                <Sort value={sortType} onClickSort={(i) => setSortType(i)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : items}
            </div>
            <Pagination onPageChange={num => setCurrentPage(num)} />
        </div>
    );
};

export default Home;
