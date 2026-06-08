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

const PAGE_TITLES = {
    overview: "Overview",
    bookings: "Bookings",
    users: "Users",
    destinations: "Destinations",
};

export default function AdminTopBar({ active, onMenuClick }) {
    return (
        <div className="h-[60px] bg-[#0f1117] border-b border-white/5 flex items-center justify-between px-4 md:px-7 flex-shrink-0">
            <div className="flex items-center gap-3">
                <button
                    className="lg:hidden flex flex-col gap-[5px] p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                    onClick={onMenuClick}
                    aria-label="Open menu"
                >
                    {[0, 1, 2].map(i => (
                        <span key={i} className="block w-[18px] h-[2px] rounded bg-white/50" />
                    ))}
                </button>

                <h1 className="text-[15px] md:text-[16px] font-extrabold text-white"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {PAGE_TITLES[active] ?? "Admin"}
                </h1>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
                <button className="relative w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-150">
                    <Icon name="notifications" className="text-[18px] text-white/50" />
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#fc8a40]" />
                </button>

                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#fc8a40] flex items-center justify-center text-white text-[12px] font-extrabold"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        A
                    </div>

                    <div className="hidden sm:block">
                        <div className="text-[12px] font-bold text-white leading-tight">Admin</div>
                        <div className="text-[10px] text-white/35">Super admin</div>
                    </div>
                </div>
            </div>
        </div>
    );
}