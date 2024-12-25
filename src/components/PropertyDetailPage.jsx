import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const PropertyDetailPage = ({ properties }) => {
    const { id } = useParams();
    const property = properties.find((prop) => prop.id === id);

    if (!property) {
        return <p>Property not found</p>;
    }

    return (
        <div className="property-details-page">
            <div className="property-header">
                <h1>{property.type} - {property.location}</h1>
                <p className="price">Price: £{property.price.toLocaleString()}</p>
                <p className="bedrooms">Bedrooms: {property.bedrooms}</p>
                <p className="tenure">Tenure: {property.tenure}</p>
            </div>

            <div className="property-images">
                <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
                    {property.images.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={`${property.type} image ${index + 1}`} />
                        </div>
                    ))}
                </Carousel>
            </div>

            <Tabs>
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Features</Tab>
                    <Tab>Location</Tab>
                </TabList>

                <TabPanel>
                    <div className="description">
                        <h2>Description</h2>
                        <p>{property.description}</p>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="features">
                        <h2>Features</h2>
                        <ul>
                            <li>Bedrooms: {property.bedrooms}</li>
                            <li>Tenure: {property.tenure}</li>
                            <li>Location: {property.location}</li>
                        </ul>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="location">
                        <h2>Location</h2>
                        <iframe
                            title="Google Map"
                            src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

PropertyDetailPage.propTypes = {
    properties: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            images: PropTypes.arrayOf(PropTypes.string).isRequired,
        })
    ).isRequired,
};

export default PropertyDetailPage;