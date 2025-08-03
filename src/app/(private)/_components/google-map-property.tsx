"use client"
import { Loader } from "@googlemaps/js-api-loader"
import { useEffect, useRef } from "react"

// Define el tipo de las props
interface GoogleMapPropertyProps {
    coordinates: {
        lat: number
        lng: number
    }
}

function GoogleMapProperty({ coordinates }: GoogleMapPropertyProps) {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY || "",
                version: "quarterly",
                libraries: ["places"],
            });

            const { Map } = await loader.importLibrary("maps");
            const { Marker } = await loader.importLibrary("marker");

            const options: google.maps.MapOptions = {
                center: coordinates,
                zoom: 12,
                gestureHandling: "greedy",
            };

            const map = new Map(mapRef.current as HTMLElement, options);

            new Marker({
                position: coordinates,
                map: map,
                title: "Ubicación",
            });
        };

        if (coordinates.lat && coordinates.lng) {
            initMap();
        }
    }, [coordinates]); // <- Dependencia para reinicializar si cambian

    return (
        <div ref={mapRef} className="w-full h-[400px]" />
    );
}

export default GoogleMapProperty;
