// TODO: create a component that displays a single bakery item
import React from 'react';

const BakeryItem = ({ item }) => {
    return (
        <div className="BakeryItem">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <img src={item.image} alt={item.name} />
        </div>
    );
};

export default BakeryItem;