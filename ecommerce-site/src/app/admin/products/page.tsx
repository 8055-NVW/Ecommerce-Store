import { Button } from "@/src/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import db from "@/src/db/db";
import { CheckCircle2, Delete, MoreVertical, XCircle } from "lucide-react";
import { format } from "path";
import { formatCurrency, formatNumber } from "@/src/lib/formatters";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./_components/ProductActions";



export default function AdminProductsPage() {
    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader>Products</PageHeader>
                <Button asChild>
                    {/* using asChild with shadcn sets the button to behave like a button */}
                    <Link href="/admin/products/new">Add Product</Link>
                </Button>
            </div>
            <ProductsTable />
        </>
    )
}

async function ProductsTable() {
    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            availability: true,
            _count: { select: { orders: true } }
        },
        orderBy: { name: "asc" }
    })

    if (products.length === 0) {
        return <div>No products found</div>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-0">
                        <span className="sr-only">Available for Purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map(product => (
                    <TableRow key={product.id}>
                        <TableCell>
                            {product.availability ?
                                <>
                                    <CheckCircle2 />
                                    <span className="sr-only">Available</span>
                                </>
                                :
                                <>
                                    <XCircle className="stroke-destructive" />
                                    <span className="sr-only">Unavailable</span>
                                </>
                            }
                        </TableCell>
                        <TableCell>
                            {product.name}
                        </TableCell>
                        <TableCell>
                            {formatCurrency(product.price / 100)}
                        </TableCell>
                        <TableCell>
                            {formatNumber(product._count.orders)}
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <a download href={`/admin/products/${product.id}/download`}>Download</a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link download href={`/admin/products/${product.id}/edit`}>Edit</Link>
                                    </DropdownMenuItem>
                                    <ActiveToggleDropdownItem
                                        id={product.id}
                                        availability={product.availability} />
                                    <DropdownMenuSeparator />
                                    <DeleteDropdownItem

                                        id={product.id}
                                        disabled={product._count.orders > 0} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}