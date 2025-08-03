import Loader from "@/components/Loader";
import { Suspense } from "react";
import HeroSearch from "./(private)/_components/hero-search";
import PropertiesDataHome from "./(private)/_components/properties-data-home";
import Footer from "@/components/footer";

export default async function Home({ searchParams }: { searchParams: any }) {
  const key = JSON.stringify(searchParams);
  return (
    <div>
      <HeroSearch searchParams={searchParams} />
      <div className="py-5 lg:px-20 px-5">
        <Suspense fallback={<Loader />} key={key}>
          <PropertiesDataHome
            searchParams={searchParams}
          />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
