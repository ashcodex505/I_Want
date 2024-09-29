import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox, Box } from '@react-google-maps/api';
import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
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
    // const [selectedPosition, setSelectedPosition] = useState<Coordinates | null>(null);
    const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
    const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const macro = useSelector((state)=> state.macro);
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({
            lat: latitude,
            lng: longitude,
          });
          // setSelectedPosition(currentPosition)
        },
        (error) => console.log(error),
        { enableHighAccuracy: true }
      );
    }, []);
  
    const handleMapClick = (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        setCurrentPosition({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
      }
      // console.log(selectedPosition?.lat, selectedPosition?.lng);
    };
  
    const handlePlacesChanged = () => {
      const places = searchBox?.getPlaces();
      if (places && places.length > 0) {
        const location = places[0].geometry?.location;
        if (location) {
          setCurrentPosition({
            lat: location.lat(),
            lng: location.lng(),
          });
        }
      }
      // console.log(selectedPosition?.lat, selectedPosition?.lng);
    };
  
    const onSearchBoxLoad = (ref: google.maps.places.SearchBox) => {
      setSearchBox(ref);
    };
  
    const mapStyles = {
      height: '80vh',
      width: '100%',
    };
    const handleRequest = async () => {
      try {
        const savedRestaurantResponse = await fetch(
          "http://127.0.0.1:5000/restaurants",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Ensure the correct header is set
            },
            body: JSON.stringify({
              'macro': macro, 
              "latitude": currentPosition.lat,
              "longitude": currentPosition.lng,
              "radius": 1

            }),
          }
        );
        const savedRestaurants = await savedRestaurantResponse.json();
        if(savedRestaurantResponse.ok){
          console.log(savedRestaurants);
          console.log('Success')
        }
        else{
          console.error('Error:', savedRestaurants);
        }
        
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    const defaultCenter = currentPosition || { lat: 40.7128, lng: -74.006 };
  
    return (
      <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={['places']}>
        <div>
          <div style = {{position: 'absolute', left: '138px', top: '155px', height: '100px'}}>
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
          </div>
              
          <div
          style={{
            width: '80%',
            maxWidth: '1400px',
            height: '400px',
            margin: '200px auto',
            border: '2px solid #ccc',
            borderRadius: '0px',
            overflow: 'hidden',
          }}
        >
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={15}
            center={defaultCenter}
            onClick={handleMapClick}
            options={mapOptions}
          >
            
            {currentPosition && <Marker position={defaultCenter} />}
            {/* {selectedPosition && <Marker position={selectedPosition} />} */}
          </GoogleMap>
          </div>

          <div style = {{position: 'absolute', left: '578px', top: '622px', height: '100px'}}>
          <Button
         
         onClick ={handleRequest}
            variant="outlined"
            sx={{
              '&:hover': { backgroundColor: '#CDD8F1' },
              color: 'white',width: '200px',
              height: '40px', border: '2px solid white'
            }}
          >
            
            <Typography variant="h1" 
  sx={{ fontWeight: 'bold', fontSize: '18px', color: 'white'
   }}>
          Search
          </Typography>
          </Button>
          </div>
        </div>
      </LoadScript>
    );
  };
  
  export default MapWithGeolocation;