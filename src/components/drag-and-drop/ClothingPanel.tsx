'use client';

import React from 'react';
import DraggableClothingItem from './DraggableClothingItem';

type ClothingItem = {
    id: string;
    imageUrl: string;
    itemType: 'top' | 'bottom' | 'shoes';
};

// 🧥 Tops
const tops: ClothingItem[] = [
    { id: 'top1', imageUrl: '/images/tops/top1.webp', itemType: 'top' },
    { id: 'top2', imageUrl: '/images/tops/top2.jpg', itemType: 'top' },
    { id: 'top3', imageUrl: '/images/tops/top3.jpg', itemType: 'top' },
    { id: 'top4', imageUrl: '/images/tops/top4.png', itemType: 'top' },
    { id: 'top5', imageUrl: '/images/tops/top5.png', itemType: 'top' },];

// 👖 Bottoms
const bottoms: ClothingItem[] = [
    { id: 'bottom1', imageUrl: '/images/bottoms/bottom1.webp', itemType: 'bottom' },
    { id: 'bottom2', imageUrl: '/images/bottoms/bottom2.webp', itemType: 'bottom' },
    { id: 'bottom3', imageUrl: '/images/bottoms/bottom3.jpg', itemType: 'bottom' },
    { id: 'bottom4', imageUrl: '/images/bottoms/bottom4.png', itemType: 'bottom' },
    { id: 'bottom5', imageUrl: '/images/bottoms/bottom5.png', itemType: 'bottom' },
];

// 👟 Shoes
const shoes: ClothingItem[] = [
    { id: 'shoes1', imageUrl: '/images/shoes/shoes1.webp', itemType: 'shoes' },
    { id: 'shoes2', imageUrl: '/images/shoes/shoes2.webp', itemType: 'shoes' },
    { id: 'shoes3', imageUrl: '/images/shoes/shoes3.jpg', itemType: 'shoes' },
    { id: 'shoes4', imageUrl: '/images/shoes/shoes4.jpg', itemType: 'shoes' },
    { id: 'shoes5', imageUrl: '/images/shoes/shoes5.png', itemType: 'shoes' },
];

// 🔁 Group by type for clean rendering
const clothingItemsByType: Record<'top' | 'bottom' | 'shoes', ClothingItem[]> = {
    top: tops,
    bottom: bottoms,
    shoes: shoes,
};

const ClothingPanel: React.FC = () => {
    return (
        <div
            style={{
                width: '100%',
                maxWidth: '500px',
                margin: '40px auto',
                padding: '20px',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
            }}
        >
            <h2 style={{ textAlign: 'center', marginBottom: '24px', color:'#000000' }}>Clothing Items</h2>

            {Object.entries(clothingItemsByType).map(([type, items]) => (
                <div key={type} style={{ marginBottom: '28px' }}>
                    <h4 style={{ marginBottom: '12px', textTransform: 'capitalize', color: '#333' }}>
                        {type}
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {items.map((item) => (
                            <DraggableClothingItem
                                key={item.id}
                                id={item.id}
                                imageUrl={item.imageUrl}
                                itemType={item.itemType}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ClothingPanel;
