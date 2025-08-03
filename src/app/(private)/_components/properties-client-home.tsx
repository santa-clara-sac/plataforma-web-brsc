"use client";

import { useEffect, useRef, useState } from "react";
import { Property } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import {
    Bath,
    BedDouble,
    MapPin,
    LandPlot,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { FaSearch, FaClipboardList, FaBullhorn, FaHandshake, FaStopwatch, FaHome, FaAward } from "react-icons/fa";

export default function PropertiesClientHome({
    properties,
}: {
    properties: Property[];
}) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollIndex, setScrollIndex] = useState(0);

    const visibleCards = 4;

    // Scroll automático
    useEffect(() => {
        if (properties.length <= visibleCards) return;

        const interval = setInterval(() => {
            handleScroll("right");
        }, 4000);

        return () => clearInterval(interval);
    }, [properties.length, scrollIndex]);

    const handleScroll = (direction: "left" | "right") => {
        const container = scrollRef.current;
        if (!container) return;

        const cardWidth = 320; // ancho aprox. de tarjeta (incluye padding y margen)
        const maxIndex = Math.ceil(properties.length - visibleCards);

        let newIndex = scrollIndex;

        if (direction === "right") {
            newIndex = Math.min(scrollIndex + 1, maxIndex);
        } else {
            newIndex = Math.max(scrollIndex - 1, 0);
        }

        container.scrollTo({
            left: newIndex * cardWidth,
            behavior: "smooth",
        });

        setScrollIndex(newIndex);
    };

    const cards = [
        {
            icon: <FaSearch className="text-green-700 text-2xl" />,
            title: "Nuestro blog",
            description: "Consejos, novedades y noticias del ámbito de la construcción.",
            bg: "bg-green-100",
        },
        {
            icon: <FaClipboardList className="text-yellow-700 text-2xl" />,
            title: "Guía para alquilar",
            description: "Lo que necesitas saber a la hora de alquilar en un solo lugar.",
            bg: "bg-yellow-100",
        },
        {
            icon: <FaBullhorn className="text-teal-700 text-2xl" />,
            title: "Conoce Urbania",
            description: "Toda la información sobre cómo usar nuestro portal ¡y mucho más!",
            bg: "bg-teal-100",
        },
    ];

    const steps = [
        {
            icon: <FaHandshake className="text-gray-700 text-xl" />,
            title: "Búsqueda clara y rápida",
            description: "Pensamos nuestros filtros y mapas para simplificar tu experiencia en nuestro portal.",
        },
        {
            icon: <FaStopwatch className="text-gray-700 text-xl" />,
            title: "Tienes tu propia sección",
            description: "Accede de forma fácil y segura a los avisos contactados, favoritos, las notas que creaste y más.",
        },
        {
            icon: <FaHome className="text-gray-700 text-xl" />,
            title: "Variedad de anunciantes",
            description: "Inmobiliarias y dueños directos de todo el país ofrecen las mejores opciones de inmuebles para ti.",
        },
        {
            icon: <FaAward className="text-gray-700 text-xl" />,
            title: "¡Somos Urbania!",
            description: "12 años en el mercado y 3.2 millones de avisos publicados nos respaldan en la búsqueda de tu hogar.",
        },
    ];

    return (
        <div className="relative py-8 overflow-hidden">
            {/* Botones de navegación */}
            {properties.length > visibleCards && (
                <>
                    <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-100 border border-gray-300 rounded-full p-2 shadow-md transition"
                        onClick={() => handleScroll("left")}
                    >
                        <ChevronLeft className="h-6 w-6 text-gray-700" />
                    </button>
                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-100 border border-gray-300 rounded-full p-2 shadow-md transition"
                        onClick={() => handleScroll("right")}
                    >
                        <ChevronRight className="h-6 w-6 text-gray-700" />
                    </button>
                </>
            )}

            <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 my-12">
                {cards.map((card, idx) => (
                    <div
                        key={idx}
                        className="flex items-start gap-4 border border-gray-200 rounded-xl p-4 shadow-sm w-full md:w-1/3 hover:shadow-md transition"
                    >
                        <div className={`rounded-full p-3 ${card.bg}`}>{card.icon}</div>
                        <div>
                            <h3 className="font-semibold text-gray-800">{card.title}</h3>
                            <p className="text-sm text-gray-600">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Contenedor de tarjetas */}
            <div className="text-2xl font-bold">
                Nuestras recomendaciones para ti
            </div>
            <div
                ref={scrollRef}
                className="flex no-scrollbar scroll-smooth gap-x-16 px-6 overflow-x-hidden my-6"
            >
                {properties.map((property) => (
                    <Link
                        key={property.id}
                        href={`/property/${property.id}`}
                        className=" no-underline  min-w-[300px] max-w-[300px] flex-shrink-0 border rounded-lg shadow hover:shadow-xl bg-white flex flex-col transition"
                    >
                        <Image
                            src={property.images[0]}
                            alt="Imagen de la propiedad"
                            width={800}
                            height={240}
                            className="w-full h-48 object-cover rounded-t-lg"
                            priority
                        />

                        <div className="p-4 flex-1 space-y-1">
                            <h3 className="font-semibold md:text-lg text-orange-800">
                                {property.name} { }
                                <span className="text-lg font-bold text-primary">
                                    {property.currency} {property.price}
                                </span>
                            </h3>
                            <p className="text-sm text-black truncate">
                                {property.landmark}
                            </p>
                            <div className="flex flex-wrap gap-3 text-sm text-black mt-2">
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
                    </Link>
                ))}
            </div>


            <section className="bg-gray-50 py-12">
                <h2 className="text-center text-2xl font-bold mb-10">
                    Te acompañamos en cada paso
                </h2>

                <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 px-4 max-w-6xl mx-auto">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm p-6 pt-10 relative text-center w-full md:w-1/4"
                        >
                            {/* Ícono en círculo flotante */}
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                <div className="bg-white border border-gray-200 p-3 rounded-full shadow-md">
                                    {step.icon}
                                </div>
                            </div>

                            <h3 className="font-bold text-base mt-4 mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
