import { Nav, NavLink } from "@/src/components/Nav";

// This will force next.js to not cache any admin pages
export const dynamic = "force-dynamic";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <Nav>
            <NavLink href="/admin">Dashboard</NavLink>
            <NavLink href="/admin/products">Products</NavLink>
            <NavLink href="/admin/customers">Customers</NavLink>
            <NavLink href="/admin/orders">Sales</NavLink>
        </Nav>
        <div className="container my-6">{children}</div>
    </>
}