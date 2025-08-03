'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const status = searchParams.get('status');
        const paymentId = searchParams.get('payment_id');
        const planId = searchParams.get('preference_id'); // o ajusta si usas otro ID

        if (status === 'approved' && paymentId) {
            // Aquí puedes enviar una solicitud al backend para guardar la compra
            fetch('/api/subscription/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentId,
                    preferenceId: planId,
                }),
            }).then((res) => {
                if (res.ok) {
                    message.success('¡Compra exitosa!');
                } else {
                    message.error('Hubo un problema al registrar la compra');
                }
            });
        } else {
            message.warning('La compra no fue aprobada');
        }
    }, [searchParams]);

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Gracias por tu compra 🎉</h1>
            <p>Estamos procesando tu suscripción...</p>
        </div>
    );
}
