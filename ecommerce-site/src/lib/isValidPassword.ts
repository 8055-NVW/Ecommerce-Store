import { hash } from "crypto";

export async function isValidPassword(password: string, hashedPassword: string) {
    //? We are using a fake hashing function to compare the password

    // console.log(await hashPassword(password))
    return await hashPassword(password) === hashedPassword;
}

async function hashPassword(password: string) {
    //? This is a fake hashing function
    const arrayBuffer = await crypto.subtle.digest("SHA-512", 
        new TextEncoder().encode(password)
    )

    return Buffer.from(arrayBuffer).toString("base64");
}

