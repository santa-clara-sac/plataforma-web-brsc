"use client";

import { AddQuery } from "@/actions/queriest";
import { Button, Form, Input, Modal, message } from "antd";
import { FaWhatsapp } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import React from "react";

function QueryModal({
  propertyId,
  ownerPhone,
}: {
  propertyId: string;
  ownerPhone: string;
}) {
  const [showQueryModal, setShowQueryModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const whatsappLink = `https://api.whatsapp.com/send/?phone=51${ownerPhone}&text=&type=phone_number&app_absent=0`;


  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await AddQuery({ ...values, propertyId });
      if (response.error) throw new Error(response.error);
      message.success("Consulta enviada exitosamente");
      setShowQueryModal(false);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-7">
      <Button block onClick={() => setShowQueryModal(true)}>
        Consulta para más información <BiMessageDetail size={20} />
      </Button>

      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <Button block className="mt-4">
          Contactar por WhatsApp <FaWhatsapp size={20} />
        </Button>
      </a>

      {showQueryModal && (
        <Modal
          open={showQueryModal}
          onCancel={() => setShowQueryModal(false)}
          title="Enviar una consulta al propietario"
          centered
          width={600}
          footer={null}
        >
          <Form
            layout="vertical"
            name="query-form"
            onFinish={onFinish}
            className="flex flex-col gap-5"
          >
            <Form.Item
              name="name"
              label="Nombre"
              rules={[{ required: true, message: "Por favor, introduzca su nombre" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="message"
              label="Mensaje"
              rules={[{ required: true, message: "Por favor ingrese su mensaje" }]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Número de teléfono"
              rules={[{ required: true, message: "Por favor ingrese su teléfono" }]}
            >
              <Input />
            </Form.Item>

            <div className="flex justify-end gap-5">
              <Button
                htmlType="button"
                onClick={() => setShowQueryModal(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Enviar
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default QueryModal;