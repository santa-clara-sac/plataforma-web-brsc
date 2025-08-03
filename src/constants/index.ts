export const propertyTypes = [
    { value: "Departamento", label: "Departamento" },
    { value: "Terreno", label: "Terreno" },
];

export const propertyStatuses = [
    { value: "Alquiler", label: "Alquiler" },
    { value: "Venta", label: "Venta" },
];

export const cities = [
    "Amazonas",
    "Áncash",
    "Apurímac",
    "Arequipa",
    "Ayacucho",
    "Cajamarca",
    "Callao",       // Provincia Constitucional
    "Cusco",
    "Huancavelica",
    "Huánuco",
    "Ica",
    "Junín",
    "La Libertad",
    "Lambayeque",
    "Lima",         // Departamento (no incluye Lima Metropolitana)
    "Loreto",
    "Madre de Dios",
    "Moquegua",
    "Pasco",
    "Piura",
    "Puno",
    "San Martín",
    "Tacna",
    "Tumbes",
    "Ucayali"
];

export const parkingTypes = [
    { value: "Con cochera", label: "Con cochera" },
    { value: "Sin cochera", label: "Sin cochera" },
];


// export const facingTypes = [
//     { value: "Este", label: "Este" },
//     { value: "Oeste", label: "Oeste" },
//     { value: "Norte", label: "Norte" },
//     { value: "Sur", label: "Sur" },
//     { value: "Nordeste", label: "Nordeste" },
//     { value: "Noroeste", label: "Noroeste" },
//     { value: "Sudeste", label: "Sudeste" },
//     { value: "Suroeste", label: "Suroeste" },
// ];

export const subscriptionPlans = [
    {
        name: "Básico",
        price: 0,
        propertiesLimit: 3,
        imagesPerPropertyLimit: 3,
        features: [
            "Gratis de por vida",
            "Listado de propiedades",
            "Detalles de la propiedad",
            "3 imágenes por propiedad",
            "Límite de 3 propiedades",
            "Búsqueda de propiedades",
        ],
    },
    {
        name: "Standard",
        price: 10,
        propertiesLimit: 10,
        imagesPerPropertyLimit: 5,
        features: [
            "Listado de propiedades",
            "Detalles de la propiedad",
            "5 imágenes por propiedad",
            "Límite de 10 propiedades",
            "Búsqueda de propiedades",
            "Soporte con IA",
            "Soporte 24/7 por correo electrónico",
        ],
    },
    {
        name: "Premium",
        price: 25,
        propertiesLimit: 100,
        imagesPerPropertyLimit: 15,
        features: [
            "Listado de propiedades",
            "Detalles de la propiedad",
            "15 imágenes por propiedad",
            "Límite de 100 propiedades",
            "Búsqueda de propiedades",
            "Soporte con IA",
            "Soporte 24/7 por correo electrónico",
            "Soporte 24/7 por teléfono",
            "Gerente de cuenta personal",
        ],
    },
];