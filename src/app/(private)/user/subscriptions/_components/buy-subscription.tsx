"use client";

import { Button, message } from "antd";
import React, { useState } from "react";

function BuySubScription({ plan }: { plan: any }) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleBuy = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/mercadopago/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });
      const data = await response.json();

      if (response.ok && data.init_point) {
        // Redirige al usuario a Mercado Pago
        window.location.href = data.init_point;
      } else {
        throw new Error(data.error || "Error al crear la preferencia");
      }
    } catch (error: any) {
      message.error(error.message || "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button block onClick={handleBuy} loading={loading} disabled={plan.price === 0}>
        Comprar ahora
      </Button>
    </div>
  );
}

export default BuySubScription;
