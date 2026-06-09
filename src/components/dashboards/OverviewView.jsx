import { useState, useEffect } from "react";
import StatCard from "./Statscard";
import BookingCard from "./BookingCard";
import { useAuth } from "../../hooks/useAuth";
import { getUserBookings } from "../../../firebase/Bookings";

export default function OverviewView() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        getUserBookings(user.uid)
            .then(setBookings)
            .finally(() => setLoading(false));
    }, [user]);

    const upcoming = bookings.filter((b) => b.status === "confirmed");
    const completed = bookings.filter((b) => b.status === "completed");
    const nextTrip = upcoming[0] ?? null;
    const totalSpent = completed.reduce((sum, b) => sum + (b.total ?? 0), 0);

    if (loading) return (
        <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 rounded-full border-4 border-[#00327d] border-t-transparent animate-spin" />
        </div>
    );

    return (
        <div className="flex flex-col gap-6" style={{ animation: "slideUp .3s ease both" }}>
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                <StatCard icon="confirmation_number" label="Upcoming trips" value={upcoming.length} />
                <StatCard icon="check_circle" label="Trips completed" value={completed.length} />
                <StatCard icon="payments" label="Total spent" value={`$${totalSpent.toLocaleString()}`} />
            </div>

            {/* Next trip */}
            {nextTrip ? (
                <div>
                    <h2 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                        Next trip
                    </h2>
                    <BookingCard booking={nextTrip} />
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                    <p className="text-[14px] font-semibold text-gray-500 mb-1">No upcoming trips</p>
                    <p className="text-[12px] text-gray-400">Explore destinations to plan your next adventure.</p>
                </div>
            )}
        </div>
    );
}