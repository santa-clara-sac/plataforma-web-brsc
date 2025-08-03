


# CHANGE SCHEME PRISMA
```sh
npx prisma generate
npx prisma db push
npx prisma studio
```

# OTRAS PLATAFORMAS WEB
- https://www.properati.com.pe/
- https://www.remax.pe/
- https://perubienesraices.com/
- https://nexoinmobiliario.pe
- https://www.adondevivir.com/publica-tu-propiedad/particular.html
- https://cissacperu.com/nosotros/

```
npx prisma db push
```

```sh
curl -X GET "https://api.mercadopago.com/v1/payments/1324133436" -H "Authorization: Bearer TEST-5213169189988846-071113-3ff5328405b0a97a1d5a8bcf8d4f7ab1-2088541873"
{"accounts_info":null,"additional_info":{"ip_address":"38.253.159.207","items":[{"id":"undefined","quantity":"1","title":"Producto sin descripción","unit_price":"10"}],"tracking_id":"platform:v1-whitelabel,so:ALL,type:N/A,security:none"},"authorization_code":"301299","binary_mode":false,"brand_id":null,"build_version":"3.116.0-rc-4","call_for_authorize_id":null,"captured":true,"card":{"cardholder":{"identification":{"number":"12345678","type":"DNI"},"name":"APRO"},"country":null,"date_created":"2025-07-22T11:58:34.000-04:00","date_last_updated":"2025-07-22T11:58:34.000-04:00","expiration_month":11,"expiration_year":2030,"first_six_digits":"400917","id":null,"last_four_digits":"6176","tags":["credit"]},"charges_details":[{"accounts":{"from":"collector","to":"mp"},"amounts":{"original":1.65,"refunded":0},"client_id":0,"date_created":"2025-07-22T11:58:34.000-04:00","id":"1324133436-001","last_updated":"2025-07-22T11:58:34.000-04:00","metadata":{"reason":"","source":"rule-engine"},"name":"mercadopago_fee","processing_mode":"","refund_charges":[],"reserve_id":null,"type":"fee"}],"charges_execution_info":{"internal_execution":{"date":"2025-07-22T11:58:34.016-04:00","execution_id":"01K0SDQAZGW1JZ59Z26MTBN3S9"}},"collector_id":2088541873,"corporation_id":null,"counter_currency":null,"coupon_amount":0,"currency_id":"PEN","date_approved":"2025-07-22T11:58:34.000-04:00","date_created":"2025-07-22T11:58:34.000-04:00","date_last_updated":"2025-07-22T11:58:34.000-04:00","date_of_expiration":null,"deduction_schema":null,"description":"Producto sin descripción","differential_pricing_id":null,"external_reference":null,"fee_details":[{"amount":1.65,"fee_payer":"collector","type":"mercadopago_fee"}],"financing_group":null,"id":1324133436,"installments":1,"integrator_id":null,"issuer_id":"12551","live_mode":false,"marketplace_owner":2088541873,"merchant_account_id":null,"merchant_number":null,"metadata":{"user_id":"cmcmjr0si0008jnp8uv4vgj1o","plan":"Estándar"},"money_release_date":"2025-07-22T11:58:34.000-04:00","money_release_schema":null,"money_release_status":"released","notification_url":null,"operation_type":"regular_payment","order":{"id":"32628581250","type":"mercadopago"},"payer":{"identification":{"number":"32659430","type":"DNI"},"entity_type":null,"phone":{"number":null,"extension":null,"area_code":null},"last_name":null,"id":"2572827570","type":null,"first_name":null,"email":"test_user_80507629@testuser.com"},"payment_method":{"data":{"routing_data":{"merchant_account_id":"4032676"}},"id":"visa","issuer_id":"12551","type":"credit_card"},"payment_method_id":"visa","payment_type_id":"credit_card","platform_id":null,"point_of_interaction":{"application_data":{"name":"checkout-off","operating_system":null,"version":"v2"},"business_info":{"branch":"Merchant Services","sub_unit":"checkout_pro","unit":"online_payments"},"transaction_data":{"e2e_id":null},"type":"CHECKOUT"},"pos_id":null,"processing_mode":"aggregator","refunds":[],"release_info":null,"shipping_amount":0,"sponsor_id":null,"statement_descriptor":"Mercadopago*fake","status":"approved","status_detail":"accredited","store_id":null,"tags":null,"taxes_amount":0,"transaction_amount":10,"transaction_amount_refunded":0,"transaction_details":{"acquirer_reference":null,"external_resource_url":null,"financial_institution":null,"installment_amount":10,"net_received_amount":8.35,"overpaid_amount":0,"payable_deferral_period":null,"payment_method_reference_id":null,"total_paid_amount":10}}
```