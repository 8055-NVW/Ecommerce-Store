"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"
import { useState } from "react"
import { addProduct } from "../../_actions/products"
import { useFormState, useFormStatus } from "react-dom"

export function ProductForm() {
    const [error, action ] = useFormState(addProduct, {})
    const [price, setPrice] = useState<number>()

    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2 ">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" required />
                {error.name && <div className="text-destructive">{error.name}</div>}
            </div>
            <div className="space-y-2 ">
                <Label htmlFor="price">Price</Label>
                <Input type="number" id="price" name="price" required value={price}
                    onChange={e => setPrice(Number(e.target.value) || undefined)} />
                <div className="text-muted-foreground">
                    {formatCurrency((price || 0) / 100)}
                </div>
                {error.price && <div className="text-destructive">{error.price}</div>}
            </div>
            <div className="space-y-2 ">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required />
                {error.description && <div className="text-destructive">{error.description}</div>}
            </div>
            <div className="space-y-2 ">
                <Label htmlFor="file">File</Label>
                <Input type="file" id="file" name="file" required />
                {error.file && <div className="text-destructive">{error.file}</div>}

            </div>
            <div className="space-y-2 ">
                <Label htmlFor="image">Image</Label>
                <Input type="file" id="image" name="image" required />
                {error.image && <div className="text-destructive">{error.image}</div>}
            </div>
            <SubmitButton />
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save"}
        </Button>
    )
}