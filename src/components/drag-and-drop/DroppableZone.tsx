'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';

type DroppableZoneProps = {
    zoneId: string;
    acceptedType: 'top' | 'bottom' | 'shoes';
    label?: string; 
};

type DroppedItem = {
    id: string;
    imageUrl: string;
    itemType: 'top' | 'bottom' | 'shoes';
};
export type DroppableZoneHandler = {
    (item: DroppedItem): void;
    getCurrentItem?: () => DroppedItem | null;
    clear?: () => void;
};

export const DroppableZoneRefMap: Record<string, DroppableZoneHandler> = {};

const DroppableZone: React.FC<DroppableZoneProps> = ({ zoneId, acceptedType, label }) => {
    const { isOver, setNodeRef, active } = useDroppable({
        id: zoneId,
    });

    const droppedItemRef = useRef<DroppedItem | null>(null);
    const [, forceUpdate] = useState(0);

    useEffect(() => {
        DroppableZoneRefMap[zoneId] = (item: DroppedItem) => {
            if (item.itemType === acceptedType) {
                droppedItemRef.current = item;
                forceUpdate((x) => x + 1);
            }
        };
        DroppableZoneRefMap[zoneId].getCurrentItem = () => droppedItemRef.current;
        DroppableZoneRefMap[zoneId].clear = () => {
            droppedItemRef.current = null;
            forceUpdate(x => x + 1);
        };
        return () => {
            delete DroppableZoneRefMap[zoneId];
        };
    }, [zoneId, acceptedType]);
    return (
        <div
            ref={setNodeRef}
            style={{
                minHeight: '120px',
                margin: '16px 0',
                border: '2px dashed #aaa',
                borderRadius: '10px',
                backgroundColor: isOver ? '#f0f0f0' : '#fff',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            {label && (
                <div style={{
                    position: 'absolute',
                    top: 5,
                    left: 10,
                    fontSize: '14px',
                    color: '#666',
                    fontWeight: 500,
                }}>
                    {label}
                </div>
            )}

            {droppedItemRef.current ? (
                <img
                    src={droppedItemRef.current?.imageUrl}
                    alt={droppedItemRef.current?.itemType}
                    style={{
                        // maxHeight: '100px',
                        width: '120px',
                        height: 'auto',
                        objectFit: 'contain',
                    }}
                />
            ) : (
                <p style={{ color: '#bbb' }}>Drop a {acceptedType}</p>
            )}
        </div>
    );
};

export default DroppableZone;
