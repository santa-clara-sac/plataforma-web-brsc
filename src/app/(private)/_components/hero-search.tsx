'use client';
import Filters from "@/components/filters";
import React, { useEffect, useState } from 'react';

export default function HeroSearch({ searchParams }: { searchParams: any }) {
    const fullText = "Construye tu futuro, empieza por el lugar correcto";
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + fullText[index]);
                setIndex((prev) => prev + 1);
            }, 60);
            return () => clearTimeout(timeout);
        } else {
            const delay = setTimeout(() => {
                setDisplayedText('');
                setIndex(0);
            }, 5000);
            return () => clearTimeout(delay);
        }
    }, [index]);

    return (
        <div className='mt-5 mb-5'>
            <div
                className="relative bg-cover bg-center min-h-[400px]"
                style={{ backgroundImage: "url('/portada3.png')" }}
            >
                <div className="absolute inset-0 bg-black/25"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 pt-12 text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-orange-400 to-black bg-clip-text text-transparent">
                            {displayedText}
                        </span>
                        <span className="animate-blink text-white">|</span>
                    </h1>

                    <p className="mt-6 max-w-4xl text-lg md:text-xl text-orange-900 drop-shadow-md">
                        Conectamos personas con oportunidades inmobiliarias, facilitando el camino hacia la propiedad ideal de manera rápida, segura y confiable.
                    </p>
                    <div>
                        <Filters
                            searchParams={searchParams}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
