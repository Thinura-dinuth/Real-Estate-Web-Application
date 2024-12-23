import { Link } from 'react-router-dom';

export const PropertyResults = ({ properties, onDragStart, onToggleFavourite, favouriteIds }) => {
    return (
        <div className="property-results">
            {properties.map((property) => (
                <div
                    key={property.id}
                    className="property-item"
                    draggable
                    onDragStart={(event) => onDragStart(property, event)}
                >
                    <h3>{property.type}</h3>
                    <p>{property.location}</p>
                    {property.images.length > 0 && (
                        <img className="thumbnail" src={property.images[0]} alt={`${property.type} image`} />
                    )}
                    <p>Price: £{property.price}</p>
                    <span
                        className={`heart-icon ${favouriteIds.includes(property.id) ? 'favourite' : ''}`}
                        onClick={() => onToggleFavourite(property)}
                    >
                        ♥
                    </span>
                    <Link to={`/property/${property.id}`} className="view-details-button">View Details</Link>
                </div>
            ))}
        </div>
    );
};