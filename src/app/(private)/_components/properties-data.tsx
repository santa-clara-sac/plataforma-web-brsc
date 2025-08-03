import prisma from "@/config/db";
import PropertiesClient from "./properties-client";

export default async function PropertiesData({ searchParams }: { searchParams: any }) {
  if (searchParams.age) {
    searchParams.age = parseInt(searchParams.age);
  }

  const properties = await prisma.property.findMany({
    where: searchParams,
    orderBy: { updatedAt: "desc" },
  });

  return <PropertiesClient properties={properties} />;
}
