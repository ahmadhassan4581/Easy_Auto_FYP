import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (car, showroomId) => {
        const carWithDetails = {
            ...car,
            name: car.make + ' ' + car.model, // Create a name field if it doesn’t exist
            showroomId, // Store the selected showroom ID
        };
        setCart((prevCart) => [...prevCart, carWithDetails]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
