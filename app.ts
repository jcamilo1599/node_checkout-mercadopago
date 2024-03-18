import express, {Express, Request, Response} from 'express';
import {MercadoPagoConfig, Payment} from "MercadoPago";
import {PaymentCreateData, PaymentCreateRequest} from "MercadoPago/dist/clients/payment/create/types";

const app: Express = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response): void => {
  const token: string = "APP_USR-TOKEN";
  const client: MercadoPagoConfig = new MercadoPagoConfig({
    accessToken: token,
    options: {
      timeout: 5000,
      idempotencyKey: 'abc'
    }
  });

  // Inicializa el objeto de la API DE Mercado Pago
  const payment: Payment = new Payment(client);

  // Objeto de la solicitud
  const requestObject: PaymentCreateRequest = {
    transaction_amount: 10000,
    payment_method_id: ""
  }

  // Información del pago
  const data: PaymentCreateData = {
    body: requestObject,
  };

  // Realiza la llamada a la API para procesar el pago
  payment.create(data).then((response): void => {
    console.log(response);
  }).catch((error): void => {
    console.error(error);
  });

  res.send('Mercado Pago');
});

app.listen(port, (): void => {
  console.log(`Servidor ejecutando sobre el puerto ${port}`);
});
