import React from 'react';

type ProductProps = {
    nazwa: string;
};

const Product: React.FC<ProductProps> = ({ nazwa }) => {
    return (
        <div>
            <h3>Produkt: {nazwa}</h3>
        </div>
    );
};

export default Product;