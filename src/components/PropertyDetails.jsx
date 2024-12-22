import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-tabs/style/react-tabs.css';

export const PropertyDetails = ({ property }) => (
    <div className="property-details">
        <h2>Property Details</h2>
        <Tabs>
            <TabList>
                <Tab>Long Description</Tab>
                <Tab>Floor Plan</Tab>
                <Tab>Google Map</Tab>
                <Tab>Gallery</Tab>
            </TabList>
            <TabPanel>
                <p>{property.description}</p>
            </TabPanel>
            <TabPanel>
                <p>Floor plan for this property is under construction.</p>
            </TabPanel>
            <TabPanel>
                <iframe
                    title="Google Map"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                    width="600"
                    height="450"
                />
            </TabPanel>
            <TabPanel>
                <Carousel>
                    {property.images.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={`Property image ${index + 1}`} />
                        </div>
                    ))}
                </Carousel>
            </TabPanel>
        </Tabs>
    </div>
);