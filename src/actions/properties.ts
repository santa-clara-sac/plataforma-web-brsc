"use server";

import { GetCurrentUserFromMongoDB } from "./users";
import prisma from "@/config/db";
import { revalidatePath } from "next/cache";

export const AddProperty = async (property: any) => {
    try {
        const user: any = await GetCurrentUserFromMongoDB();
        property.userId = user.data.id;
        await prisma.property.create({
            data: property,
        });
        revalidatePath("/user/properties");
        return {
            data: property,
            message: "Propiedad añadida con éxito",
        };
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
};

export const EditProperty = async (property: any, id: string) => {
    try {
        await prisma.property.update({
            where: {
                id: id,
            },
            data: property,
        });
        revalidatePath("/user/properties");
        return {
            data: property,
            message: "Propiedad editada exitosamente",
        };
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
};

export const DeleteProperty = async (id: string) => {
    try {
        // 1. Eliminar primero las queries asociadas a la propiedad
        await prisma.query.deleteMany({
            where: {
                propertyId: id,
            },
        });

        // 2. Luego eliminar la propiedad
        await prisma.property.delete({
            where: {
                id: id,
            },
        });

        // 3. Revalidar la ruta (si estás usando ISR o caché en Next.js)
        revalidatePath("/user/properties");

        return {
            message: "Propiedad eliminada exitosamente",
        };
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
};