import type { Metadata } from "next";
import ThemeProvider from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { currentUser } from "@clerk/nextjs/server";
import { cache } from "react";
import LayoutProvider from "@/providers/layout-provider";
import "./globals.css";
import 'remixicon/fonts/remixicon.css'
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Venta de departamentos, casas y terrenos",
  description: "Una sola parada para todas sus necesidades inmobiliarias",
};

// ✅ Cacheamos la llamada a currentUser
const getClerkUser = cache(async () => await currentUser());

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedInUser = await getClerkUser();

  let username = loggedInUser?.username;
  if (!username) {
    username = `${loggedInUser?.firstName ?? ""} ${loggedInUser?.lastName ?? ""}`.trim();
  }

  return (
    <ClerkProvider localization={esES}>
      <html lang="es" className="h-full">
        <body className="min-h-screen">
          <ThemeProvider>
            <LayoutProvider>
              {children}
            </LayoutProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}