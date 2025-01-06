import React from 'react';
import Product from './Produkt';

const NowyKoszyk: React.FC = () => {
    const produkty = ['Jabłko', 'Gruszka', 'Banany', 'Pomarańcza', 'Truskawki'];

    return (
        <div>
            {produkty.map((nazwa, index) => (
                <Product key={index} nazwa={nazwa} />
            ))}
        </div>
    );
};

export default NowyKoszyk;