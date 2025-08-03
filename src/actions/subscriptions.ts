"use server";
import prisma from "@/config/db";

export const SaveSubscription = async ({
    userId,
    paymentId,
    plan,
}: {
    userId: string;
    paymentId: string;
    plan: any;
}) => {
    try {
        if (!userId) {
            throw new Error("Falta el userId");
        }

        await prisma.subscription.create({
            data: {
                userId,
                paymentId,
                plan,
            },
        });

        return {
            message: "Suscripción guardada exitosamente",
        };
    } catch (error: any) {
        console.error("❌ Error al guardar suscripción:", error.message);
        return {
            error: error.message,
        };
    }
};
