import Link from "next/link"
import { formatCurrency } from "../lib/formatters"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import Image from "next/image"

type ProductCardProps = {
    id: string,
    name: string,
    price: number,
    description: string,
    imagePath: string
}

export function ProductCard({ id, name, price, description, imagePath }:
    ProductCardProps
) {
    return <Card className="flex overflow-hidden flex-col">
        <div className="relative w-full h-auto aspect-video">
           <Image src={imagePath} fill alt={name} />
        </div>
        <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{formatCurrency(price / 100)}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="line-clamp-4">{description}</p>
        </CardContent>
        <CardFooter>
            <Button asChild size="lg" className="w-full">
                <Link href={`/products/${id}.purchase`}>Purchase</Link>
            </Button>
        </CardFooter>
    </Card>
}