
import { ProductCard, ProductCardSkeleton } from "@/src/components/ProductCard"
import { Button } from "@/src/components/ui/button"
import db from "@/src/db/db"
import { cache } from "@/src/lib/cache"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"


// function to get the newest products from db
const getMostPopularProducts = cache(
    () => {
        // await wait(3000)
        return db.product.findMany({
            where: { availability: true },
            orderBy: { orders: { _count: "desc" } },
            take: 6
        })
    }, ["/", "getMostPopularProducts"],
    { revalidate: 60 * 60 * 24 }
)

const getNewestProducts = cache(() => {
    // await wait(2000)
    return db.product.findMany({
        where: { availability: true },
        orderBy: { createdAt: "desc" },
        take: 6
    })
}, ["/", "getNewestProducts"], )

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