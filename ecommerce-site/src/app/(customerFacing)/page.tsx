
import { ProductCard, ProductCardSkeleton } from "@/src/components/ProductCard"
import { Button } from "@/src/components/ui/button"
import db from "@/src/db/db"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"


// function to get the newest products from db
function getMostPopularProducts() {
    // await wait(3000)
    return db.product.findMany({
        where: { availability: true },
        orderBy: { orders: { _count: "desc" } },
        take: 6
    })
}

function getNewestProducts() {
    // await wait(2000)
    return db.product.findMany({
        where: { availability: true },
        orderBy: { createdAt: "desc" },
        take: 6
    })
}

export default function HomePage() {
    return (
        <main className="space-y-12">
            <ProductGridSection title="Most Popular" productsFetcher={getMostPopularProducts} />

            <ProductGridSection title="Newest" productsFetcher={getNewestProducts} />
        </main>
    )
}

type ProductGridSectionProps = {
    title: string,
    productsFetcher: () => Promise<Product[]>
}

// function wait(duration: number) {
//     return new Promise(resolve => setTimeout(resolve, duration))
// }

async function ProductGridSection({ productsFetcher, title }:
    ProductGridSectionProps) {
    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <h2 className="text-3xl font">{title}</h2>
                <Button variant="outline" asChild>
                    <Link href="/products" className="space-x-2">
                        <span>View All</span>
                        <ArrowRight className="size-4" />
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense
                    fallback={
                        <>
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                        </>
                    }
                >
                    <ProductSuspense productsFetcher={productsFetcher} />
                </Suspense>
            </div>
        </div>
    )
}

async function ProductSuspense({
    productsFetcher,
}: {
    productsFetcher: () => Promise<Product[]>
}) {
    return (await productsFetcher()).map(product => (
        <ProductCard key={product.id} {...product} />
    ))
}