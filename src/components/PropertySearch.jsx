// Import React and useState
import  { useState } from 'react';
import propertiesData from '../properties.json'; // Assuming the JSON file is in the same directory

const PropertySearch = () => {
    // State to manage search criteria
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

    const [filteredProperties, setFilteredProperties] = useState([]);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Filter properties based on criteria
    const filterProperties = () => {
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
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        filterProperties();
    };

    return (
        <div className="property-search">
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
        </div>
    );
};

export default PropertySearch;