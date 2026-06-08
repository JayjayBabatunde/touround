const STATUS_MAP = {
    confirmed: { label: "Confirmed", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
    pending: { label: "Pending", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
    completed: { label: "Completed", bg: "bg-gray-100", text: "text-gray-500", dot: "bg-gray-400" },
    cancelled: { label: "Cancelled", bg: "bg-red-50", text: "text-red-600", dot: "bg-red-400" },
};


export default function StatusPill({ status }) {
    const s = STATUS_MAP[status] ?? STATUS_MAP.pending;
    return (
        <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {s.label}
        </span>
    );
}