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
                    <div className="property-info">
                        <div className="property-details">
                            <h3>{property.type}</h3>
                            <p>{property.location}</p>
                            <p>{`Price: £${property.price}`}</p>
                            <Link to={`/property/${property.id}`}
                                  className="view-details-button">{'View Details'}</Link>
                            <span
                                className={`heart-icon ${favouriteIds.includes(property.id) ? 'favourite' : ''}`}
                                onClick={() => onToggleFavourite(property)}
                            >{'♥'}</span>
                        </div>

                    </div>
                    {property.images.length > 0 && (
                        <img className="thumbnail" src={`/${property.images[0]}`} alt={`${property.type} image`}/>
                    )}

                </div>
            ))}
        </div>
    );
};