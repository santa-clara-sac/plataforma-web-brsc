import { PropertiesFormStepProps } from '@/interfaces'
import React from 'react'
import { Button, Form, Input, message, Select } from 'antd'
import { useParams, useRouter } from 'next/navigation';
import { UploadFilesToFirebaseAndReturnUrls } from '@/helpers/upload-media';
import { AddProperty, EditProperty } from "@/actions/properties";

function Contact({
    currentStep,
    setCurrentStep,
    finalValues,
    setFinalValues,
    loading,
    setLoading,
    isEdit = false,
}: PropertiesFormStepProps) {

    const { id }: any = useParams();
    const router = useRouter();

    const onFinish = async (values: any) => {
        try {
            if (typeof setLoading === "function") setLoading(true);

            const tempFinalValues = { ...finalValues, contact: values };

            // Subir archivos al storage
            const tempMedia = tempFinalValues.media;
            const newImagesURLS = await UploadFilesToFirebaseAndReturnUrls(
                tempMedia.newlyUploadedFiles
            );

            tempMedia.images = [...(tempMedia.images || []), ...newImagesURLS];
            tempFinalValues.media = tempMedia;

            const valuesAsPerDb = {
                ...tempFinalValues.basic,
                ...tempFinalValues.location,
                ...tempFinalValues.amenities,
                ...tempFinalValues.contact,
                images: tempFinalValues.media.images,
            };

            let response = null;
            if (isEdit) {
                response = await EditProperty(valuesAsPerDb, id);
            } else {
                response = await AddProperty(valuesAsPerDb);
            }

            if (response.error) throw new Error(response.error);

            message.success(response.message);
            router.push("/user/properties");
        } catch (error: any) {
            message.error(error.message || "Error al guardar la propiedad");
        } finally {
            if (typeof setLoading === "function") setLoading(false);
        }
    };

    return (
        <Form
            onFinish={onFinish}
            layout="vertical"
            initialValues={finalValues.contact}
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <Form.Item
                    name="ownerName"
                    label="Nombre del propietario"
                    rules={[
                        {
                            required: true,
                            message: "Please input owner name!",
                        },
                    ]}
                >
                    <Input placeholder="Owner Name" />
                </Form.Item>
                <Form.Item
                    name="ownerEmail"
                    label="Correo electrónico"
                    rules={[
                        {
                            required: true,
                            message: "Please input owner email!",
                        },
                    ]}
                >
                    <Input placeholder="Owner Email" />
                </Form.Item>
                <Form.Item
                    name="ownerPhone"
                    label="Teléfono de contacto"
                    rules={[
                        {
                            required: true,
                            message: "Please input owner phone!",
                        },
                    ]}
                >
                    <Input placeholder="" />
                </Form.Item>

                <Form.Item
                    name="showOwnerContact"
                    label="Mostrar contacto del propietario"
                    rules={[
                        {
                            required: true,
                            message: "Please choose an option!",
                        },
                    ]}
                >
                    <Select
                        options={[
                            { label: "Sí", value: true },
                            { label: "No", value: false },
                        ]}
                    />
                </Form.Item>
            </div>

            <div className="flex justify-end gap-5 mt-7">
                <Button
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep(currentStep - 1)}
                >
                    Volver
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Guardar propiedad
                </Button>
            </div>
        </Form>
    );
}

export default Contact;
