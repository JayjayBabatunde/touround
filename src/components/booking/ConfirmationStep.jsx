import Icon from "../destinations/Icon";
import { ROOM_OPTIONS, ADD_ONS } from "../../data/BookingConstants";

export default function ConfirmationStep({ destination, booking, bookingRef, onDone }) {
    const d = destination;
    const roomOpt = ROOM_OPTIONS.find((r) => r.id === booking.roomType) ?? ROOM_OPTIONS[0];
    const addOns = ADD_ONS.filter((a) => booking.addOns.includes(a.id));
    const subtotal = (d.price + roomOpt.priceModifier) * booking.travellers
        + addOns.reduce((s, a) => s + a.price, 0);
    const taxes = Math.round(subtotal * 0.08);
    const total = subtotal + taxes;
    const lead = booking.travellerDetails?.[0];

    const nextSteps = [
        { icon: "mail", title: "Confirmation email", desc: `Sent to ${lead?.email || "your email"} within 5 minutes` },
        { icon: "description", title: "Travel documents", desc: "Vouchers & itinerary emailed 7 days before departure" },
        { icon: "luggage", title: "Packing checklist", desc: "Access your personalised list in your account dashboard" },
        { icon: "support_agent", title: "24/7 support", desc: "Our travel experts are always available to help" },
    ];

    return (
        <div className="flex flex-col gap-6 sm:gap-7" style={{ animation: "slideUp .45s ease both" }}>
            {/* Hero */}
            <div className="relative overflow-hidden rounded-3xl">
                <img src={d.img} alt={d.name} className="w-full h-36 sm:h-44 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00327d]/90 via-[#00327d]/40 to-transparent" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center shadow-xl shadow-emerald-500/40">
                        <Icon name="check" className="text-white text-2xl sm:text-3xl" />
                    </div>
                </div>
            </div>

            {/* Heading */}
            <div className="text-center pt-6 sm:pt-8">
                <div className="text-[12px] font-bold tracking-widest uppercase text-emerald-600 mb-2">
                    Booking confirmed
                </div>
                <h2 className="text-[22px] sm:text-[26px] font-extrabold text-gray-900 leading-tight mb-1.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    You're going to {d.name}!
                </h2>
                <p className="text-[13px] sm:text-[14px] text-gray-500 mb-3 px-4">
                    {lead?.firstName ? `Congratulations, ${lead.firstName}! ` : ""}
                    Your adventure is officially booked.
                </p>

                {/* Booking ref */}
                <div className="inline-flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-2xl px-4 sm:px-5 py-3">
                    <Icon name="confirmation_number" className="text-[#fc8a40] text-[18px]" />
                    <div className="text-left">
                        <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Booking reference</div>
                        <div className="text-[15px] sm:text-[17px] font-extrabold text-[#00327d] tracking-wide"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {bookingRef}
                        </div>
                    </div>
                    <button onClick={() => navigator.clipboard?.writeText(bookingRef)}
                        className="ml-1 w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:border-[#00327d] transition-all duration-200">
                        <Icon name="content_copy" className="text-[14px] text-gray-500" />
                    </button>
                </div>
            </div>

            {/* Trip summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                    <h3 className="text-[14px] font-extrabold text-gray-900"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Trip summary</h3>
                </div>
                <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        { icon: "flight_takeoff", label: "Destination", value: `${d.name}, ${d.country}` },
                        { icon: "calendar_month", label: "Check-in", value: booking.checkIn || "—" },
                        { icon: "calendar_month", label: "Check-out", value: booking.checkOut || "—" },
                        { icon: "nights_stay", label: "Duration", value: `${d.nights} nights` },
                        { icon: "group", label: "Travellers", value: `${booking.travellers} guest${booking.travellers !== 1 ? "s" : ""}` },
                        { icon: "hotel", label: "Accommodation", value: roomOpt.label },
                    ].map(({ icon, label, value }) => (
                        <div key={label} className="flex items-start gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Icon name={icon} className="text-[14px] text-[#00327d]" />
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">{label}</div>
                                <div className="text-[13px] font-bold text-gray-800">{value}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-t border-gray-100">
                    <span className="text-[14px] font-extrabold text-gray-900"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Total paid</span>
                    <span className="text-[18px] sm:text-[20px] font-extrabold text-[#00327d]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>${total.toLocaleString()}</span>
                </div>
            </div>


            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => window.print?.()}
                    className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border border-gray-200 text-[13px] font-bold text-gray-600 bg-white hover:border-gray-300 transition-all duration-200 active:scale-95"
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    <Icon name="print" className="text-lg" /> Print
                </button>
                <button className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border border-gray-200 text-[13px] font-bold text-gray-600 bg-white hover:border-gray-300 transition-all duration-200 active:scale-95"
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    <Icon name="share" className="text-lg" /> Share
                </button>
                <button onClick={onDone}
                    className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-[14px] font-bold text-white bg-[#fc8a40] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-300/50 transition-all duration-200 active:scale-95"
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                    <Icon name="explore" className="text-lg" /> Go to Dashboard
                </button>
            </div>
        </div>
    );
}