import React, { useState, useEffect } from 'react';
import propertiesData from '../properties.json';
import PropertySearch from './PropertySearch';
import PropertyList from './PropertyList';

const SearchBar = () => {
    const [searchText, setSearchText] = useState('');
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    const [filteredProperties, setFilteredProperties] = useState(propertiesData.properties);
    const [errorMessage, setErrorMessage] = useState('');
    const [activeSearch, setActiveSearch] = useState('basic');

    useEffect(() => {
        setFilteredProperties(propertiesData.properties);
    }, []);

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
        setActiveSearch('basic');
        const filtered = propertiesData.properties.filter((property) =>
            property.type.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredProperties(filtered);
        setErrorMessage(filtered.length === 0 ? 'No properties match the search criteria.' : '');
    };

    const handleReset = () => {
        setSearchText('');
        setFilteredProperties(propertiesData.properties);
        setErrorMessage('');
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
                    <button onClick={handleReset} className="reset-button">Reset</button>
                </div>
            )}
            <button onClick={toggleAdvancedOptions} className="advanced-options-button">
                {showAdvancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
            </button>

            {showAdvancedOptions && (
                <div className="advanced-options">
                    <PropertySearch setActiveSearch={setActiveSearch} setFilteredProperties={setFilteredProperties} setErrorMessage={setErrorMessage} />
                </div>
            )}

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <PropertyList properties={filteredProperties} />
        </div>
    );
};

export default SearchBar;