import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import axios from 'axios';

const Home = () => {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoadnig] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3004/items').then((res) => {
            setPizzas(res.data);
            setIsLoadnig(false);
        });
    }, []);

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => (
                          <Skeleton key={index} />
                      ))
                    : pizzas.map((pizza) => (
                          <PizzaBlock key={pizza.id} {...pizza} />
                      ))}
            </div>
        </>
    );
};

export default Home;
