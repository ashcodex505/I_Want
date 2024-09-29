import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';

// Typescript types
interface Coordinates {
  lat: number;
  lng: number;
}
const mapOptions = {
    disableDefaultUI: true, // Disables all default UI
    zoomControl: true, // Optionally keep zoom control
    streetViewControl: false, // Remove street view control
    mapTypeControl: false, // Remove map type control (satellite)
    fullscreenControl: false, // Remove full screen control
};

const MapWithGeolocation: React.FC = () => {
    const [currentPosition, setCurrentPosition] = useState<Coordinates | null>(null);
    const [selectedPosition, setSelectedPosition] = useState<Coordinates | null>(null);
    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);

    const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({
            lat: latitude,
            lng: longitude,
          });
        },
        (error) => console.log(error),
        { enableHighAccuracy: true }
      );
    }, []);
  
    const handleMapClick = (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        setSelectedPosition({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
      }
    };
  
    const handlePlacesChanged = () => {
      const places = searchBox?.getPlaces();
      if (places && places.length > 0) {
        const location = places[0].geometry?.location;
        if (location) {
          setSelectedPosition({
            lat: location.lat(),
            lng: location.lng(),
          });
        }
      }
    };
  
    const onSearchBoxLoad = (ref: google.maps.places.SearchBox) => {
      setSearchBox(ref);
    };
  
    const mapStyles = {
      height: '80vh',
      width: '100%',
    };
  
    const defaultCenter = currentPosition || { lat: 40.7128, lng: -74.006 };
  
    return (
      <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={['places']}>
        <div>
          <StandaloneSearchBox
            onLoad={onSearchBoxLoad}
            onPlacesChanged={handlePlacesChanged}
          >
            <input
              type="text"
              placeholder="Search location"
              style={{
                boxSizing: 'border-box',
                border: '1px solid transparent',
                width: '240px',
                height: '40px',
                padding: '0 12px',
                borderRadius: '3px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                fontSize: '16px',
                outline: 'none',
                textOverflow: 'ellipses',
              }}
            />
          </StandaloneSearchBox>
  
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={15}
            center={defaultCenter}
            onClick={handleMapClick}
            options={mapOptions}
          >
            {currentPosition && <Marker position={currentPosition} />}
            {selectedPosition && <Marker position={selectedPosition} />}
          </GoogleMap>
        </div>
      </LoadScript>
    );
  };
  
  export default MapWithGeolocation;