import PageTitle from "@/components/page-title";
import React, { Suspense } from "react";
import PropertiesTable from "./_components/properties-table";
import LinkButton from "@/components/link-button";
import Filters from "@/components/filters";
import Loader from "@/components/Loader";

function Properties({ searchParams }: { searchParams: any }) {
  const key = JSON.stringify(searchParams);
  return (
    <div className="py-5 lg:px-20 px-5">
      <div className="flex justify-between items-center">
        <PageTitle title="Properties" />
        <LinkButton
          title="Crear propiedad"
          path="/user/properties/create-property"
        />
      </div>
      <Filters searchParams={searchParams} />
      <Suspense fallback={<Loader />} key={key}>
        <PropertiesTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default Properties;