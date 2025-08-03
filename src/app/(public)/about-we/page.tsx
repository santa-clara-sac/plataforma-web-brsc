"use client";

import { useState } from "react";
import { Brain } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export default function AboutWe() {
    const [showVideo, setShowVideo] = useState(true);
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await fetch('/api/resend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, subject, message }),
        })

        if (res.ok) {
            toast.success('Mensaje enviado con éxito', {
                position: 'top-right',
                autoClose: 1000,
                theme: 'dark',
            })
        } else {
            toast.error('Hubo un error al enviar el mensaje', {
                position: 'top-right',
                autoClose: 1000,
                theme: 'dark',
            })
        }
    }

    return (
        <div className="w-full">
            {/* HERO */}
            <div
                className="relative h-[500px] flex items-center justify-center bg-cover bg-center mt-5"
                style={{ backgroundImage: "url('/aboutwe.png')" }}
            >
                <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0" />
                <div className="relative z-10 text-center text-white px-4">
                    <h2 className="text-3xl md:text-5xl font-light">
                        Conoce a <span className="font-bold">Bienes Raíces Santa Clara</span>
                    </h2>
                    <p className="mt-2 text-lg md:text-xl">
                        Construyendo sueños para las familias peruanas
                    </p>
                </div>
            </div>

            {/* QUIÉNES SOMOS */}
            <div className="py-5 lg:px-20 px-5">
                <section className="py-16 px-6 md:px-20 bg-white flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="lg:w-1/2">
                        <div className="mb-4">
                            <span className="bg-red-500 text-white px-3 py-1 text-sm rounded-full font-semibold">
                                NOSOTROS
                            </span>
                        </div>
                        <h3 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
                            QUIÉNES <span className="text-black">SOMOS</span>
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            Somos una empresa peruana <strong>constructora y desarrolladora inmobiliaria</strong>, con más de 22 años de experiencia, diferenciándonos por la innovación en nuestros conceptos, diseños y acabados en cada uno de nuestros proyectos, que van desde Edificios Residenciales, Condominios de Town House hasta lujosos Centros Empresariales. Nuestra labor principal es la satisfacción de nuestros clientes en cada proyecto entregado.
                        </p>
                    </div>

                    {/* VIDEO / MINIATURA */}
                    <div className="lg:w-1/2 flex justify-center">
                        <div className="relative w-full aspect-video max-w-xl rounded-xl shadow-lg overflow-hidden bg-black">
                            {!showVideo ? (
                                <>
                                    {/* ✅ Miniatura oficial de YouTube */}
                                    <img
                                        src="https://img.youtube.com/vi/BXPM5LwrTUA/maxresdefault.jpg"
                                        alt="Miniatura del video"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        className="absolute inset-0 flex items-center justify-center z-10"
                                        onClick={() => setShowVideo(true)}
                                    >
                                        <div className="bg-white bg-opacity-70 rounded-full p-4 hover:scale-110 transition">
                                            <svg
                                                className="w-10 h-10 text-red-500"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M6 4l10 6-10 6V4z" />
                                            </svg>
                                        </div>
                                    </button>
                                </>
                            ) : (
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/BXPM5LwrTUA?autoplay=1&mute=1"
                                    title="YouTube video"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>
                    </div>
                </section>

                <section className="py-16 px-6 md:px-20 bg-white text-center">
                    <div className="mb-6">
                        <span className="bg-red-500 text-white px-3 py-1 text-sm rounded-full font-semibold">
                            NOSOTROS
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold mb-12">
                        POR QUÉ <span className="text-black">CONFIAR EN NOSOTROS</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-700">
                        {/* CARD 1 */}
                        <div className="flex flex-col items-center">
                            <div className="bg-red-500 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                                <Brain className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">
                                NUESTRO <br />
                                <span className="font-black">COMPROMISO</span>
                            </h3>
                            <p className="text-sm leading-relaxed text-justify max-w-xs">
                                Entregar nuestros proyectos en tiempo y calidad ofrecida es nuestra mayor
                                satisfacción, asumimos los retos y trabajamos para lograr la eficiencia
                                en nuestras entregas.
                            </p>
                        </div>

                        {/* CARD 2 */}
                        <div className="flex flex-col items-center">
                            <div className="bg-red-500 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                                <Brain className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">
                                EXCELENCIA <br />
                                <span className="font-black">OPERACIONAL</span>
                            </h3>
                            <p className="text-sm leading-relaxed text-justify max-w-xs">
                                Nos adelantamos a las necesidades del cliente mejorando continuamente,
                                somos muy cuidadosos con los costos y los recursos para poder obtener un
                                excelente producto al mejor precio. Proponemos soluciones innovadoras.
                            </p>
                        </div>

                        {/* CARD 3 */}
                        <div className="flex flex-col items-center">
                            <div className="bg-red-500 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                                <Brain className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">
                                <span className="font-black">INTEGRIDAD</span>
                            </h3>
                            <p className="text-sm leading-relaxed text-justify max-w-xs">
                                Hacer lo correcto y ser honestos en nuestras relaciones comerciales y
                                laborales es uno de nuestros atributos como empresa.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* CONTACT */}
            <section className="bg-orange-50 px-4 py-5 dark:bg-gray-900">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Formulario */}
                    <form
                        onSubmit={handleSubmit}
                        className="md:col-span-2 rounded-2xl bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl dark:bg-gray-800"
                    >
                        {/* Nombre */}
                        <div className="mb-6">
                            <label htmlFor="username" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Nombre completo
                            </label>
                            <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 shadow-sm transition duration-200 focus:border-[#ff9500] focus:outline-none focus:ring-2 focus:ring-[#ff9500]/50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-6">
                            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                autoComplete="off"
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 shadow-sm transition duration-200 focus:border-[#ff9500] focus:outline-none focus:ring-2 focus:ring-[#ff9500]/50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Asunto */}
                        <div className="mb-6">
                            <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Asunto
                            </label>
                            <input
                                type="text"
                                id="subject"
                                autoComplete="off"
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 shadow-sm transition duration-200 focus:border-[#ff9500] focus:outline-none focus:ring-2 focus:ring-[#ff9500]/50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                        </div>

                        {/* Mensaje */}
                        <div className="mb-6">
                            <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Escribe tu mensaje
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                className="w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 shadow-sm transition duration-200 focus:border-[#ff9500] focus:outline-none focus:ring-2 focus:ring-[#ff9500]/50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#ff9500] px-6 py-3 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-[#e78400] focus:outline-none focus:ring-2 focus:ring-[#ff9500]/60"
                        >
                            Enviar
                        </button>
                    </form>

                    {/* Info de contacto */}
                    <div className="rounded-2xl bg-gray-50 p-6 text-gray-800 shadow-xl transition-shadow duration-300 hover:shadow-2xl dark:bg-gray-700 dark:text-white">
                        <h3 className="mb-4 text-xl font-semibold text-[#ff9500]">Contáctanos</h3>
                        <p className="mb-4 text-sm">
                            Calle German Schereiber Nro. 272 <br />
                            Int. 302 (Cra1 Canaval y Moreyra)<br />
                            San Isidro, Perú
                        </p>

                        <div className="text-sm">
                            <p className="font-bold">Razón Social</p>
                            <p>BIENES RAICES SANTA CLARA S.A.C.</p>
                        </div>
                        <br />
                        <div className="mb-4 text-sm">
                            <p className="font-bold">Belini Lupa Navarro</p>
                            <p>Asistente de gerencia</p>
                            <p>+51 945 071 190</p>
                            <p>b.r.santaclara@gmail.com</p>
                        </div>

                    </div>
                </div>

                <ToastContainer />
            </section>

        </div>
    );
}
