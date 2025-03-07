import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Modal from '@/Components/Modal';
import MapThemeSelector from './MapThemeSelector';
import SecondaryButton from './SecondaryButton';

const MapContainer = () => {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [center, setCenter] = useState({ lat: 41.3851, lng: 2.1734 });
    const [customMarkerIcon, setCustomMarkerIcon] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [clickedLocation, setClickedLocation] = useState(null);
    const [map, setMap] = useState(null);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [clickedLocationAddress, setClickedLocationAddress] = useState('');

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCuj3aeWHaGKi-pkdjPLsYS02nroVianDY&libraries=geometry`;
        script.async = true;
        script.onload = () => setMapLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (mapLoaded && window.google && window.google.maps) {
            const icon = {
                url: '/img/icon_map/Icono_Encontrado_Mapa.svg',
                scaledSize: new window.google.maps.Size(40, 40),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(20, 20)
            };
            setCustomMarkerIcon(icon);
        }
    }, [mapLoaded]);

    const handleThemeChange = (selectedOption) => {
        setSelectedTheme(selectedOption);
        if (map) {
            map.setOptions({ styles: customMapStyles[selectedOption.value] });
        }
    };

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const selectContainerStyle = {
        position: "absolute",
        bottom: "100px",
        left: "9px",
        zIndex: modalOpen ? 6 : 9999 // Si el modal está abierto, el zIndex del selector de tema será menor que el del modal
    };

    // Estilos de mapa personalizados
    const customMapStyles = {
        default: [],
        silver: [
            {
                elementType: "geometry",
                stylers: [{ color: "#f5f5f5" }],
            },
            {
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
            },
            {
                elementType: "labels.text.fill",
                stylers: [{ color: "#616161" }],
            },
            {
                elementType: "labels.text.stroke",
                stylers: [{ color: "#f5f5f5" }],
            },
            {
                featureType: "administrative.land_parcel",
                elementType: "labels.text.fill",
                stylers: [{ color: "#bdbdbd" }],
            },
            {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{ color: "#eeeeee" }],
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#757575" }],
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#e5e5e5" }],
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9e9e9e" }],
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }],
            },
            {
                featureType: "road.arterial",
                elementType: "labels.text.fill",
                stylers: [{ color: "#757575" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#dadada" }],
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#616161" }],
            },
            {
                featureType: "road.local",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9e9e9e" }],
            },
            {
                featureType: "transit.line",
                elementType: "geometry",
                stylers: [{ color: "#e5e5e5" }],
            },
            {
                featureType: "transit.station",
                elementType: "geometry",
                stylers: [{ color: "#eeeeee" }],
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#c9c9c9" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9e9e9e" }],
            },
        ],
        night: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
            },
        ],
        retro: [
            { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
            {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [{ color: "#c9b2a6" }],
            },
            {
                featureType: "administrative.land_parcel",
                elementType: "geometry.stroke",
                stylers: [{ color: "#dcd2be" }],
            },
            {
                featureType: "administrative.land_parcel",
                elementType: "labels.text.fill",
                stylers: [{ color: "#ae9e90" }],
            },
            {
                featureType: "landscape.natural",
                elementType: "geometry",
                stylers: [{ color: "#dfd2ae" }],
            },
            {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{ color: "#dfd2ae" }],
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#93817c" }],
            },
            {
                featureType: "poi.park",
                elementType: "geometry.fill",
                stylers: [{ color: "#a5b076" }],
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#447530" }],
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#f5f1e6" }],
            },
            {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [{ color: "#fdfcf8" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#f8c967" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#e9bc62" }],
            },
            {
                featureType: "road.highway.controlled_access",
                elementType: "geometry",
                stylers: [{ color: "#e98d58" }],
            },
            {
                featureType: "road.highway.controlled_access",
                elementType: "geometry.stroke",
                stylers: [{ color: "#db8555" }],
            },
            {
                featureType: "road.local",
                elementType: "labels.text.fill",
                stylers: [{ color: "#806b63" }],
            },
            {
                featureType: "transit.line",
                elementType: "geometry",
                stylers: [{ color: "#dfd2ae" }],
            },
            {
                featureType: "transit.line",
                elementType: "labels.text.fill",
                stylers: [{ color: "#8f7d77" }],
            },
            {
                featureType: "transit.line",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#ebe3cd" }],
            },
            {
                featureType: "transit.station",
                elementType: "geometry",
                stylers: [{ color: "#dfd2ae" }],
            },
            {
                featureType: "water",
                elementType: "geometry.fill",
                stylers: [{ color: "#b9d3c2" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#92998d" }],
            },
        ],
        hiding: [
            {
                featureType: "poi.business",
                stylers: [{ visibility: "off" }],
            },
            {
                featureType: "transit",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
            },
        ],
    };

    const mapOptions = mapLoaded ? {
        fullscreenControlOptions: {
            position: window.google.maps.ControlPosition.BOTTOM_RIGHT = 9
        },
        mapTypeControlOptions: {
            position: window.google.maps.ControlPosition.BOTTOM_LEFT = 19,
            mapTypeIds: ['roadmap', 'satellite']
        },
        zoomControlOptions: {
            position: window.google.maps.ControlPosition.BOTTOM_RIGHT
        },
        streetViewControlOptions: {
            position: window.google.maps.ControlPosition.BOTTOM_RIGHT
        }
    } : {};

    const onMapLoad = (map) => {
        setMap(map);
    };

    const addMarker = (event) => {
        event.preventDefault();
        if (clickedLocation) {
            setMarkers([...markers, clickedLocation]);
            setCenter(clickedLocation);
            setModalOpen(false);
        }
    };

    const geocodeLatLng = (latLng) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    setClickedLocationAddress(results[0].formatted_address);
                } else {
                    console.error('Geocoder no encontró resultados para las coordenadas proporcionadas.');
                }
            } else {
                console.error('La geocodificación falló debido a: ' + status);
            }
        });
    };

    const onMapClick = (event) => {
        const clickedLocation = event.latLng.toJSON();
        setClickedLocation(clickedLocation);
        geocodeLatLng(clickedLocation);
        setModalOpen(true);
    };

    return (
        <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            loading="async"
            onLoad={() => setMapLoaded(true)}
        >
            {mapLoaded && (
                <>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={13}
                        center={center}
                        options={mapOptions}
                        onLoad={onMapLoad}
                        onClick={onMapClick}
                    >
                        {markers.map((marker, index) => (
                            <Marker
                                key={index}
                                position={{ lat: marker.lat, lng: marker.lng }}
                                icon={customMarkerIcon}
                            />
                        ))}

                        <div style={selectContainerStyle}>
                            <MapThemeSelector
                                selectedTheme={selectedTheme}
                                onChange={handleThemeChange}
                                themes={Object.keys(customMapStyles)}
                            />
                        </div>
                    </GoogleMap>

                    <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
                        <div className="relative">
                            {/* Botón de cancelar en la esquina superior derecha */}
                            <button
                                className="absolute top-4 right-7 p-2 ring-0 focus:ring-0"
                                onClick={() => setModalOpen(false)}
                            >
                                <img src='img/icon_map/BotonCerrar.svg' type="image/svg" alt='Imagen Logotipo' className="h-10 md:h-10" />
                            </button>

                            <form onSubmit={addMarker} className="p-4 flex flex-col items-center justify-center">

                                <div className='mx-auto my-auto' href="#">
                                    {/* Contenido del logo */}
                                    <picture>
                                        <source srcSet="img/header/Logotipo_Original.png" type="image/png" alt='Imagen Logotipo' />
                                        <img src='img/header/Logotipo_Original.svg' type="image/svg" alt='Imagen Logotipo' className="h-12 md:h-16" />
                                    </picture>
                                </div>

                                <p className="font-courgette text-xl">Informe</p>

                                <p className='text-center'>Dirección: {clickedLocationAddress}</p>

                                <div className="mt-4 flex">
                                    <SecondaryButton className='bg-button-green' type="submit" onSubmit={(e) => addMarker(e)}>Publicar</SecondaryButton>
                                </div>
                            </form>
                        </div>
                    </Modal>


                </>
            )}
        </LoadScript>
    );
}

export default MapContainer;