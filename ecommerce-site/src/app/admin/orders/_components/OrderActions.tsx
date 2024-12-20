"use client"

import { DropdownMenuItem } from "@/src/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { deleteOrder } from "../../_actions/orders"



export function DeleteDropDownItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteOrder(id)
          router.refresh()
        })
      }
    >
      Delete
    </DropdownMenuItem>
  )
}