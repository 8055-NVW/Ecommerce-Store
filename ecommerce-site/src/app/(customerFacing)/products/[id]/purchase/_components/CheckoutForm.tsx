"use client"

import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { formatCurrency } from "@/src/lib/formatters"
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Image from "next/image"

type CheckoutFormProps = {
    product: {
        imagePath: string
        name: string
        price: number
        description: string
    }
    clientSecret: string
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

export function CheckoutForm({ product, clientSecret }
    : CheckoutFormProps) {

    return (
        <div className="max-w-5xl w-full mx-auto space-y-8">
            <div className="flex gap-4 items-center">
                <div className="aspect-video flex-shirnk-0 w-1/3 relative" >
                    <Image src={product.imagePath} fill alt={product.name} className="object-cover" />
                </div>
                <div>
                    <div className="text-lg">
                        {formatCurrency(product.price / 100)}
                    </div>
                    <h1 className="text-2xl font-bold">
                        {product.name}
                    </h1>
                    <div className="line-clamp-3 text-muted-foreground">
                        {product.description}
                    </div>
                </div>
            </div>
            <Elements options={{ clientSecret }} stripe={stripePromise}>
                <Form price={product.price} />
            </Elements>
        </div>

    )
}

function Form({ price }: { price: number }) {

    const stripe = useStripe()
    const elements = useElements()

    return (
        <form action="">
            <Card>
                <CardHeader>
                    <CardTitle>Checkout</CardTitle>
                    <CardDescription className="text-destructive">Error</CardDescription>
                </CardHeader>
                <CardContent>
                    <PaymentElement />
                </CardContent>
                <CardFooter>
                    <Button className="w-full" size="lg" disabled={stripe == null || elements == null} >
                        Purchase - {formatCurrency(price / 100)}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}