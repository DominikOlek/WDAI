import React from 'react';
import Product from './Produkt'; // Importujemy komponent Produkt

const Cart: React.FC = () => {
    return (
        <div>
            <h2>Koszyk</h2>
            <Product nazwa="Jablko" />
            <Product nazwa="Gruszka" />
            <Product nazwa="Banany" />
            <Product nazwa="Pomarancza" />
            <Product nazwa="Truskawki" />
        </div>
    );
};

export default Cart;