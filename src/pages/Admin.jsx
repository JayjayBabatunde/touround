import { useState, useEffect } from "react";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminTopBar from "../components/Admin/AdminTopBar";
import OverviewView from "../components/Admin/OverviewView";
import { getAllBookings, getAllUsers, updateBookingStatus, updateUserRole } from "../../firebase/Bookings";
import { formatCurrency, formatDate, statusClasses, cap } from "../hooks/AdminUtils";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Be+Vietnam+Pro:wght@400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
`;

const BOOKING_STATUSES = ["confirmed", "pending", "completed", "cancelled"];

function StatusPill({ status }) {
    const s = statusClasses(status);
    return (
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {cap(status)}
        </span>
    );
}

function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 rounded-full border-4 border-[#fc8a40] border-t-transparent animate-spin" />
        </div>
    );
}

function BookingsView() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null); // bookingId being updated

    useEffect(() => {
        getAllBookings().then(setBookings).finally(() => setLoading(false));
    }, []);

    async function handleStatusChange(bookingId, newStatus) {
        setUpdating(bookingId);
        try {
            await updateBookingStatus(bookingId, newStatus);
            setBookings((prev) =>
                prev.map((b) => b.id === bookingId ? { ...b, status: newStatus } : b)
            );
        } finally {
            setUpdating(null);
        }
    }

    if (loading) return <LoadingSpinner />;

    return (
        <div className="bg-[#161b27] rounded-2xl border border-white/5 overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="text-[13px] font-extrabold text-white">All bookings</div>
                <span className="text-[11px] text-white/35">{bookings.length} total</span>
            </div>
            {bookings.length === 0 ? (
                <div className="flex items-center justify-center py-16">
                    <p className="text-[13px] text-white/30">No bookings yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead>
                            <tr className="border-b border-white/5">
                                {["Reference", "Customer", "Destination", "Check In", "Total", "Status", "Action"].map((h) => (
                                    <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-white/30 uppercase tracking-widest whitespace-nowrap">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((b) => (
                                <tr key={b.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                    <td className="px-4 py-3 text-[11px] font-mono text-white/50 whitespace-nowrap">
                                        {b.ref ?? b.id.slice(0, 10).toUpperCase()}
                                    </td>
                                    <td className="px-4 py-3 text-[13px] font-semibold text-white whitespace-nowrap">
                                        {b.customer ?? "—"}
                                    </td>
                                    <td className="px-4 py-3 text-[13px] text-white/60 whitespace-nowrap">
                                        {b.destination}
                                    </td>
                                    <td className="px-4 py-3 text-[13px] text-white/60 whitespace-nowrap">
                                        {b.checkIn ? formatDate(b.checkIn) : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-[13px] font-bold text-white whitespace-nowrap">
                                        {formatCurrency(b.total ?? 0)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <StatusPill status={b.status} />
                                    </td>
                                    <td className="px-4 py-3">
                                        <select
                                            value={b.status}
                                            disabled={updating === b.id}
                                            onChange={(e) => handleStatusChange(b.id, e.target.value)}
                                            className="bg-white/5 border border-white/10 text-white/70 text-[11px] font-semibold
                                                rounded-lg px-2 py-1.5 outline-none cursor-pointer
                                                hover:border-white/20 transition-colors disabled:opacity-50"
                                            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                                        >
                                            {BOOKING_STATUSES.map((s) => (
                                                <option key={s} value={s} className="bg-[#161b27]">
                                                    {cap(s)}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

function UsersView() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);

    useEffect(() => {
        getAllUsers().then(setUsers).finally(() => setLoading(false));
    }, []);

    async function handleRoleToggle(userId, currentIsAdmin) {
        setUpdating(userId);
        try {
            await updateUserRole(userId, !currentIsAdmin);
            setUsers((prev) =>
                prev.map((u) => u.id === userId ? { ...u, isAdmin: !currentIsAdmin } : u)
            );
        } finally {
            setUpdating(null);
        }
    }

    if (loading) return <LoadingSpinner />;

    return (
        <div className="bg-[#161b27] rounded-2xl border border-white/5 overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="text-[13px] font-extrabold text-white">Users</div>
                <span className="text-[11px] text-white/35">{users.length} users</span>
            </div>
            {users.length === 0 ? (
                <div className="flex items-center justify-center py-16">
                    <p className="text-[13px] text-white/30">No users yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[540px]">
                        <thead>
                            <tr className="border-b border-white/5">
                                {["Name", "Email", "Joined", "Role", "Action"].map((h) => (
                                    <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-white/30 uppercase tracking-widest whitespace-nowrap">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                    <td className="px-4 py-3 text-[13px] font-semibold text-white whitespace-nowrap">
                                        {u.firstName} {u.lastName}
                                    </td>
                                    <td className="px-4 py-3 text-[13px] text-white/60 whitespace-nowrap">
                                        {u.email}
                                    </td>
                                    <td className="px-4 py-3 text-[13px] text-white/60 whitespace-nowrap">
                                        {u.joined?.seconds
                                            ? new Date(u.joined.seconds * 1000).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                                            : "—"}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full
                                            ${u.isAdmin ? "bg-amber-500/20 text-amber-400" : "bg-white/5 text-white/40"}`}>
                                            {u.isAdmin ? "Admin" : "User"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleRoleToggle(u.id, u.isAdmin)}
                                            disabled={updating === u.id}
                                            className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all duration-150 disabled:opacity-50
                                                ${u.isAdmin
                                                    ? "border-red-500/30 text-red-400 hover:bg-red-500/10"
                                                    : "border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                                                }`}
                                            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                                        >
                                            {updating === u.id ? "…" : u.isAdmin ? "Remove admin" : "Make admin"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default function AdminPage() {
    const [active, setActive] = useState("overview");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-[#0b0c10] text-white">
            <style>{GLOBAL_STYLES}</style>

            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)} />
            )}

            <div className={`fixed lg:static inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
                <AdminSidebar active={active} onSelect={(id) => { setActive(id); setSidebarOpen(false); }} />
            </div>

            <div className="flex-1 flex flex-col min-w-0">
                <AdminTopBar active={active} onMenuClick={() => setSidebarOpen((o) => !o)} />
                <main className="p-4 md:p-6 flex-1 overflow-auto">
                    {active === "overview" && <OverviewView />}
                    {active === "bookings" && <BookingsView />}
                    {active === "users" && <UsersView />}
                </main>
            </div>
        </div>
    );
}