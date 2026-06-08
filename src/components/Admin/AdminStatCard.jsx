function Icon({ name, className = "" }) {
    return (
        <span
            className={`inline-flex items-center leading-none select-none ${className}`}
            style={{ fontFamily: "Material Symbols Outlined", fontVariationSettings: "'FILL' 0" }}
        >
            {name}
        </span>
    );
}

export default function AdminStatCard({ icon, label, value, change, up }) {
    return (
        <div className="bg-[#161b27] rounded-2xl border border-white/5 px-4 md:px-5 py-4 flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                <Icon name={icon} className="text-[20px] text-[#fc8a40]" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-[11px] text-white/35 font-semibold uppercase tracking-wide mb-0.5 truncate">
                    {label}
                </div>
                <div className="text-[18px] md:text-[22px] font-extrabold text-white leading-tight"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {value}
                </div>
            </div>
            <div className={`text-[11px] font-bold px-2 py-1 rounded-lg flex-shrink-0
                ${up ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
                {change}
            </div>
        </div>
    );
}