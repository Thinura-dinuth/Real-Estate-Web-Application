import React from 'react';

const SearchResults = ({ filteredProperties }) => (
    <div className="results">
        <h2>Search Results</h2>
        {filteredProperties.length > 0 ? (
            <ul>
                {filteredProperties.map((property) => (
                    <li key={property.id}>
                        <h3>{property.type} - {property.location}</h3>
                        <p>Price: £{property.price}</p>
                        <p>Bedrooms: {property.bedrooms}</p>
                        <p>Date Added: {`${property.added.day} ${property.added.month} ${property.added.year}`}</p>
                        <p>{property.description}</p>
                    </li>
                ))}
            </ul>
        ) : (
            <p>No properties match the search criteria.</p>
        )}
    </div>
);

export default SearchResults;