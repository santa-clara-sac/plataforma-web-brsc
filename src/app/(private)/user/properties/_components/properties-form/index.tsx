"use client";
import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import Basic from "./basic";
import Location from "./location";
import Amenities from "./amenities";
import Media from "./media";
import Contact from "./contact";

export interface PropertiesFormStepProps {
    currentStep: number;
    setCurrentStep: (currentStep: number) => void;
    finalValues: any;
    setFinalValues: (finalValues: any) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    isEdit?: boolean;
}

function PropertiesForm({
    initialValues = {},
    isEdit = false,
}: {
    initialValues?: any;
    isEdit?: boolean;
}) {
    const [finalValues, setFinalValues] = React.useState({
        basic: initialValues,
        location: initialValues,
        amenities: initialValues,
        media: {
            newlyUploadedFiles: [],
            images: initialValues?.images || [],
        },
        contact: initialValues,
    });

    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);

    const commonPropsForSteps: any = {
        currentStep,
        setCurrentStep,
        finalValues,
        setFinalValues,
        loading,
        setLoading,
        isEdit,
    };

    const steps = [
        {
            title: "Información básica",
            content: <Basic {...commonPropsForSteps} />,
        },
        {
            title: "Ubicación",
            content: <Location {...commonPropsForSteps} />,
        },
        {
            title: "Características",
            content: <Amenities {...commonPropsForSteps} />,
        },
        {
            title: "Galería multimedia",
            content: <Media {...commonPropsForSteps} />,
        },
        {
            title: "Contacto",
            content: <Contact {...commonPropsForSteps} />,
        },
    ];

    useEffect(() => {
    }, [finalValues]);

    return (
        <div>
            <Steps
                className="text-sm"
                current={currentStep}
                onChange={(step) => setCurrentStep(step)} // 🔥 permite hacer clic en cualquier paso
                items={steps.map(({ title }) => ({ title }))}
            />

            <div className="mt-8">{steps[currentStep].content}</div>
        </div>
    );
}

export default PropertiesForm;
