import { useNavigate } from "react-router-dom";

const NAV = [
    { id: "overview", label: "Overview", icon: "grid_view" },
    { id: "bookings", label: "Bookings", icon: "confirmation_number" },
    { id: "users", label: "Users", icon: "group" },
];


function Icon({ name, fill = false, className = "" }) {
    return (
        <span
            className={`inline-flex items-center leading-none select-none ${className}`}
            style={{ fontFamily: "Material Symbols Outlined", fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0" }}
        >
            {name}
        </span>
    );
}

export default function AdminSidebar({ active, onSelect }) {
    const navigate = useNavigate();

    return (
        <aside className="w-[220px] flex-shrink-0 flex flex-col bg-[#0f1117] border-r border-white/5 min-h-screen">

            <div className="h-[60px] flex items-center px-5 border-b border-white/5 gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#fc8a40] flex items-center justify-center flex-shrink-0">
                    <Icon name="travel_explore" className="text-[15px] text-white" />
                </div>
                <span className="text-[15px] font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    VG Admin
                </span>
            </div>

            <nav className="flex flex-col gap-0.5 p-3 flex-1">
                <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest px-3 py-2 mt-1">
                    Menu
                </p>
                {NAV.map((item) => {
                    const isActive = active === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onSelect(item.id)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold
                                text-left transition-all duration-150 w-full
                                ${isActive ? "bg-white/10 text-white" : "text-white/45 hover:bg-white/5 hover:text-white/80"}`}
                            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                        >
                            <Icon name={item.icon} fill={isActive} className={`text-[18px] ${isActive ? "text-[#fc8a40]" : ""}`} />
                            {item.label}

                        </button>
                    );
                })}
            </nav>

            <div className="p-3 border-t border-white/5">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl
                        text-[12px] font-semibold text-white/35 hover:text-white/70
                        hover:bg-white/5 transition-all duration-150 text-left"
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                >
                    <Icon name="arrow_back" className="text-[16px]" />
                    Back to site
                </button>
            </div>
        </aside>
    );
}