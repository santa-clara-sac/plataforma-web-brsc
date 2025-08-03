import prisma from "@/config/db";
import PropertiesClientHome from "./properties-client-home";

export default async function PropertiesDataHome({ searchParams }: { searchParams: any }) {
  if (searchParams.age) {
    searchParams.age = parseInt(searchParams.age);
  }

  const properties = await prisma.property.findMany({
    where: searchParams,
    orderBy: { updatedAt: "desc" },
  });

  return <PropertiesClientHome properties={properties} />;
}
