import Icon from "../destinations/Icon";
import { ROOM_OPTIONS, ADD_ONS } from "../../data/BookingConstants";


export default function BookingSummaryCard({ destination, booking }) {
    const d = destination;

    const roomOption = ROOM_OPTIONS.find((r) => r.id === booking.roomType) ?? ROOM_OPTIONS[0];
    const selectedAddOns = ADD_ONS.filter((a) => booking.addOns.includes(a.id));

    const basePrice = d.price * booking.travellers;
    const roomUpgrade = roomOption.priceModifier * booking.travellers;
    const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
    const subtotal = basePrice + roomUpgrade + addOnsTotal;
    const taxRate = 0.08;
    const taxes = Math.round(subtotal * taxRate);
    const total = subtotal + taxes;

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">
            {/* Destination image header */}
            <div className="relative h-36 overflow-hidden">
                <img src={d.img} alt={d.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                    <div className="text-[10px] font-bold tracking-widest uppercase text-white/70 mb-0.5">
                        {d.continent}
                    </div>
                    <div
                        className="text-white text-[17px] font-extrabold"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        {d.name}
                    </div>
                    <div className="flex items-center gap-1 text-white/80 text-[11px] mt-0.5">
                        <Icon name="location_on" className="text-[12px]" />
                        {d.country}
                    </div>
                </div>
                {d.badge && (
                    <div className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-orange-400 text-white">
                        {d.badge}
                    </div>
                )}
            </div>

            <div className="p-5">
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                        { icon: "calendar_month", label: "Check-in", value: booking.checkIn || "—" },
                        { icon: "calendar_month", label: "Check-out", value: booking.checkOut || "—" },
                        { icon: "nights_stay", label: "Nights", value: d.nights },
                    ].map((m) => (
                        <div key={m.label} className="bg-gray-50 rounded-xl p-2.5 text-center">
                            <Icon name={m.icon} className="text-[14px] text-[#fc8a40] block mx-auto mb-1" />
                            <div className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide">{m.label}</div>
                            <div className="text-[12px] font-bold text-gray-800 mt-0.5 truncate">{m.value}</div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between text-[13px] mb-1">
                    <span className="text-gray-500 flex items-center gap-1.5">
                        <Icon name="group" className="text-[15px]" />
                        {booking.travellers} traveller{booking.travellers !== 1 ? "s" : ""}
                    </span>
                    <span className="font-semibold text-gray-700">{roomOption.label}</span>
                </div>

                <div className="flex items-center gap-1.5 text-[12px] text-gray-500 mb-4">
                    <Icon name="star" fill className="text-[14px] text-amber-400" />
                    <span className="font-bold text-gray-800">{d.rating}</span>
                    <span>({d.reviews.toLocaleString()} reviews)</span>
                </div>

                <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
                    <PriceLine
                        label={`$${d.price.toLocaleString()} × ${booking.travellers} traveller${booking.travellers !== 1 ? "s" : ""}`}
                        value={basePrice}
                    />
                    {roomUpgrade > 0 && (
                        <PriceLine label={`${roomOption.label} upgrade`} value={roomUpgrade} />
                    )}
                    {selectedAddOns.map((a) => (
                        <PriceLine key={a.id} label={a.label} value={a.price} />
                    ))}
                    <PriceLine label="Taxes & fees (8%)" value={taxes} muted />

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-1">
                        <span
                            className="text-[15px] font-extrabold text-gray-900"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Total
                        </span>
                        <span
                            className="text-[22px] font-extrabold text-[#00327d]"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            ${total.toLocaleString()}
                        </span>
                    </div>
                    <p className="text-[10px] text-gray-400 text-right">Per booking · All taxes included</p>
                </div>

                {selectedAddOns.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {selectedAddOns.map((a) => (
                            <span
                                key={a.id}
                                className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-[#00327d]"
                            >
                                {a.label}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-4">
                    {[
                        { icon: "lock", text: "Secure payment" },
                        { icon: "autorenew", text: "Free cancellation" },
                    ].map(({ icon, text }) => (
                        <div key={icon} className="flex items-center gap-1.5 text-[11px] text-gray-400">
                            <Icon name={icon} className="text-[13px] text-emerald-500" />
                            {text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function PriceLine({ label, value, muted = false }) {
    return (
        <div className="flex items-center justify-between text-[13px]">
            <span className={muted ? "text-gray-400" : "text-gray-600"}>{label}</span>
            <span className={`font-semibold ${muted ? "text-gray-400" : "text-gray-800"}`}>
                ${value.toLocaleString()}
            </span>
        </div>
    );
}