import { useState, useEffect } from "react";
import AdminStatCard from "./AdminStatCard";
import { getAllBookings, getAllUsers } from "../../../firebase/Bookings";
import { formatCurrency, statusClasses, cap } from "../../hooks/AdminUtils";

function StatusPill({ status }) {
    const s = statusClasses(status);
    return (
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {cap(status)}
        </span>
    );
}

function ActionItem({ icon, label, count, color }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-[12px] text-white/50">
                <span
                    className={`inline-flex items-center leading-none text-[16px] ${color}`}
                    style={{ fontFamily: "Material Symbols Outlined", fontVariationSettings: "'FILL' 0" }}
                >
                    {icon}
                </span>
                {label}
            </div>
            <span className={`text-[12px] font-extrabold ${color}`}>{count}</span>
        </div>
    );
}

export default function OverviewView() {
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getAllBookings(), getAllUsers()])
            .then(([b, u]) => { setBookings(b); setUsers(u); })
            .finally(() => setLoading(false));
    }, []);

    const confirmed = bookings.filter((b) => b.status === "confirmed");
    const pending = bookings.filter((b) => b.status === "pending");
    const revenue = bookings.reduce((sum, b) => sum + (b.total ?? 0), 0);
    const recent = bookings.slice(0, 5);

    const STATS = [
        { id: 1, icon: "payments", label: "Total Revenue", value: formatCurrency(revenue), change: "+12.4%", up: true },
        { id: 2, icon: "confirmation_number", label: "Total Bookings", value: bookings.length, change: "+8.1%", up: true },
        { id: 3, icon: "group", label: "Registered Users", value: users.length, change: "+19.3%", up: true },
    ];

    if (loading) return (
        <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 rounded-full border-4 border-[#fc8a40] border-t-transparent animate-spin" />
        </div>
    );

    return (
        <div className="flex flex-col gap-6">
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {STATS.map((s) => <AdminStatCard key={s.id} {...s} />)}
            </div>

            {/* Needs action */}
            <div className="bg-[#161b27] rounded-2xl border border-white/5 p-5">
                <div className="text-[13px] font-extrabold text-white mb-4"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Needs action
                </div>
                <div className="flex flex-col gap-3">
                    <ActionItem icon="confirmation_number" label="Pending bookings" count={pending.length} color="text-amber-400" />
                    <ActionItem icon="check_circle" label="Confirmed" count={confirmed.length} color="text-emerald-400" />
                    <ActionItem icon="person_add" label="Total users" count={users.length} color="text-blue-400" />
                    <ActionItem icon="payments" label="Total revenue" count={formatCurrency(revenue)} color="text-purple-400" />
                </div>
            </div>

            {/* Recent bookings */}
            <div className="bg-[#161b27] rounded-2xl border border-white/5 overflow-hidden">
                <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                    <div className="text-[13px] font-extrabold text-white"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Recent bookings
                    </div>
                    <span className="text-[11px] text-white/35">Last 5</span>
                </div>

                {recent.length === 0 ? (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-[13px] text-white/30">No bookings yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[480px]">
                            <thead>
                                <tr className="border-b border-white/5">
                                    {["Reference", "Customer", "Destination", "Total", "Status"].map((h) => (
                                        <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-white/30 uppercase tracking-widest whitespace-nowrap">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {recent.map((b) => (
                                    <tr key={b.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="px-5 py-3 text-[12px] font-mono text-white/50 whitespace-nowrap">
                                            {b.ref ?? b.id.slice(0, 10).toUpperCase()}
                                        </td>
                                        <td className="px-5 py-3 text-[13px] font-semibold text-white whitespace-nowrap">
                                            {b.customer ?? b.userId?.slice(0, 8)}
                                        </td>
                                        <td className="px-5 py-3 text-[13px] text-white/60 whitespace-nowrap">
                                            {b.destination}
                                        </td>
                                        <td className="px-5 py-3 text-[13px] font-bold text-white whitespace-nowrap">
                                            {formatCurrency(b.total ?? 0)}
                                        </td>
                                        <td className="px-5 py-3">
                                            <StatusPill status={b.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}