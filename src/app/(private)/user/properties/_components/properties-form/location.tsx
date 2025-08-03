'use client';

import { PropertiesFormStepProps } from '@/interfaces';
import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { useJsApiLoader } from '@react-google-maps/api';

const GooglePlacesAutocomplete = dynamic(
    () => import('react-google-places-autocomplete'),
    { ssr: false }
);

function Location({
    currentStep,
    setCurrentStep,
    finalValues,
    setFinalValues,
}: PropertiesFormStepProps) {
    const [form] = Form.useForm();
    const [addressValue, setAddressValue] = useState(finalValues?.location?.address || null);
    const [coordinates, setCoordinates] = useState(finalValues?.location?.coordinates || null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script', // 🔁 mismo ID en toda la app
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY || '',
        libraries: ['places', 'maps'], // 🔁 incluye todas las librerías necesarias
    });


    const onFinish = (values: any) => {
        if (!addressValue || !coordinates) {
            return;
        }

        setFinalValues({
            ...finalValues,
            location: {
                ...values,
                address: addressValue.label,
                coordinates: coordinates,
            },
        });

        setCurrentStep(currentStep + 1);
    };

    return (
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            initialValues={finalValues.location}
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <Form.Item
                    name="city"
                    label="Ciudad"
                    rules={[{ required: true, message: 'Por favor ingrese la ciudad!' }]}
                >
                    <Input autoComplete="off" placeholder="Ciudad" />
                </Form.Item>

                <Form.Item
                    name="pincode"
                    label="Código Postal"
                    rules={[{ required: true, message: 'Por favor ingrese el código postal!' }]}
                >
                    <Input autoComplete="off" placeholder="Código Postal" />
                </Form.Item>

                <Form.Item
                    name="landmark"
                    label="Punto de Referencia"
                    rules={[{ required: true, message: 'Por favor ingrese el punto de referencia!' }]}
                >
                    <Input autoComplete="off" placeholder="Punto de Referencia" />
                </Form.Item>

                <Form.Item
                    label="Dirección"
                    required
                    className="col-span-1 lg:col-span-3"
                >
                    <div className="flex items-center w-full">
                        <MapPin className="h-10 w-10 p-2 rounded-l-lg text-primary bg-slate-100" />

                        {isLoaded ? (
                            <GooglePlacesAutocomplete
                                apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
                                selectProps={{
                                    placeholder: 'Buscar dirección de propiedad',
                                    isClearable: true,
                                    className: 'w-full',
                                    value: addressValue,
                                    onChange: (place) => {
                                        setAddressValue(place);

                                        if (place && place.label) {
                                            geocodeByAddress(place.label)
                                                .then(results => getLatLng(results[0]))
                                                .then(({ lat, lng }) => {
                                                    setCoordinates({ lat, lng });
                                                })
                                                .catch(error => {
                                                    console.error('Error obteniendo lat/lng:', error);
                                                    setCoordinates(null);
                                                });
                                        } else {
                                            setCoordinates(null);
                                        }
                                    },
                                }}
                            />
                        ) : (
                            <div className="w-full px-3 py-2 bg-gray-100 rounded-r-lg text-sm text-gray-500">
                                Cargando autocompletado...
                            </div>
                        )}
                    </div>
                </Form.Item>
            </div>

            <div className="flex justify-end gap-5 mt-7">
                <Button
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep(currentStep - 1)}
                >
                    Volver
                </Button>
                <Button type="primary" htmlType="submit" disabled={!addressValue || !coordinates}>
                    Siguiente
                </Button>
            </div>
        </Form>
    );
}

export default Location;
