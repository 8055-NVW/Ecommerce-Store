"use client"
import { DropdownMenuItem } from "@/src/components/ui/dropdown-menu"
import { useTransition } from "react";
import { deleteProduct, toggleProductAvailability } from "../../_actions/products";
import { useRouter } from "next/navigation";

export function ActiveToggleDropdownItem({
    id,
    availability
}: {
    id: string,
    availability: boolean
}) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return <DropdownMenuItem
        disabled={isPending}
        onClick={() => {
            startTransition(async () => {
                await toggleProductAvailability(id, !availability)
                router.refresh()
            })
        }}>
        {availability ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
}

export function DeleteDropdownItem({ id, disabled }: { id: string, disabled: boolean }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <DropdownMenuItem
            variant="destructive"
            disabled={disabled || isPending}
            onClick={() => {
                startTransition(async () => {
                    await deleteProduct(id)
                    router.refresh()
                })
            }}>
            Delete
        </DropdownMenuItem>
    )
}