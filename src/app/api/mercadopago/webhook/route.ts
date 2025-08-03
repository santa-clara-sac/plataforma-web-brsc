import { NextResponse } from "next/server";
import { SaveSubscription } from "@/actions/subscriptions";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("📥 Webhook recibido:", JSON.stringify(body, null, 2));

        const topic = body.type || body.topic;
        const data = body.data || body;

        if (topic === "payment") {
            const paymentId = data.id || data.payment_id;

            const mpRes = await fetch(
                `https://api.mercadopago.com/v1/payments/${paymentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
                    },
                }
            );

            if (!mpRes.ok) {
                throw new Error("No se pudo obtener el detalle del pago desde MercadoPago");
            }

            const payment = await mpRes.json();
            console.log("✅ Detalles del pago:", payment);

            if (payment.status === "approved") {
                const userId = payment.metadata?.user_id;
                const planTitle = payment.metadata?.plan || "Standard"; // O también podrías seguir usando el title desde additional_info

                // Mapeo de planes
                const plans: Record<string, any> = {
                    Standard: {
                        name: "Standard",
                        price: payment.transaction_amount || 0,
                        propertiesLimit: 10,
                        imagesPerPropertyLimit: 5,
                        features: [
                            "Property Listing",
                            "Property Details",
                            "5 Images per Property",
                            "10 Properties Limit",
                            "Property Search",
                            "AI Support",
                            "24/7 Support on Email",
                        ],
                    },
                };

                const plan = plans[planTitle];

                if (!plan) {
                    throw new Error(`Plan no reconocido: ${planTitle}`);
                }

                console.log("[+] UserId:", userId);
                console.log("[+] PaymentId:", payment.id);
                console.log("[+] Plan seleccionado:", plan);

                await SaveSubscription({
                    userId,               // 👈 Lo pasas directamente
                    paymentId: String(payment.id),
                    plan,
                });

                console.log("🎉 Suscripción guardada exitosamente");
            }
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error("❌ Error en webhook:", error.message);
        return new NextResponse("Error en webhook", { status: 400 });
    }
}
