'use client';

import React from 'react';
import DroppableZone from './DroppableZone';
import AddToCartButton from './AddToCartButton';
import CartButtons from './CartButtons';
type OutfitCanvasProps = {
    onCartClick: () => void;
};

const OutfitCanvas: React.FC<OutfitCanvasProps> = ({ onCartClick }) => {
    return (
        <div
            style={{
                border: '2px solid #ccc',
                borderRadius: '12px',
                padding: '24px',
                backgroundColor: '#fafafa',
                width: '100%',
                maxWidth: '500px',
                margin: '40px auto',
                boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
            }}
        >
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#000000' }}>
                Outfit Builder Canvas
            </h2>

            <DroppableZone zoneId="top-zone" acceptedType="top" label="Top" />
            <DroppableZone zoneId="bottom-zone" acceptedType="bottom" label="Bottom" />
            <DroppableZone zoneId="shoes-zone" acceptedType="shoes" label="Shoes" />
            <div
                style={{
                    display: 'flex',
                    gap: '12px',
                    marginTop: '20px',
                    justifyContent: 'center', // or 'flex-start' based on alignment
                    flexWrap: 'wrap',
                }}
            >
                <AddToCartButton />
                <CartButtons onCartClick={onCartClick} />
            </div>

        </div>

    );
};

export default OutfitCanvas;
