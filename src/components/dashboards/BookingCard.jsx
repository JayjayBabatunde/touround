import Icon from "../destinations/Icon";
import StatusPill from "./StatusPill";
import { formatDate, daysUntil } from "./dashboardData";


export default function BookingCard({ booking, style }) {
    const upcoming = booking.status === "confirmed";
    const days = upcoming ? daysUntil(booking.checkIn) : null;
    function parseDate(value) {
        if (!value) return null;
        // Firestore Timestamp
        if (typeof value?.toDate === "function") return value.toDate();
        // plain string like "2025-08-14"
        return new Date(value);
    }

    return (
        <div
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col sm:flex-row"
            style={style}
        >
            <div className="relative w-full sm:w-36 h-32 sm:h-auto flex-shrink-0 overflow-hidden">
                <img
                    src={booking.img}
                    alt={booking.Destination}
                    className="w-full h-full object-cover"
                />
                {upcoming && days > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-[#00327d]/80 backdrop-blur-sm text-white text-center py-1.5">
                        <div
                            className="text-[18px] font-extrabold leading-none"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            {days}
                        </div>
                        <div className="text-[9px] font-bold tracking-widest uppercase opacity-80">days away</div>
                    </div>
                )}
            </div>

            <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                        <p className="flex items-center gap-1 text-[12px] text-orange-500 uppercase font-bold mt-0.5">{booking.continent}</p>
                        <div
                            className="text-[16px] font-extrabold text-gray-900"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            {booking.destination}
                        </div>
                        <div className="flex items-center gap-1 text-[12px] text-gray-400 mt-0.5">
                            <Icon name="location_on" className="text-[13px]" />
                            {booking.country}
                        </div>
                        <div className="flex items-center gap-1 text-[12px] text-gray-400 mt-0.5">
                            <Icon name="house" className="text-[13px]" />
                            {booking.roomType}
                        </div>
                        <div className="flex items-center gap-1 text-[12px] text-gray-400 mt-0.5">
                            <Icon name="person" className="text-[13px]" />
                            {booking.customer}
                        </div>
                        <div className="flex items-center gap-1 text-[12px] text-gray-400 mt-0.5">
                            <span>Special Requests:</span>
                            <p>{booking.specialRequests || 'None'}</p>
                        </div>
                    </div>
                    <StatusPill status={booking.status} />
                </div>

                <div className="flex items-end justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex gap-4 text-[12px] text-gray-500">
                        <span className="flex items-center gap-1">
                            <Icon name="calendar_month" className="text-[13px]" />
                            {formatDate(parseDate(booking.checkIn))} — {formatDate(parseDate(booking.checkOut))}
                        </span>
                        <span className="flex items-center gap-1">
                            <Icon name="group" className="text-[13px]" />
                            {booking.travellers}
                        </span>
                        <span className="flex items-center gap-1">
                            <Icon name="nights_stay" className="text-[13px]" />
                            {booking.nights}n
                        </span>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <div
                            className="text-[14px] font-extrabold text-[#00327d]"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            ${booking.total.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-gray-400">{booking.id}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}