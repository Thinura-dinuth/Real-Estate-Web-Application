import React, { useState } from 'react';
import propertiesData from '../properties.json';
import PropertySearch from './PropertySearch';

const SearchBar = () => {
    const [searchText, setSearchText] = useState('');
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
        const filtered = propertiesData.properties.filter((property) =>
            property.type.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredProperties(filtered);
        setErrorMessage(filtered.length === 0 ? 'No properties match the search criteria.' : '');
        console.log('Filtered properties:', filtered);
    };

    const toggleAdvancedOptions = () => {
        setShowAdvancedOptions((prevState) => !prevState);
    };

    return (
        <div className="search-bar">
            <h1>Search Properties</h1>
            {!showAdvancedOptions && (
                <div className="basic-search">
                    <label htmlFor="searchText">Search by Property Type:</label>
                    <input
                        type="text"
                        id="searchText"
                        value={searchText}
                        onChange={handleInputChange}
                        placeholder="Enter property type (e.g., House, Flat)"
                    />
                    <button onClick={handleSearch} className="search-button">Search</button>
                </div>
            )}
            <button onClick={toggleAdvancedOptions} className="advanced-options-button">
                {showAdvancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
            </button>

            {showAdvancedOptions && (
                <div className="advanced-options">
                    <PropertySearch />
                </div>
            )}

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {filteredProperties.length > 0 && (
                <div className="search-results">
                    <h2>Search Results</h2>
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
                </div>
            )}
        </div>
    );
};

export default SearchBar;