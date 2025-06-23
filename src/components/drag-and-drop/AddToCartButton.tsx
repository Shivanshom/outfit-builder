'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { DroppableZoneRefMap } from './DroppableZone';

const AddToCartButton: React.FC = () => {
    const { addToCart } = useCart();

    const handleClick = () => {
        const top = DroppableZoneRefMap['top-zone']?.getCurrentItem?.();
        const bottom = DroppableZoneRefMap['bottom-zone']?.getCurrentItem?.();
        const shoes = DroppableZoneRefMap['shoes-zone']?.getCurrentItem?.();

        // 💡 Ensure all 3 parts are selected
        if (!top || !bottom || !shoes) {
            alert('Please complete the outfit (top, bottom, shoes) before adding to cart.');
            return;
        }

        addToCart([top, bottom, shoes]);

        // ✅ Optionally: Clear zones after adding
        DroppableZoneRefMap['top-zone']?.clear?.();
        DroppableZoneRefMap['bottom-zone']?.clear?.();
        DroppableZoneRefMap['shoes-zone']?.clear?.();

        alert('Outfit added to cart!');
    };

    return (
        <button
            onClick={handleClick}
            style={{
                // marginTop: '20px',
                padding: '10px 16px',
                backgroundColor: '#111',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '15px',
                minHeight: '44px', // 🔥 ensure equal height
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
            }}
        >
            Add to Cart
        </button>
    );
};

export default AddToCartButton;
