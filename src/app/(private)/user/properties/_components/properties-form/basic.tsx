import { PropertiesFormStepProps } from '@/interfaces'
import { Button, Form, Input, InputNumber, Select } from 'antd'
import { propertyStatuses, propertyTypes } from "@/constants";

function Basic({ currentStep, setCurrentStep, finalValues, setFinalValues }: PropertiesFormStepProps) {

    const onFinish = (values: any) => {
        setFinalValues({ ...finalValues, basic: values });
        setCurrentStep(currentStep + 1);
    }

    return (
        <Form
            onFinish={onFinish}
            layout='vertical'
            initialValues={{
                ...finalValues.basic,
                currency: finalValues.basic?.currency || 'PEN', // valor por defecto si no existe
            }}
        >
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                <Form.Item
                    name='name'
                    label='Nombre de la propiedad'
                    rules={[{ required: true, message: 'Por favor ingrese el nombre de la propiedad' }]}
                    className='col-span-1 lg:col-span-3'
                >
                    <Input autoComplete="off" placeholder='Nombre que aparecerá en la portada' />
                </Form.Item>

                <Form.Item
                    name="type"
                    label="Tipo"
                    rules={[{ required: true, message: "Por favor seleccione el tipo!" }]}
                >
                    <Select options={propertyTypes} placeholder="Seleccione un tipo" />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Estado"
                    rules={[{ required: true, message: "Por favor seleccione el estado!" }]}
                >
                    <Select options={propertyStatuses} placeholder="Seleccione el estado" />
                </Form.Item>

                {/* Precio + Moneda */}
                <Form.Item
                    label="Precio y Moneda"
                >
                    <div className="grid grid-cols-2 gap-3">
                        <Form.Item
                            name="price"
                            rules={[{ required: true, message: "Por favor ingrese el precio!" }]}
                            noStyle
                        >
                            <InputNumber
                                className="w-full"
                                type="number"
                                placeholder="Precio"
                            />
                        </Form.Item>

                        <Form.Item
                            name="currency"
                            rules={[{ required: true, message: "Seleccione la moneda!" }]}
                            noStyle
                        >
                            <Select
                                className="w-full"
                                placeholder="Moneda"
                                options={[
                                    { label: "Soles (S/)", value: "PEN" },
                                    { label: "Dólares ($)", value: "USD" },
                                ]}
                            />
                        </Form.Item>
                    </div>
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Descripción"
                    rules={[{ required: true, message: "Por favor ingrese una descripción!" }]}
                    className="col-span-1 lg:col-span-3"
                >
                    <Input.TextArea rows={6} placeholder="Descripción" />
                </Form.Item>
            </div>

            <div className='flex justify-end gap-5 mt-7'>
                <Button disabled={currentStep === 0} onClick={() => setCurrentStep(currentStep - 1)} >Volver</Button>
                <Button htmlType='submit' type='primary' >Siguiente</Button>
            </div>
        </Form>
    )
}

export default Basic;
