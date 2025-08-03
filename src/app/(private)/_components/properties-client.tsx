"use client";

import { Property } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import GoogleMapHome from "@/components/google-map-home";
import { Bath, BedDouble, MapPin, LandPlot } from "lucide-react";

export default function PropertiesClient({ properties }: { properties: Property[] }) {
    return (
        <div className="flex h-[calc(100vh-64px)]">
            {/* Mapa fijo a la izquierda */}
            <div className="w-1/2 min-w-[400px] h-full sticky top-0 z-10">
                <GoogleMapHome listing={properties} />
            </div>

            {/* Lista de propiedades en 2 columnas scrolleable */}
            <div className="w-1/2 h-full overflow-y-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {properties.map((property) => (
                        <Link
                            key={property.id}
                            href={`/property/${property.id}`}
                            className="group border rounded shadow-sm hover:shadow-lg bg-white hover:bg-gray-100 overflow-hidden flex flex-col no-underline text-[#A35F00] transition duration-300"
                        >
                            <div className="overflow-hidden">
                                <Image
                                    src={property.images[0]}
                                    alt="Imagen de la propiedad"
                                    width={800}
                                    height={240}
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                    priority
                                />
                            </div>

                            <div className="p-4 space-y-1 flex-1">
                                <h3 className="font-semibold text-base md:text-lg">{property.name}</h3>
                                <p className="text-sm text-gray-600 truncate">{property.landmark}</p>
                                <div className="flex flex-wrap gap-3 text-sm text-gray-700 mt-2">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" /> {property.city}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <BedDouble className="h-4 w-4" /> {property.bedrooms}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Bath className="h-4 w-4" /> {property.bathrooms}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <LandPlot className="h-4 w-4" /> {property.area} m²
                                    </span>
                                </div>
                            </div>

                            <div className="px-4 py-2 bg-gray-100 flex justify-between items-center">
                                <span className="text-lg font-bold text-primary">
                                    {property.currency} {property.price}
                                </span>
                                <span className="text-sm text-[#A35F00] font-medium">Ver detalles</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
}
