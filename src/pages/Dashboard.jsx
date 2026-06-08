import { useState } from "react";
import Icon from "../components/destinations/Icon";
import DashboardSidebar from "../components/dashboards/DashboardSidebar";
import OverviewView from "../components/dashboards/OverviewView";
import BookingsView from "../components/dashboards/BookingsView";
import AccountView from "../components/dashboards/AccountView";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Be+Vietnam+Pro:wght@400;500;600&family=Material+Symbols+Outlined:wght,FILL@400,0..1&display=swap');
  @keyframes slideUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
`;

const PAGE_META = {
    bookings: { title: "My Bookings", sub: "All your upcoming and past trips in one place." },
    account: { title: "Account Settings", sub: "Manage your profile and preferences." },
};

export default function DashboardPage({ onBook }) {
    const [tab, setTab] = useState("overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    // ✅ useAuth() called inside the component
    const { profile } = useAuth();
    const firstName = profile?.firstName || "there";

    // Overview title built here where profile is available
    const title = tab === "overview"
        ? `Good morning, ${firstName}!`
        : PAGE_META[tab]?.title;

    const sub = tab === "overview"
        ? "Here's what's happening with your trips."
        : PAGE_META[tab]?.sub;


    function handleTabSelect(t) {
        setTab(t);
        setSidebarOpen(false);
    }

    return (
        <div className="min-h-screen flex bg-[#f7f9fb]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            <style>{GLOBAL_STYLES}</style>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className={`
                fixed md:static inset-y-0 left-0 z-30
                w-[220px] bg-white border-r border-gray-100 flex-shrink-0
                transition-transform duration-300 ease-in-out
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
            `}>
                <DashboardSidebar active={tab} onSelect={handleTabSelect} />
            </div>

            <div className="flex-1 flex flex-col min-w-0">
                <div className="h-[60px] bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 flex-shrink-0">
                    <button
                        className="md:hidden flex flex-col gap-[5px] p-1.5 rounded-lg"
                        onClick={() => setSidebarOpen(o => !o)}
                        aria-label="Open menu"
                    >
                        {[0, 1, 2].map(i => (
                            <span key={i} className="block w-[20px] h-[2px] rounded bg-[#00327d]" />
                        ))}
                    </button>

                    <span
                        className="md:hidden text-[16px] font-extrabold text-[#00327d]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        VentureGlobal
                    </span>

                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-1.5 text-[13px] font-semibold text-[#00327d]
                            bg-blue-50 px-4 py-2 rounded-xl hover:bg-[#00327d] hover:text-white
                            transition-all duration-150"
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                    >
                        <Icon name="travel_explore" className="text-[16px]" />
                        <span className="hidden sm:inline">Explore destinations</span>
                    </button>
                </div>

                <div className="flex-1 px-4 sm:px-6 md:px-8 py-6 md:py-8 overflow-y-auto">
                    <div className="mb-6">
                        <h1
                            className="text-[20px] md:text-[24px] font-extrabold text-gray-900 leading-tight"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            {title}
                        </h1>
                        <p className="text-[13px] text-gray-400 mt-0.5">{sub}</p>
                    </div>

                    {tab === "overview" && <OverviewView onTabChange={setTab} />}
                    {tab === "bookings" && <BookingsView />}
                    {tab === "account" && <AccountView />}
                </div>
            </div>
        </div>
    );
}