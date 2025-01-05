import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PropTypes from "prop-types";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useRef, useEffect } from "react";

const PropertyDetailPage = ({ properties }) => {
    const { id } = useParams();
    const property = properties.find((prop) => prop.id === id);
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const imageRef = useRef(null);
    const containerRef = useRef(null);

    if (!property) {
        return <p>Property not found</p>;
    }

    const zoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3));
    const zoomOut = () => {
        setZoom((prevZoom) => {
            const newZoom = Math.max(prevZoom - 0.1, 1);
            if (newZoom === 1) {
                setPosition({ x: 0, y: 0 });
            }
            return newZoom;
        });
    };
    const resetZoom = () => {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleMouseDown = (e) => {
        if (zoom <= 1) return;
        e.preventDefault();
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging || zoom <= 1) return;

        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;

        const container = containerRef.current;
        const image = imageRef.current;
        if (!container || !image) return;

        const containerRect = container.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();

        const maxX = (imageRect.width * (zoom - 1)) / 2;
        const maxY = (imageRect.height * (zoom - 1)) / 2;

        const boundedX = Math.min(Math.max(newX, -maxX), maxX);
        const boundedY = Math.min(Math.max(newY, -maxY), maxY);

        setPosition({ x: boundedX, y: boundedY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart, zoom]);

    return (
        <div className="property-details-page">
            <div className="property-header">
                <h1>{`${property.type} - ${property.location}`}</h1>
                <p className="price">{`Price: £${property.price.toLocaleString()}`}</p>
                <p className="bedrooms">{`Bedrooms: ${property.bedrooms}`}</p>
                <p className="tenure">{`Tenure: ${property.tenure}`}</p>
            </div>

            <div className="property-images">
                <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
                    {property.images.map((image, index) => (
                        <div key={index}>
                            <img
                                src={`/${image}`}
                                alt={`${property.type} image ${index + 1}`}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>

            <Tabs>
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Floor Plan</Tab>
                    <Tab>Location</Tab>
                </TabList>

                <TabPanel>
                    <div className="description">
                        <h2>Description</h2>
                        <p>{property.description}</p>
                    </div>
                </TabPanel>

                <TabPanel>
                    <h2>Floor Plan</h2>
                    <div className="floor-plan-container" ref={containerRef}>
                        <div className="zoom-controls">
                            <button onClick={zoomIn}>Zoom In</button>
                            <button onClick={resetZoom}>Reset</button>
                            <button onClick={zoomOut}>Zoom Out</button>
                        </div>
                        <img
                            ref={imageRef}
                            src={`/${property.floorplan}`}
                            alt="Floor Plan"
                            className={`floor-plan-image ${zoom > 1 ? 'zoomable' : ''} ${isDragging ? 'dragging' : ''}`}
                            style={{
                                transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${zoom})`
                            }}
                            onMouseDown={handleMouseDown}
                            draggable={false}
                        />
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="location">
                        <h2>Location</h2>
                        <iframe
                            title="Google Map"
                            src={`https://www.google.com/maps?q=${encodeURIComponent(
                                property.location
                            )}&output=embed`}
                            width="600"
                            height="450"
                            style={{border: 0}}
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
            floorplan: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default PropertyDetailPage;