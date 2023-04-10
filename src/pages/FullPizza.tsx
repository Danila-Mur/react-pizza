import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullPizza: React.FC = () => {
    const navigate = useNavigate();
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    const { id } = useParams();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    `http://localhost:3004/items/${id}`
                );
                setPizza(data);
            } catch (error) {
                alert('Ошибка при получении пиццы');
                navigate('/');
            }
        }

        fetchPizza();
    }, []);

    if (!pizza) {
        return <>Загрузка...</>;
    }

    return (
        <div className="container">
            <img src={pizza.imageUrl} alt="" />
            <h2>{pizza.title}</h2>
            <p>{pizza.price} р.</p>
        </div>
    );
};

export default FullPizza;
