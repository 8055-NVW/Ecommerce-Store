"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { redirect } from "next/navigation"


const fileSchema = z.instanceof(File, { message: "File is required" })
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const addSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.coerce.number().int().min(1),
    file: fileSchema.refine(file => file.size > 0, "Required"),
    image: imageSchema.refine(file => file.size > 0, "Required"),
})

export async function addProduct(prevState: unknown, formData: FormData) {
   const result =  addSchema.safeParse(Object.fromEntries(formData.entries()))
   if (result.success === false) {
    return result.error.formErrors.fieldErrors
   }

   const data = result.data

   await fs.mkdir("products", { recursive: true })
//below we are creating a unique file name for the file so there are never any co0nflicts
   const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
// Next we save the file. We convert out file into a buffer with the arrayBuffer method and then write it to the file system
   await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

//    We want to save out images inside of a public folder so that they can be accessed by the application
   await fs.mkdir("public/products", { recursive: true })
   const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
   await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

   await db.product.create({data: {
         availability: false,
         name: data.name,
         description: data.description,
         price: data.price,
         filePath, 
         imagePath, 
   }})

   redirect("/admin/products")
}