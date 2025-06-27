'use client';

import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import ClothingPanel from './ClothingPanel';
import OutfitCanvas from './OutfitCanvas';
import { DroppableZoneRefMap } from './DroppableZone';
import CartSidebar from './CartSidebar';
const DragAndDropIndex: React.FC = () => {
    const [activeItem, setActiveItem] = useState<any>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveItem(active.data.current);
    };
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;
        const itemType = active.data.current?.itemType;
        const imageUrl = active.data.current?.imageUrl;

        if (itemType && imageUrl && DroppableZoneRefMap[over.id]) {
            DroppableZoneRefMap[over.id]({
                id: String(active.id),
                imageUrl,
                itemType,
            });
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <div
                style={{
                    minHeight: '100vh',
                    backgroundColor: '#f9f9f9',
                    padding: '40px 16px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: '40px',
                    flexWrap: 'wrap',
                    maxWidth: '1400px', 
                    margin: '0 auto',
                }}
            >
                <ClothingPanel />
                <OutfitCanvas onCartClick={() => setIsCartOpen(true)} />
            </div>
            <DragOverlay>
                {activeItem ? (
                    <img
                        src={activeItem.imageUrl}
                        alt={activeItem.itemType}
                        style={{
                            width: '80px',
                            height: '80px',
                            pointerEvents: 'none',
                            zIndex: 9999,
                        }}
                    />
                ) : null}
            </DragOverlay>
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        </DndContext>
    );
};

export default DragAndDropIndex;
