// app/(auth)/sign-in/page.tsx
import { SignIn } from '@clerk/nextjs';

export default function Page() {
    return (
        <div className="flex h-screen">
            {/* Lado izquierdo: Login */}
            <div className="w-full md:w-2/5 flex justify-center items-center p-6">
                <div className="max-w-sm w-full">
                    <div className="mb-6 text-center text-xl font-semibold text-gray-800">
                        Bienes Raíces Santa Clara S.A.C.
                    </div>
                    <SignIn path="/sign-in" routing="path"
                    />
                </div>
            </div>


            {/* Lado derecho: Imagen */}
            <div className="hidden md:block w-3/5">
                <img
                    src="login.png"
                    alt="Family house background"
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    );
}
