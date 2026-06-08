import { useState } from "react";
import Icon from "../destinations/Icon";
import { ROOM_OPTIONS, ADD_ONS } from "../../data/BookingConstants";

function FormLabel({ children, hint }) {
    return (
        <div className="flex items-center justify-between mb-1.5">
            <label
                className="text-[13px] font-semibold text-gray-700"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
                {children}
            </label>
            {hint && <span className="text-[11px] text-gray-400">{hint}</span>}
        </div>
    );
}

function DateInput({ label, value, onChange, min }) {
    const [focused, setFocused] = useState(false);
    return (
        <div>
            <FormLabel>{label}</FormLabel>
            <div
                className={`flex items-center gap-2 bg-gray-50 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border transition-all duration-200
                    ${focused ? "border-[#00327d] bg-white shadow-sm shadow-blue-900/10" : "border-gray-200"}`}
            >
                <Icon name="calendar_month" className={`text-base sm:text-lg flex-shrink-0 ${focused ? "text-[#00327d]" : "text-gray-400"}`} />
                <input
                    type="date"
                    value={value}
                    min={min}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="flex-1 bg-transparent text-[12px] sm:text-[14px] text-gray-800 outline-none min-w-0 w-full"
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                />
            </div>
        </div>
    );
}

function RoomCard({ room, selected, onSelect }) {
    return (
        <div
            onClick={() => onSelect(room.id)}
            className={`relative flex flex-col gap-2 p-3 sm:p-4 rounded-2xl border-2 cursor-pointer
                transition-all duration-200 hover:-translate-y-0.5
                ${selected
                    ? "border-[#00327d] bg-blue-50/60 shadow-md shadow-blue-900/10"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
        >
            {selected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#00327d] flex items-center justify-center">
                    <Icon name="check" className="text-white text-[11px]" />
                </div>
            )}
            <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center ${selected ? "bg-[#00327d]" : "bg-gray-100"}`}>
                    <Icon name={room.icon} className={`text-base sm:text-lg ${selected ? "text-white" : "text-gray-400"}`} />
                </div>
                <div>
                    <div className={`text-[13px] sm:text-[14px] font-bold ${selected ? "text-[#00327d]" : "text-gray-800"}`}
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {room.label}
                    </div>
                    {room.priceModifier > 0 && (
                        <div className="text-[10px] sm:text-[11px] font-semibold text-[#fc8a40]">
                            +${room.priceModifier}/person
                        </div>
                    )}
                    {room.priceModifier === 0 && (
                        <div className="text-[10px] sm:text-[11px] font-semibold text-emerald-600">Included</div>
                    )}
                </div>
            </div>
            <p className="text-[11px] sm:text-[12px] text-gray-500 leading-relaxed">{room.desc}</p>
            <div className="flex flex-col gap-1 mt-1">
                {room.features.map((f) => (
                    <div key={f} className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-gray-500">
                        <Icon name="check_circle" className="text-[12px] sm:text-[13px] text-emerald-500 flex-shrink-0" />
                        {f}
                    </div>
                ))}
            </div>
        </div>
    );
}

function AddOnToggle({ addon, selected, onToggle }) {
    return (
        <div
            onClick={() => onToggle(addon.id)}
            className={`flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl border cursor-pointer transition-all duration-200
                ${selected ? "border-[#00327d] bg-blue-50/60" : "border-gray-200 bg-white hover:border-gray-300"}`}
        >
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${selected ? "bg-[#00327d]" : "bg-gray-100"}`}>
                <Icon name={addon.icon} className={`text-[13px] sm:text-[15px] ${selected ? "text-white" : "text-gray-400"}`} />
            </div>
            <div className="flex-1 min-w-0">
                <div className={`text-[12px] sm:text-[13px] font-bold truncate ${selected ? "text-[#00327d]" : "text-gray-700"}`}>
                    {addon.label}
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#fc8a40] font-semibold">+${addon.price}</div>
            </div>
            <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
                ${selected ? "bg-[#00327d] border-[#00327d]" : "border-gray-300"}`}>
                {selected && <Icon name="check" className="text-white text-[9px] sm:text-[10px]" />}
            </div>
        </div>
    );
}

export default function TripDetailsStep({ booking, onChange, onNext }) {
    const today = new Date().toISOString().split("T")[0];
    const canProceed = booking.checkIn && booking.checkOut && booking.checkIn < booking.checkOut;

    function toggleAddOn(id) {
        const current = booking.addOns;
        onChange(
            "addOns",
            current.includes(id) ? current.filter((a) => a !== id) : [...current, id]
        );
    }

    return (
        <div className="flex flex-col gap-6 sm:gap-7" style={{ animation: "slideUp .35s ease both" }}>
            <Section title="Select your dates" icon="event">
                {/* Stack on mobile, side by side on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <DateInput
                        label="Check-in"
                        value={booking.checkIn}
                        min={today}
                        onChange={(v) => onChange("checkIn", v)}
                    />
                    <DateInput
                        label="Check-out"
                        value={booking.checkOut}
                        min={booking.checkIn || today}
                        onChange={(v) => onChange("checkOut", v)}
                    />
                </div>
                {booking.checkIn && booking.checkOut && booking.checkIn >= booking.checkOut && (
                    <p className="text-[12px] text-red-500 flex items-center gap-1.5 mt-2">
                        <Icon name="error" className="text-[14px]" />
                        Check-out must be after check-in
                    </p>
                )}
            </Section>

            <Section title="Number of travellers" icon="group">
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                    <button
                        onClick={() => onChange("travellers", Math.max(1, booking.travellers - 1))}
                        className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center
                            hover:border-[#00327d] hover:text-[#00327d] transition-all duration-200 active:scale-95 flex-shrink-0"
                    >
                        <Icon name="remove" className="text-lg" />
                    </button>
                    <div className="text-center flex-shrink-0">
                        <div className="text-3xl font-extrabold text-[#00327d]"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {booking.travellers}
                        </div>
                        <div className="text-[11px] text-gray-400">
                            traveller{booking.travellers !== 1 ? "s" : ""}
                        </div>
                    </div>
                    <button
                        onClick={() => onChange("travellers", Math.min(12, booking.travellers + 1))}
                        className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center
                            hover:border-[#00327d] hover:text-[#00327d] transition-all duration-200 active:scale-95 flex-shrink-0"
                    >
                        <Icon name="add" className="text-lg" />
                    </button>
                    <p className="text-[12px] sm:text-[13px] text-gray-500 flex-1 min-w-[160px]">
                        Max 12 per booking. For larger groups,{" "}
                        <button className="text-[#00327d] font-semibold hover:underline">contact us</button>.
                    </p>
                </div>
            </Section>

            <Section title="Choose your accommodation" icon="hotel">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {ROOM_OPTIONS.map((room) => (
                        <RoomCard
                            key={room.id}
                            room={room}
                            selected={booking.roomType === room.id}
                            onSelect={(id) => onChange("roomType", id)}
                        />
                    ))}
                </div>
            </Section>

            <Section title="Enhance your trip" icon="add_circle" hint="Optional">
                {/* 1 col on mobile, 2 on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ADD_ONS.map((a) => (
                        <AddOnToggle
                            key={a.id}
                            addon={a}
                            selected={booking.addOns.includes(a.id)}
                            onToggle={toggleAddOn}
                        />
                    ))}
                </div>
            </Section>

            <Section title="Special requests" icon="chat" hint="Optional">
                <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#00327d] focus-within:bg-white transition-all duration-200">
                    <textarea
                        value={booking.specialRequests}
                        onChange={(e) => onChange("specialRequests", e.target.value)}
                        placeholder="Dietary requirements, accessibility needs, celebration arrangements…"
                        rows={3}
                        className="w-full bg-transparent px-4 py-3 text-[13px] sm:text-[14px] text-gray-800 outline-none placeholder:text-gray-400 resize-none"
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                    />
                </div>
            </Section>

            <button
                onClick={onNext}
                disabled={!canProceed}
                className={`w-full flex items-center justify-center gap-2.5 py-3.5 sm:py-4 rounded-2xl
                    text-[14px] sm:text-[15px] font-bold text-white transition-all duration-200
                    ${canProceed
                        ? "bg-[#fc8a40] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-300/50 active:scale-95"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
                <span>Continue to Traveller Details</span>
                <Icon name="arrow_forward" className="text-lg" />
            </button>
        </div>
    );
}

function Section({ title, icon, hint, children }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="flex items-center gap-2 text-[15px] sm:text-[16px] font-extrabold text-gray-900"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    <Icon name={icon} className="text-[16px] sm:text-[18px] text-[#fc8a40]" />
                    {title}
                </h3>
                {hint && <span className="text-[11px] sm:text-[12px] text-gray-400 font-semibold">{hint}</span>}
            </div>
            {children}
        </div>
    );
}