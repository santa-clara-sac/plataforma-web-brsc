'use client';
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import { GetCurrentUserFromMongoDB } from "@/actions/users";
import { User } from "@/interfaces";
import Loader from "@/components/Loader";
import { Button, Dropdown, message } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const userMenu = [
  { name: "Inicio", path: "/" },
  { name: "Propiedades", path: "/user/properties" },
  { name: "Cuenta", path: "/user/account" },
  { name: "Suscripción", path: "/user/subscriptions" },
  { name: "Consultas", path: "/user/queries" },
];

const adminMenu = [
  { name: "Inicio", path: "/" },
  { name: "Propiedades", path: "/admin/properties" },
  { name: "Users", path: "/admin/users" },
];

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [menuToShow = userMenu, setMenuToShow] = useState<any>(userMenu);
  const pathname = usePathname();
  const [currentUserData, setCurrentUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const isPublicRoute = ["sign-in", "sign-up"].includes(pathname.split("/")[1]);
  const isAdminRoute = pathname.split("/")[1] === "admin";
  const hideHeader = pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");

  const navLinks = [
    { name: "Quienes somos", path: "/about-we" },
    { name: "Alquiler", path: "/rent?status=Alquiler" },
    { name: "Venta", path: "/sale?status=Venta" },
  ];

  useEffect(() => {
    const getCurrentUser = async () => {
      setLoading(true);
      try {
        const response = await GetCurrentUserFromMongoDB();

        if (response?.error) throw new Error(response.error.message);

        // Verificamos explícitamente que response.data no sea null
        if (response.data) {
          setCurrentUserData(response.data);

          if (response.data.isAdmin) {
            setMenuToShow(adminMenu);
          }
        } else {
          throw new Error("No user data received.");
        }
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);


  const getHeader = () => {
    if (hideHeader) return null;

    return (
      <div className="lg:px-20 mt-4">
        <div className="flex items-center justify-between bg-white p-4 h-3">
          <h1 className="text-xl text-black font-bold cursor-pointer" onClick={() => router.push("/")}>
            <Image
              src="/logo.png"
              alt="Urbania 2.0 Logo"
              width={143}
              height={52}
              priority
            />
          </h1>

          <div className="flex items-center space-x-4">
            {navLinks.map((link) => {
              const basePath = link.path.split('?')[0];
              const isActive = pathname.startsWith(basePath);
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`px-4 py-2 transition duration-200 no-underline ${isActive
                    ? "bg-[#FF9500] text-white"
                    : "text-black hover:bg-gray-100"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}


            <SignedOut>
              <SignInButton>
                <button className="bg-black text-white rounded px-4 py-2 hover:bg-gray-800 transition">
                  Ingresar
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-black text-white rounded px-4 py-2 hover:bg-gray-800 transition">
                  Registro
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center bg-white rounded px-3 py-1 space-x-2 h-6">
                {currentUserData && (
                  <Dropdown
                    menu={{
                      items: menuToShow.map((item: any) => ({
                        label: item.name,
                        onClick: () => {
                          router.push(item.path);
                        },
                      })),
                    }}
                  >
                    <Button className="text-primary hover:text-primary" type="link">
                      {currentUserData?.username}
                    </Button>
                  </Dropdown>
                )}
                <UserButton
                  signInUrl="/sign-in"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "h-6 w-6",
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    );
  };

  const getContent = () => {
    if (isPublicRoute) return children;
    if (loading) {
      return (
        <div className="py-5 lg:px-20 px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="h-[230px] w-full bg-slate-200 animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>
      );
    }

    if (isAdminRoute && !currentUserData?.isAdmin)
      return (
        <div className="py-20 lg:px-20 px-5 text-center text-gray-600 text-sm">
          No estás autorizado para ver esta página.
        </div>
      );
    return <div>{children}</div>;
  };

  return (
    <div>
      {getHeader()}
      {getContent()}
    </div>
  );
}

export default LayoutProvider;
