import React from 'react';

const PropertyList = ({ properties }) => (
    <div className="search-results">
        <h2>Search Results</h2>
        <ul>
            {properties.map((property) => (
                <li key={property.id}>
                    <h3>{property.type} - {property.location}</h3>
                    <p>Price: £{property.price}</p>
                    <p>Bedrooms: {property.bedrooms}</p>
                    <p>Date Added: {`${property.added.day} ${property.added.month} ${property.added.year}`}</p>
                    <p>{property.description}</p>
                </li>
            ))}
        </ul>
    </div>
);

export default PropertyList;