import { useState } from "react";
import Icon from "../destinations/Icon";
import { COUNTRIES } from "../../data/BookingConstants";

function FieldInput({ label, value, onChange, placeholder, type = "text", icon, required }) {
    const [focused, setFocused] = useState(false);
    return (
        <div>
            <label
                className="block text-[12px] font-semibold text-gray-600 mb-1.5"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
                {label}
                {required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
            <div
                className={`flex items-center gap-2.5 bg-gray-50 rounded-xl px-3.5 py-2.5 border transition-all duration-200
          ${focused ? "border-[#00327d] bg-white shadow-sm shadow-blue-900/8" : "border-gray-200"}`}
            >
                {icon && <Icon name={icon} className={`text-[15px] flex-shrink-0 ${focused ? "text-[#00327d]" : "text-gray-400"}`} />}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent text-[13px] text-gray-800 outline-none placeholder:text-gray-400 min-w-0"
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                />
            </div>
        </div>
    );
}

function SelectInput({ label, value, onChange, options, icon, required }) {
    const [focused, setFocused] = useState(false);
    return (
        <div>
            <label
                className="block text-[12px] font-semibold text-gray-600 mb-1.5"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
                {label}
                {required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
            <div
                className={`flex items-center gap-2.5 bg-gray-50 rounded-xl px-3.5 py-2.5 border transition-all duration-200
          ${focused ? "border-[#00327d] bg-white shadow-sm shadow-blue-900/8" : "border-gray-200"}`}
            >
                {icon && <Icon name={icon} className={`text-[15px] flex-shrink-0 ${focused ? "text-[#00327d]" : "text-gray-400"}`} />}
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="flex-1 bg-transparent text-[13px] text-gray-800 outline-none appearance-none min-w-0"
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                >
                    <option value="">Select…</option>
                    {options.map((o) => (
                        <option key={o} value={o}>{o}</option>
                    ))}
                </select>
                <Icon name="expand_more" className="text-gray-400 text-[15px] flex-shrink-0 pointer-events-none" />
            </div>
        </div>
    );
}

function TravellerCard({ index, traveller, onChange, isLead }) {
    const [expanded, setExpanded] = useState(index === 0);

    function update(field, value) {
        onChange(index, { ...traveller, [field]: value });
    }

    const filled = traveller.firstName && traveller.lastName && traveller.dob && traveller.passport;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
                <div className="flex items-center gap-3">
                    <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-[14px]
              ${filled ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-500"}`}
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        {filled
                            ? <Icon name="check" className="text-[16px]" />
                            : index + 1
                        }
                    </div>
                    <div>
                        <div
                            className="text-[14px] font-bold text-gray-800"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            {isLead ? "Lead Traveller" : `Traveller ${index + 1}`}
                            {isLead && (
                                <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00327d] text-white">
                                    Primary
                                </span>
                            )}
                        </div>
                        <div className="text-[12px] text-gray-400">
                            {traveller.firstName
                                ? `${traveller.firstName} ${traveller.lastName}`
                                : "Not yet filled in"}
                        </div>
                    </div>
                </div>
                <Icon
                    name="expand_more"
                    className={`text-gray-400 text-xl transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                />
            </button>

            {expanded && (
                <div className="px-5 pb-5 flex flex-col gap-4 border-t border-gray-100 pt-4"
                    style={{ animation: "slideDown .25s ease both" }}>

                    <div className="grid grid-cols-2 gap-3">
                        <FieldInput
                            label="First name"
                            value={traveller.firstName}
                            onChange={(v) => update("firstName", v)}
                            placeholder="Jane"
                            icon="person"
                            required
                        />
                        <FieldInput
                            label="Last name"
                            value={traveller.lastName}
                            onChange={(v) => update("lastName", v)}
                            placeholder="Smith"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <SelectInput
                            label="Gender"
                            value={traveller.gender}
                            onChange={(v) => update("gender", v)}
                            options={["Female", "Male", "Non-binary", "Prefer not to say"]}
                            icon="wc"
                            required
                        />
                        <FieldInput
                            label="Date of birth"
                            type="date"
                            value={traveller.dob}
                            onChange={(v) => update("dob", v)}
                            icon="cake"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <SelectInput
                            label="Nationality"
                            value={traveller.nationality}
                            onChange={(v) => update("nationality", v)}
                            options={COUNTRIES}
                            icon="flag"
                            required
                        />
                        <FieldInput
                            label="Passport number"
                            value={traveller.passport}
                            onChange={(v) => update("passport", v)}
                            placeholder="AB1234567"
                            icon="badge"
                            required
                        />
                    </div>

                    <FieldInput
                        label="Passport expiry date"
                        type="date"
                        value={traveller.passportExpiry}
                        onChange={(v) => update("passportExpiry", v)}
                        icon="event_busy"
                    />

                    {isLead && (
                        <>
                            <div className="h-px bg-gray-100" />
                            <div className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">Contact details</div>
                            <FieldInput
                                label="Email address"
                                type="email"
                                value={traveller.email}
                                onChange={(v) => update("email", v)}
                                placeholder="jane@example.com"
                                icon="mail"
                                required
                            />
                            <FieldInput
                                label="Phone number"
                                type="tel"
                                value={traveller.phone}
                                onChange={(v) => update("phone", v)}
                                placeholder="+1 555 000 1234"
                                icon="phone"
                                required
                            />
                            <SelectInput
                                label="Emergency contact country"
                                value={traveller.emergencyCountry}
                                onChange={(v) => update("emergencyCountry", v)}
                                options={COUNTRIES}
                                icon="emergency"
                            />
                            <FieldInput
                                label="Emergency contact name"
                                value={traveller.emergencyName}
                                onChange={(v) => update("emergencyName", v)}
                                placeholder="Full name"
                                icon="contact_phone"
                            />
                            <FieldInput
                                label="Emergency contact phone"
                                type="tel"
                                value={traveller.emergencyPhone}
                                onChange={(v) => update("emergencyPhone", v)}
                                placeholder="+1 555 000 5678"
                                icon="phone_forwarded"
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
}


export default function TravellersStep({ booking, onChange, onNext, onBack }) {

    const count = booking.travellers;
    const list = Array.from({ length: count }, (_, i) => booking.travellerDetails[i] ?? emptyTraveller());

    function updateTraveller(index, updated) {
        const next = [...list];
        next[index] = updated;
        onChange("travellerDetails", next);
    }

    const lead = list[0];
    const leadOk = lead?.firstName && lead?.lastName && lead?.dob && lead?.passport
        && lead?.email && lead?.phone && lead?.gender && lead?.nationality;

    return (
        <div className="flex flex-col gap-6" style={{ animation: "slideUp .35s ease both" }}>
            <div className="flex items-start gap-3 bg-blue-50 rounded-2xl px-4 py-3.5 border border-blue-100">
                <Icon name="info" className="text-[#00327d] text-[18px] flex-shrink-0 mt-0.5" />
                <p className="text-[13px] text-[#00327d] leading-relaxed">
                    Please ensure all names match exactly as they appear on passports.
                    Incorrect details may affect check-in or entry to your destination.
                </p>
            </div>

            {list.map((t, i) => (
                <TravellerCard
                    key={i}
                    index={i}
                    traveller={t}
                    onChange={updateTraveller}
                    isLead={i === 0}
                />
            ))}

            <div className="flex gap-3">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-gray-200
            text-[14px] font-bold text-gray-600 bg-white hover:border-gray-300
            transition-all duration-200 active:scale-95"
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                >
                    <Icon name="arrow_back" className="text-lg" />
                    Back
                </button>
                <button
                    onClick={onNext}
                    disabled={!leadOk}
                    className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl
            text-[15px] font-bold text-white transition-all duration-200
            ${leadOk
                            ? "bg-[#fc8a40] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-300/50 active:scale-95"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                >
                    <span>Continue to Payment</span>
                    <Icon name="arrow_forward" className="text-lg" />
                </button>
            </div>
        </div>
    );
}

function emptyTraveller() {
    return {
        firstName: "", lastName: "", gender: "", dob: "",
        nationality: "", passport: "", passportExpiry: "",
        email: "", phone: "", emergencyCountry: "", emergencyName: "", emergencyPhone: "",
    };
}