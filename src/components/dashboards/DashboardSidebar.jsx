import { useNavigate } from "react-router-dom";
import Icon from "../destinations/Icon";
import { useAuth } from "../../hooks/useAuth";
import { initials } from "./dashboardData";
import { logoutUser } from "../../../firebase/Auth";

const NAV_ITEMS = [
    { id: "overview", label: "Overview", icon: "grid_view" },
    { id: "bookings", label: "My Bookings", icon: "confirmation_number" },
    { id: "account", label: "Account", icon: "manage_accounts" },
];

export default function DashboardSidebar({ active, onSelect }) {
    const navigate = useNavigate();
    const { profile } = useAuth();

    async function handleLogout() {
        await logoutUser();
        navigate("/auth");
    }

    // Fallback while profile loads
    const firstName = profile?.firstName ?? "…";
    const lastName = profile?.lastName ?? "";
    const email = profile?.email ?? "";

    return (
        <div className="flex h-full flex-col w-full">
            <div className="h-[60px] flex items-center px-6 border-b border-gray-100 flex-shrink-0">
                <button
                    onClick={() => navigate("/")}
                    className="text-[18px] font-extrabold text-[#00327d]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    VentureGlobal
                </button>
            </div>

            <nav className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item.id)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold
                            transition-all duration-150 text-left w-full
                            ${active === item.id
                                ? "bg-[#00327d] text-white"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                            }`}
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                    >
                        <Icon name={item.icon} fill={active === item.id} className="text-[18px]" />
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* User strip */}
            <div className="p-3 border-t border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-2.5 px-3 py-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#00327d] flex items-center justify-center
                        text-white text-[11px] font-bold flex-shrink-0">
                        {firstName !== "…" ? initials(firstName, lastName || " ") : "…"}
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-[12px] font-bold text-gray-800 truncate">
                            {firstName} {lastName}
                        </div>
                        <div className="text-[10px] text-gray-400 truncate">{email}</div>
                    </div>
                    {/* Logout button */}
                    <button
                        onClick={handleLogout}
                        title="Sign out"
                        className="text-gray-400 hover:text-red-400 transition-colors flex-shrink-0"
                    >
                        <Icon name="logout" className="text-[16px]" />
                    </button>
                </div>
            </div>
        </div>
    );
}