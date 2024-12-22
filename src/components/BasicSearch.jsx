import React from 'react';

export const BasicSearch = ({ searchText, onInputChange, onSearch, onReset }) => {
    return (
        <div className="basic-search">
            <label htmlFor="searchText">Search by Property Type:</label>
            <input
                type="text"
                id="searchText"
                value={searchText}
                onChange={onInputChange}
                placeholder="Enter property type (e.g., House, Flat)"
            />
            <button onClick={onSearch} className="search-button">Search</button>
            <button onClick={onReset} className="reset-button">Reset</button>
        </div>
    );
};