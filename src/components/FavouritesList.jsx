import React from 'react';

export const FavouritesList = ({ favourites, onDrop, onDragOver, onRemoveDrop, onClearFavourites }) => (
    <div
        className="favourites-list"
        onDrop={onDrop}
        onDragOver={onDragOver}
    >
        <h2>{'Favourites'}</h2>
        {favourites.map((property) => (
            <div key={property.id} className="favourite-item" draggable
                 onDragStart={(event) => event.dataTransfer.setData('propertyId', property.id)}>
                <h3>{property.type}</h3>
                <p>{property.location}</p>
                <button onClick={() => onRemoveDrop({
                    dataTransfer: {getData: () => property.id}, preventDefault: () => {
                    }
                })} className="remove-button">{'Remove'}</button>
            </div>
        ))}
        <div className="remove-drop-zone" onDrop={onRemoveDrop} onDragOver={onDragOver}>
        </div>
        {favourites.length > 0 && (
            <button onClick={onClearFavourites} className="clear-button">{'Clear Favourites'}</button>
        )}
    </div>
);