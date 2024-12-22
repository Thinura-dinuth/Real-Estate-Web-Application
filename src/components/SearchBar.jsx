import React, { useState, useEffect } from 'react';
import propertiesData from '../properties.json';
import { BasicSearch } from './BasicSearch.jsx';
import { PropertyResults } from './PropertyResults.jsx';
import { FavouritesList } from './FavouritesList.jsx';
import { PropertyDetails } from './PropertyDetails.jsx';
import PropertySearch from './PropertySearch.jsx'; // Ensure PropertySearch is imported

const SearchBar = () => {
    const [searchText, setSearchText] = useState('');
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    const [filteredProperties, setFilteredProperties] = useState(propertiesData.properties);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [favouriteProperties, setFavouriteProperties] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setFilteredProperties(propertiesData.properties);
    }, []);

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
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
        setSelectedProperty(null);
    };

    const handlePropertySelect = (property) => {
        setSelectedProperty(property);
    };

    const toggleAdvancedOptions = () => {
        setShowAdvancedOptions((prevState) => !prevState);
    };

    const toggleFavourite = (property) => {
        const isFavourite = favouriteProperties.some((fav) => fav.id === property.id);
        if (isFavourite) {
            setFavouriteProperties((prevState) => prevState.filter((fav) => fav.id !== property.id));
        } else {
            setFavouriteProperties((prevState) => [...prevState, property]);
        }
    };

    const handleDragStart = (property, event) => {
        event.dataTransfer.setData('propertyId', property.id);
    };

    const handleDrop = (event) => {
        const propertyId = event.dataTransfer.getData('propertyId');
        const property = filteredProperties.find((prop) => prop.id === propertyId);
        if (property && !favouriteProperties.some((fav) => fav.id === property.id)) {
            setFavouriteProperties((prevState) => [...prevState, property]);
        }
        event.preventDefault();
    };

    const allowDrop = (event) => {
        event.preventDefault();
    };

    return (
        <div className="search-bar">
            <h1>Search Properties</h1>
            {!showAdvancedOptions && (
                <BasicSearch
                    searchText={searchText}
                    onInputChange={handleInputChange}
                    onSearch={handleSearch}
                    onReset={handleReset}
                />
            )}
            <button onClick={toggleAdvancedOptions} className="advanced-options-button">
                {showAdvancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
            </button>

            {showAdvancedOptions && (
                <div className="advanced-options">
                    <PropertySearch
                        setActiveSearch={() => {}}
                        setFilteredProperties={setFilteredProperties}
                        setErrorMessage={setErrorMessage}
                    />
                </div>
            )}

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="property-lists">
                <PropertyResults
                    properties={filteredProperties}
                    onDragStart={handleDragStart}
                    onToggleFavourite={toggleFavourite}
                    favouriteIds={favouriteProperties.map((prop) => prop.id)}
                    onSelectProperty={handlePropertySelect}
                />
                <FavouritesList
                    favourites={favouriteProperties}
                    onDrop={handleDrop}
                    onDragOver={allowDrop}
                />
            </div>
        </div>
    );
};

export default SearchBar;