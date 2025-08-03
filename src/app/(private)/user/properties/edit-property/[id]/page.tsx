import PageTitle from "@/components/page-title";
import React from "react";
import PropertiesForm from "../../_components/properties-form";
import prisma from "@/config/db";

interface Props {
    params: {
        id: string;
    };
}

async function EditPropertyPage({ params }: Props) {
    const property = await prisma.property.findUnique({
        where: {
            id: params.id,
        },
    });
    return (
        <div className="py-5 lg:px-20 px-5">
            <PageTitle title="Edit Property" />
            <PropertiesForm
                initialValues={property}
                isEdit={true}
            />
        </div>
    );
}

export default EditPropertyPage;