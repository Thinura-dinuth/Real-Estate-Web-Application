import React, { useState } from 'react';
import propertiesData from '../properties.json';
import SearchForm from './SearchForm';

const PropertySearch = ({ setActiveSearch, setFilteredProperties, setErrorMessage }) => {
    const [searchCriteria, setSearchCriteria] = useState({
        type: 'any',
        minPrice: '',
        maxPrice: '',
        minBedrooms: '',
        maxBedrooms: '',
        startDate: '',
        endDate: '',
        postcode: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const filterProperties = () => {
        setActiveSearch('advanced');
        const { type, minPrice, maxPrice, minBedrooms, maxBedrooms, startDate, endDate, postcode } = searchCriteria;
        const filtered = propertiesData.properties.filter((property) => {
            const price = property.price;
            const bedrooms = property.bedrooms;
            const addedDate = new Date(`${property.added.year}-${property.added.month}-${property.added.day}`);

            const matchesType = type === 'any' || property.type.toLowerCase() === type.toLowerCase();
            const matchesPrice = (!minPrice || price >= parseInt(minPrice)) && (!maxPrice || price <= parseInt(maxPrice));
            const matchesBedrooms = (!minBedrooms || bedrooms >= parseInt(minBedrooms)) && (!maxBedrooms || bedrooms <= parseInt(maxBedrooms));
            const matchesStartDate = !startDate || addedDate >= new Date(startDate);
            const matchesEndDate = !endDate || addedDate <= new Date(endDate);
            const matchesPostcode = !postcode || property.location.toLowerCase().startsWith(postcode.toLowerCase());

            return matchesType && matchesPrice && matchesBedrooms && matchesStartDate && matchesEndDate && matchesPostcode;
        });

        setFilteredProperties(filtered);
        setErrorMessage(filtered.length === 0 ? 'No properties match the search criteria.' : '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        filterProperties();
    };

    const handleReset = () => {
        setSearchCriteria({
            type: 'any',
            minPrice: '',
            maxPrice: '',
            minBedrooms: '',
            maxBedrooms: '',
            startDate: '',
            endDate: '',
            postcode: ''
        });
        setFilteredProperties(propertiesData.properties);
        setErrorMessage('');
    };

    return (
        <div className="property-search">
            <SearchForm
                searchCriteria={searchCriteria}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
            <button onClick={handleReset} className="reset-button">Reset</button>
        </div>
    );
};

export default PropertySearch;