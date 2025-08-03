"use server";
import prisma from "@/config/db";
import { currentUser } from "@clerk/nextjs/server";

export const GetCurrentUserFromMongoDB = async () => {
  try {
    // Obtener usuario de Clerk
    const clerkUser = await currentUser();

    // Si no está autenticado, retornar null como respuesta válida
    if (!clerkUser || !clerkUser.id) {
      console.log("[GetCurrentUserFromMongoDB]: Visitante no autenticado.");
      return {
        data: null, // No autenticado, es válido
      };
    }

    // Buscar usuario en la base de datos con su ID de Clerk
    const mongoUser = await prisma.user.findUnique({
      where: {
        clerkUserId: clerkUser.id,
      },
    });

    if (mongoUser) {
      return {
        data: mongoUser,
      };
    }

    // Si no existe, crear uno nuevo
    let username = clerkUser.username || `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`;
    username = username.trim().replace("null", "").replace("undefined", "");

    const newUser = {
      clerkUserId: clerkUser.id,
      username,
      email: clerkUser.emailAddresses?.[0]?.emailAddress || "",
      profilePic: clerkUser.imageUrl || "",
    };

    const result = await prisma.user.create({
      data: newUser,
    });

    return {
      data: result,
    };
  } catch (error: any) {
    console.error("[GetCurrentUserFromMongoDB]:", error);
    return {
      error: {
        message: error.message || "Error desconocido al obtener el usuario",
      },
    };
  }
};
