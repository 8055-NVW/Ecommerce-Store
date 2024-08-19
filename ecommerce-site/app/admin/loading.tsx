import { Loader2 } from "lucide-react";

export default function AdminLoading() {
    return (
        <div className="h-screen flex justify-center items-center">
            <Loader2 className="size-24 animate-spin" />
        </div>
    )
}