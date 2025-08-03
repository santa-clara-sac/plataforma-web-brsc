'use client';

import React, { memo, useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MarkerItem from './MarkerItem';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const mapOptions: google.maps.MapOptions = {
    gestureHandling: 'greedy', // <- Esto permite zoom con scroll sin mensaje
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    zoomControl: true,
};

function GoogleMapSection({ listing }: { listing: { id: string; lat: number; lng: number }[] }) {
    const [map, setMap] = useState<google.maps.Map | null>(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY || '',
        libraries: ['places', 'maps'],
    });

    const onLoad = useCallback((mapInstance: google.maps.Map) => {
        if (window.google && window.google.maps) {
            const bounds = new window.google.maps.LatLngBounds(
                { lat: -17.0, lng: -80.0 },
                { lat: -1.5, lng: -69.0 }
            );
            mapInstance.fitBounds(bounds);
            setMap(mapInstance);
        }
    }, []);

    const onUnmount = useCallback(() => setMap(null), []);

    if (!isLoaded) return <div>Cargando mapa...</div>;

    return (
        <div className="w-full h-full">
            <GoogleMap
                mapContainerStyle={containerStyle}
                options={mapOptions}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {Array.isArray(listing) && listing.map((item) => (
                    <MarkerItem key={item.id} item={item} />
                ))}

            </GoogleMap>
        </div>
    );
}

export default memo(GoogleMapSection);
