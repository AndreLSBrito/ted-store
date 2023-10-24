import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Order, Prisma } from "@prisma/client";
import { format } from "date-fns"
import OrderProductItem from "./order-product-item";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { computedProductTotalPrice } from "@/helpers/product";
import { getOrdersStatus } from "../helpers/status";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {product: true}
      }
    }
  }>
}

const OrderItem = ({ order }:OrderItemProps) => {
  const subtotal = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return acc + Number(orderProduct.basePrice) * orderProduct.quantity
    }, 0)
  }, [order.orderProducts])

  const total = useMemo(() => {

    return order.orderProducts.reduce((acc, orderProduct) => {
      const productWithTotalPrice = computedProductTotalPrice(orderProduct.product)
      return acc + productWithTotalPrice.totalPrice * orderProduct.quantity;
    }, 0)
  }, [order.orderProducts])

  const totalDiscount = subtotal - total;

  return ( 
    <Card className="px-5">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              <p className="font-bold uppercase">Pedido com {order.orderProducts.length} produto(s)</p>
              <span className="text-sm opacity-60">Feito em {format(order.createdAt, "d/MM/y 'às' HH:mm")}</span>
            </div>
          </AccordionTrigger>
        
        <AccordionContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="font-bold">
                <p>Status</p>

                <p className="text-[#8162ff]">{getOrdersStatus(order.status)}</p>
              </div>

              <div>
                <p className="font-bold">Data</p>
                <p className="opacity-60">{format(order.createdAt, "d/MM/y")}</p>
              </div>

              <div>
                <p className="font-bold">Pagamento</p>
                <p className="opacity-60">Cartão</p>
              </div>
            </div>

            {order.orderProducts.map(OrderProduct => (
              <OrderProductItem key={OrderProduct.id} orderProduct={OrderProduct}/>
            ))}

            <div className="flex flex-col w-full gap-1 text-xs">
              <Separator/>

              <div className="flex justify-between w-full py-3">
                <p>Subtotal</p>
                <p>R$ {subtotal.toFixed(2)}</p>
              </div>

              <Separator/>

              <div className="flex justify-between w-full py-3">
                <p>Entrega</p>
                <p>GRÁTIS</p>
              </div>

              <Separator/>

              <div className="flex justify-between w-full py-3">
                <p>Descontos</p>
                <p>-R$ {totalDiscount}</p>
              </div>

              <Separator/>

              <div className="flex justify-between w-full py-3 text-sm font-bold">
                <p>Total</p>
                <p>R$ {total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </AccordionContent>
        </AccordionItem>

      </Accordion>
    </Card>
   );
}
 
export default OrderItem;