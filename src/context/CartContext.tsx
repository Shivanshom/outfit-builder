'use client';

import React, { createContext, useContext, useState } from 'react';

type OutfitItem = {
    id: string;
    imageUrl: string;
    itemType: 'top' | 'bottom' | 'shoes';
};

type Outfit = {
    id: string; // e.g., outfit1
    items: OutfitItem[];
};

type CartContextType = {
    cart: Outfit[];
    addToCart: (items: OutfitItem[]) => void;
    clearCart: () => void;
    cartCount: number;
    removeOutfit: (id: string) => void;

};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Outfit[]>([]);

    const addToCart = (items: OutfitItem[]) => {
        const id = `outfit-${Date.now()}`;
        setCart(prev => [...prev, { id, items }]);
    };
    const removeOutfit = (id: string) => {
        setCart(prev => prev.filter(outfit => outfit.id !== id));
    };

    const clearCart = () => setCart([]);
    const cartCount = cart.length;
    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, cartCount, removeOutfit }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
