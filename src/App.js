import React from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import './scss/app.scss';

function App() {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories />
                        <Sort />
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        <PizzaBlock title="test1"  price={300}/>
                        <PizzaBlock title="test2"  price="400"/>
                        <PizzaBlock title="test3"  price="500"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
