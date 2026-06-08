import { useState, useEffect } from "react";
import BookingCard from "./BookingCard";
import { useAuth } from "../../hooks/useAuth";
import { getUserBookings } from "../../../firebase/Bookings";

const FILTERS = [
    { value: "all", label: "All" },
    { value: "confirmed", label: "Upcoming" },
    { value: "completed", label: "Completed" },
];

export default function BookingsView() {
    const { user } = useAuth();
    const [filter, setFilter] = useState("all");
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        getUserBookings(user.uid).then((data) => {
            setBookings(data);
            setLoading(false);
        });
    }, [user]);

    const filtered = filter === "all"
        ? bookings
        : bookings.filter((b) => b.status === filter);

    if (loading) return (
        <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 rounded-full border-4 border-[#00327d] border-t-transparent animate-spin" />
        </div>
    );

    return (
        <div className="flex flex-col gap-5" style={{ animation: "slideUp .3s ease both" }}>
            <div className="flex gap-2 flex-wrap">
                {FILTERS.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => setFilter(f.value)}
                        className={`px-4 py-1.5 rounded-full text-[12px] font-bold border transition-all duration-150
                            ${filter === f.value
                                ? "bg-[#00327d] text-white border-[#00327d]"
                                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                            }`}
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-2xl">🗺️</span>
                    </div>
                    <p className="text-[14px] font-semibold text-gray-500">No bookings yet.</p>
                    <p className="text-[12px] text-gray-400">
                        {filter === "all"
                            ? "Start exploring destinations to make your first booking."
                            : `No ${filter} bookings found.`}
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {filtered.map((b, i) => (
                        <BookingCard
                            key={b.id}
                            booking={b}
                            style={{ animation: `slideUp .3s ease ${i * 0.07}s both` }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}