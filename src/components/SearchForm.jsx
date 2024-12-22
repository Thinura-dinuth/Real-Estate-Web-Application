import React from 'react';

const SearchForm = ({ searchCriteria, handleInputChange, handleSubmit }) => (
    <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
            <label htmlFor="type">Property Type:</label>
            <select id="type" name="type" value={searchCriteria.type} onChange={handleInputChange}>
                <option value="any">Any</option>
                <option value="house">House</option>
                <option value="flat">Flat</option>
            </select>
        </div>

        <div className="form-group">
            <label htmlFor="minPrice">Min Price (£):</label>
            <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={searchCriteria.minPrice}
                onChange={handleInputChange}
            />

            <label htmlFor="maxPrice">Max Price (£):</label>
            <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={searchCriteria.maxPrice}
                onChange={handleInputChange}
            />
        </div>

        <div className="form-group">
            <label htmlFor="minBedrooms">Min Bedrooms:</label>
            <input
                type="number"
                id="minBedrooms"
                name="minBedrooms"
                value={searchCriteria.minBedrooms}
                onChange={handleInputChange}
            />

            <label htmlFor="maxBedrooms">Max Bedrooms:</label>
            <input
                type="number"
                id="maxBedrooms"
                name="maxBedrooms"
                value={searchCriteria.maxBedrooms}
                onChange={handleInputChange}
            />
        </div>

        <div className="form-group">
            <label htmlFor="startDate">Date Added After:</label>
            <input
                type="date"
                id="startDate"
                name="startDate"
                value={searchCriteria.startDate}
                onChange={handleInputChange}
            />

            <label htmlFor="endDate">Date Added Before:</label>
            <input
                type="date"
                id="endDate"
                name="endDate"
                value={searchCriteria.endDate}
                onChange={handleInputChange}
            />
        </div>

        <div className="form-group">
            <label htmlFor="postcode">Postcode Area:</label>
            <input
                type="text"
                id="postcode"
                name="postcode"
                value={searchCriteria.postcode}
                onChange={handleInputChange}
                placeholder="e.g., BR1, NW1"
            />
        </div>

        <button type="submit" className="submit-button">Search</button>
    </form>
);

export default SearchForm;