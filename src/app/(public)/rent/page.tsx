import Filters from "@/components/filters";
import Loader from "@/components/Loader";
import { Suspense } from "react";
import PropertiesData from "../../(private)/_components/properties-data";

export default async function Rent({ searchParams }: { searchParams: any }) {
    const key = JSON.stringify(searchParams);

    return (
        <main className="">
            <Filters searchParams={searchParams} />
            <Suspense fallback={<Loader />} key={key}>
                <PropertiesData searchParams={searchParams} />
            </Suspense>
        </main>
    );
}
