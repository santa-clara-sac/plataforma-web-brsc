import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { GetCurrentUserFromMongoDB } from "@/actions/users";

export const mercadopago = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
    const body = await req.json();
    const { plan } = body;

    try {
        const baseUrl = process.env.URL_NGROK!;

        const user = await GetCurrentUserFromMongoDB();
        console.log("---------------------");
        console.log(user.data?.id);
        console.log("---------------------");
        debugger;

        if (!user || !user.data?.id) {
            return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 });
        }

        const preference = await new Preference(mercadopago).create({
            body: {
                items: [
                    {
                        id: String(plan.id),
                        title: plan.title,
                        unit_price: plan.price,
                        quantity: 1,
                    },
                ],
                payment_methods: {
                    installments: 1
                },
                back_urls: {
                    success: `${baseUrl}/success`,
                    failure: "https://google.es/failure",
                    pending: "https://google.es/pending",
                },
                auto_return: "approved",
                metadata: {
                    userId: user?.data?.id, // 👈 aquí pasas el userId
                    plan: plan.name,
                },
            }
        });

        return NextResponse.json({ init_point: preference.init_point });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
