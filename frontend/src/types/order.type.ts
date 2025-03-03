import {DeliveryType} from "./delivery.type";
import {PaymentType} from "./payment.type";
import {OrderStatusType} from "./order-status";

export type OrderType = {
  deliveryType: DeliveryType,
  firstName: string,
  lastName: string,
  fatherName?: string,
  phone: string,
  paymentType: PaymentType,
  email: string,
  street?: string,
  house?: string,
  entrance?: string,
  apartment?: string,
  comment?: string,
  items?: {
    name: string,
    id: string,
    quantity: number,
    price: number,
    total: number
  }[],
  totalAmount?: number,
  status?: OrderStatusType,
  statusRus?: string,
  color?: string
}
