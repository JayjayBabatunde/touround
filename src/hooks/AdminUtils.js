
export function formatDate(iso) {
    return new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export function formatCurrency(n) {
    return "$" + n.toLocaleString();
}

export function statusClasses(status) {
    switch (status) {
        case "confirmed": return { bg: "bg-emerald-500/15", text: "text-emerald-400", dot: "bg-emerald-400" };
        case "pending": return { bg: "bg-amber-500/15", text: "text-amber-400", dot: "bg-amber-400" };
        case "cancelled": return { bg: "bg-red-500/15", text: "text-red-400", dot: "bg-red-400" };
        case "active": return { bg: "bg-emerald-500/15", text: "text-emerald-400", dot: "bg-emerald-400" };
        case "suspended": return { bg: "bg-red-500/15", text: "text-red-400", dot: "bg-red-400" };
        default: return { bg: "bg-gray-500/15", text: "text-gray-400", dot: "bg-gray-400" };
    }
}

export function cap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}