import React from 'react';

export const FavouritesList = ({ favourites, onDrop, onDragOver }) => (
    <div
        className="favourites-list"
        onDrop={onDrop}
        onDragOver={onDragOver}
    >
        <h2>Favourites</h2>
        {favourites.map((property) => (
            <div key={property.id} className="favourite-item">
                <h3>{property.type}</h3>
                <p>{property.location}</p>
            </div>
        ))}
    </div>
);
