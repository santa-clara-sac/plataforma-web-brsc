import Filters from "@/components/filters";
import PageTitle from "@/components/page-title";
import React from "react";
import PropertiesTable from "../../user/properties/_components/properties-table";

function AdminPropertiesPage({ searchParams }: { searchParams: any }) {
    return (
        <div className="py-5 lg:px-20 px-5">
            <PageTitle title="Admin / Properties" />
            <Filters searchParams={searchParams} />
            <PropertiesTable searchParams={searchParams} fromAdmin={true} />
        </div>
    );
}

export default AdminPropertiesPage;