// import db from "@/lib/db";


// function getNewestProducts() {
//     return db.product.findMany({ 
//         where : {availability: true}, 
//         orderBy: { orders:{_count: 'desc'}},
//         take: 6
//     });
// }

export default function HomePage() {
    return (
        <>
            <h1>Hi there</h1>
        </>
    )
}