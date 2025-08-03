"use client";
import {
    parkingTypes,
    propertyStatuses,
    propertyTypes,
} from "@/constants";
import { Button, Form, Input, InputNumber, Modal, Select, Tag } from "antd";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

function FiltersHome({ searchParams }: { searchParams: any }) {
    const [showFiltersModal, setShowFiltersModal] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    const onFinish = (values: any) => {
        // remove undefined/null values
        const formattedData: any = {};
        Object.keys(values).forEach((key) => {
            if (values[key]) {
                formattedData[key] = values[key];
            }
        });

        // construct query string
        const queryString = new URLSearchParams(formattedData).toString();
        router.push(`${pathname}?${queryString}`);
        setShowFiltersModal(false);
    };

    return (
        <>
            <div className="flex justify-between p-5 border rounded-sm border-solid border-gray-300 mb-5 items-center mt-5 bg-white">
                <div>
                    {Object.keys(searchParams).length === 0 ? (
                        <span className="text-gray-500 text-sm">No se aplicaron filtros</span>
                    ) : (
                        <div className="flex flex-wrap gap-5">
                            {Object.keys(searchParams).map((key) => {
                                return (
                                    <div className="capitalize flex flex-col gap-1" key={key}>
                                        <span className="text-gray-500 text-sm">{key}</span>
                                        <Tag
                                            onClose={() => {
                                                // remove the tag from the searchParams
                                                const newSearchParams = { ...searchParams };
                                                delete newSearchParams[key];

                                                // construct query string
                                                const queryString = new URLSearchParams(
                                                    newSearchParams
                                                ).toString();
                                                router.push(`${pathname}?${queryString}`);
                                            }}
                                            closable
                                            closeIcon
                                            className="flex items-center gap-1 border border-solid border-primary"
                                        >
                                            <div className="span text-primary text-sm ">
                                                {searchParams[key]}
                                            </div>
                                        </Tag>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                <div className="flex gap-5">
                    <Button
                        onClick={() => {
                            router.push(pathname);
                        }}
                    >
                        Limpiar
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => {
                            setShowFiltersModal(true);
                        }}
                    >
                        Mostrar filtros
                    </Button>
                </div>
            </div>

            {showFiltersModal && (
                <Modal
                    title={
                        <h1 className="text-xl font-semibold text-primary text-center uppercase">
                            Aplicar filtros
                        </h1>
                    }
                    open={showFiltersModal}
                    footer={null}
                    onCancel={() => {
                        setShowFiltersModal(false);
                    }}
                    centered
                    width={800}
                >
                    <Form
                        onFinish={onFinish}
                        layout="vertical"
                        initialValues={searchParams}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                            <Form.Item label="Tipo de propiedad" name="type">
                                <Select options={propertyTypes} />
                            </Form.Item>
                            <Form.Item label="Alquiler/venta" name="status">
                                <Select options={propertyStatuses} />
                            </Form.Item>
                            <Form.Item label="Ciudad" name="city">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Edad" name="age">
                                <InputNumber className="w-full" />
                            </Form.Item>
                            <Form.Item label="Aparcamiento" name="parking">
                                <Select options={parkingTypes} />
                            </Form.Item>
                        </div>

                        <div className="mt-7 flex justify-end gap-5">
                            <Button
                                onClick={() => {
                                    setShowFiltersModal(false);
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Aplicar
                            </Button>
                        </div>
                    </Form>
                </Modal>
            )}
        </>
    );
}

export default FiltersHome;