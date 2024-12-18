import {Body,Container,Head,Heading,Hr,Html,Preview,Tailwind,} from "@react-email/components"
import { OrderInformation } from "./components/OrderInformation"
import React from "react"

type OrderHistoryEmailProps = {
  orders: {
    id: string
    price: number
    createdAt: Date
    downloadVerificationId: string
    product: {
      name: string
      imagePath: string
      description: string
    }
  }[]
}

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      price: 10000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product 1",
        description: "Some description",
        imagePath:
          "/products/bd4b8bca-becf-440e-9e5b-6e970cba432d-background-for-thumbnail-youtube-2.png",
      },
    },
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      price: 2000,
      downloadVerificationId: crypto.randomUUID(),
      product: {
        name: "Product 2",
        description: "Some other desc",
        imagePath:
          "/products/9349bd11-def7-41fb-bf18-518ee44c85aa-thumbnail-7439989_640.webp",
      },
    },
  ],
} satisfies OrderHistoryEmailProps

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History & Downloads</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Order History</Heading>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                <OrderInformation
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}