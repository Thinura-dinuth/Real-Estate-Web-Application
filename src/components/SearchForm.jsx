import React from 'react';
import { DropdownList, NumberPicker, DateTimePicker } from 'react-widgets';
import 'react-widgets/styles.css';

const propertyTypes = ['Any', 'House', 'Flat'];

const SearchForm = ({ searchCriteria, handleInputChange, handleSubmit }) => (
    <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
            <label htmlFor="type">{'Property Type:'}</label>
            <DropdownList
                id="type"
                name="type"
                data={propertyTypes}
                value={searchCriteria.type}
                onChange={(value) => handleInputChange({ target: { name: 'type', value } })}
            />
        </div>

        <div className="form-group">
            <label htmlFor="minPrice">{'Min Price (£):'}</label>
            <NumberPicker
                id="minPrice"
                name="minPrice"
                value={searchCriteria.minPrice}
                onChange={(value) => handleInputChange({ target: { name: 'minPrice', value } })}
            />

            <label htmlFor="maxPrice">{'Max Price (£):'}</label>
            <NumberPicker
                id="maxPrice"
                name="maxPrice"
                value={searchCriteria.maxPrice}
                onChange={(value) => handleInputChange({ target: { name: 'maxPrice', value } })}
            />
        </div>

        <div className="form-group">
            <label htmlFor="minBedrooms">{'Min Bedrooms:'}</label>
            <NumberPicker
                id="minBedrooms"
                name="minBedrooms"
                value={searchCriteria.minBedrooms}
                onChange={(value) => handleInputChange({ target: { name: 'minBedrooms', value } })}
            />

            <label htmlFor="maxBedrooms">{'Max Bedrooms:'}</label>
            <NumberPicker
                id="maxBedrooms"
                name="maxBedrooms"
                value={searchCriteria.maxBedrooms}
                onChange={(value) => handleInputChange({ target: { name: 'maxBedrooms', value } })}
            />
        </div>

        <div className="form-group">
            <label htmlFor="startDate">{'Date Added After:'}</label>
            <DateTimePicker
                id="startDate"
                name="startDate"
                value={searchCriteria.startDate}
                onChange={(value) => handleInputChange({ target: { name: 'startDate', value } })}
            />

            <label htmlFor="endDate">{'Date Added Before:'}</label>
            <DateTimePicker
                id="endDate"
                name="endDate"
                value={searchCriteria.endDate}
                onChange={(value) => handleInputChange({ target: { name: 'endDate', value } })}
            />
        </div>

        <div className="form-group">
            <label htmlFor="postcode">{'Postcode Area:'}</label>
            <input
                type="text"
                id="postcode"
                name="postcode"
                value={searchCriteria.postcode}
                onChange={handleInputChange}
                placeholder="e.g., BR1, NW1"
            />
        </div>

        <button type="submit" className="submit-button">{'Search'}</button>
    </form>
);

export default SearchForm;