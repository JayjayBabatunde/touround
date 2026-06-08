import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../destinations/Icon";
import { ROOM_OPTIONS, ADD_ONS } from "../../data/BookingConstants";
import { useAuth } from "../../hooks/useAuth";

function formatCardNumber(value) {
    return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
}

function detectCardType(number) {
    const n = number.replace(/\s/g, "");
    if (/^4/.test(n)) return "visa";
    if (/^5[1-5]/.test(n)) return "mastercard";
    if (/^3[47]/.test(n)) return "amex";
    return null;
}

function CardTypeBadge({ type }) {
    if (!type) return <Icon name="credit_card" className="text-gray-400 text-lg" />;
    const labels = { visa: "VISA", mastercard: "MC", amex: "AMEX" };
    const colors = { visa: "bg-blue-700 text-white", mastercard: "bg-red-600 text-white", amex: "bg-green-700 text-white" };
    return (
        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded ${colors[type]}`}>
            {labels[type]}
        </span>
    );
}

function TextInput({ label, value, onChange, placeholder, type = "text", rightEl, required, maxLength }) {
    const [focused, setFocused] = useState(false);
    return (
        <div>
            <label className="block text-[12px] font-semibold text-gray-600 mb-1.5"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                {label}{required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
            <div className={`flex items-center gap-2 bg-gray-50 rounded-xl px-3.5 py-3 border transition-all duration-200
                ${focused ? "border-[#00327d] bg-white shadow-sm shadow-blue-900/8" : "border-gray-200"}`}>
                <input
                    type={type} value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={placeholder} maxLength={maxLength}
                    className="flex-1 bg-transparent text-[13px] text-gray-800 outline-none placeholder:text-gray-400 min-w-0"
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif", letterSpacing: type === "password" ? "0.1em" : "normal" }}
                />
                {rightEl}
            </div>
        </div>
    );
}

function PaymentMethodPill({ id, label, icon, selected, onSelect }) {
    return (
        <button onClick={() => onSelect(id)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl border text-[12px] sm:text-[13px] font-semibold transition-all duration-200
                ${selected ? "border-[#00327d] bg-blue-50 text-[#00327d]" : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"}`}
            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            <Icon name={icon} className="text-[16px]" />
            {label}
        </button>
    );
}

// ── Auth gate modal ───────────────────────────────────────────────────────────
function AuthGateModal({ onClose }) {
    const navigate = useNavigate();
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ animation: "fadeIn .2s ease both" }}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            {/* Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-7 flex flex-col items-center text-center gap-5"
                style={{ animation: "slideUp .3s ease both" }}>

                {/* Close */}
                <button onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <Icon name="close" className="text-[16px] text-gray-500" />
                </button>

                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-orange-50 border-4 border-orange-100 flex items-center justify-center">
                    <Icon name="lock" className="text-[32px] text-[#fc8a40]" />
                </div>

                {/* Text */}
                <div>
                    <h2 className="text-[20px] font-extrabold text-gray-900 mb-2"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Sign in to continue
                    </h2>
                    <p className="text-[13px] text-gray-500 leading-relaxed">
                        You need to be logged in before making a booking. Create a free account or sign in to proceed with your payment.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2.5 w-full">
                    <button
                        onClick={() => navigate("/auth")}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#fc8a40] text-white text-[14px] font-bold
                            hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-300/50 transition-all duration-200 active:scale-95"
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                        <Icon name="login" className="text-lg" />
                        Sign in to my account
                    </button>
                    <button
                        onClick={() => navigate("/auth?view=signup")}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-[#00327d] text-[#00327d] text-[14px] font-bold
                            hover:bg-blue-50 transition-all duration-200 active:scale-95"
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                        <Icon name="person_add" className="text-lg" />
                        Create a free account
                    </button>
                </div>

                <p className="text-[11px] text-gray-400">
                    Your booking details will be saved after you sign in.
                </p>
            </div>
        </div>
    );
}

export default function PaymentStep({ booking, destination, onChange, onNext, onBack, saving }) {
    const { user } = useAuth();
    const [payMethod, setPayMethod] = useState("card");
    const [cardNumber, setCardNumberRaw] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiry, setExpiryRaw] = useState("");
    const [cvv, setCvv] = useState("");
    const [showCvv, setShowCvv] = useState(false);
    const [billingMatch, setBillingMatch] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [showAuthGate, setShowAuthGate] = useState(false);

    const cardType = detectCardType(cardNumber);
    const canProceed = payMethod === "card"
        ? cardNumber.replace(/\s/g, "").length >= 15 && cardName && expiry.length === 5 && cvv.length >= 3
        : true;

    const roomOpt = ROOM_OPTIONS.find((r) => r.id === booking.roomType) ?? ROOM_OPTIONS[0];
    const addOnsTotal = ADD_ONS.filter((a) => booking.addOns.includes(a.id)).reduce((s, a) => s + a.price, 0);
    const subtotal = (destination.price + roomOpt.priceModifier) * booking.travellers + addOnsTotal;
    const taxes = Math.round(subtotal * 0.08);
    const total = subtotal + taxes;

    function handlePay() {
        // Block if not logged in
        if (!user) {
            setShowAuthGate(true);
            return;
        }
        if (!canProceed) return;
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            onNext();
        }, 2200);
    }

    const isBusy = processing || saving;

    return (
        <>
            {/* Auth gate modal */}
            {showAuthGate && <AuthGateModal onClose={() => setShowAuthGate(false)} />}

            <div className="flex flex-col gap-6 sm:gap-7" style={{ animation: "slideUp .35s ease both" }}>

                {/* Payment method */}
                <div>
                    <h3 className="text-[14px] sm:text-[15px] font-extrabold text-gray-900 mb-3"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Payment method
                    </h3>
                    <div className="flex gap-2 sm:gap-2.5 flex-wrap">
                        {[
                            { id: "card", label: "Credit / Debit card", icon: "credit_card" },
                            { id: "paypal", label: "PayPal", icon: "account_balance_wallet" },
                            { id: "apple", label: "Apple Pay", icon: "phone_iphone" },
                        ].map((m) => (
                            <PaymentMethodPill key={m.id} {...m} selected={payMethod === m.id} onSelect={setPayMethod} />
                        ))}
                    </div>
                </div>

                {/* Card form */}
                {payMethod === "card" && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex flex-col gap-4">
                        {/* Card preview */}
                        <div className="relative h-36 sm:h-40 rounded-2xl overflow-hidden flex flex-col justify-between p-4 sm:p-5"
                            style={{ background: "linear-gradient(135deg, #00327d 0%, #0047ab 60%, #005375 100%)" }}>
                            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-orange-400/10" />
                            <div className="flex justify-between items-start relative z-10">
                                <span className="text-white/80 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase"
                                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                                    VentureGlobal Card
                                </span>
                                <CardTypeBadge type={cardType} />
                            </div>
                            <div className="relative z-10">
                                <div className="text-white text-[15px] sm:text-[18px] font-bold tracking-[0.15em] mb-2"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                    {cardNumber || "•••• •••• •••• ••••"}
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <div className="text-white/50 text-[9px] uppercase tracking-widest mb-0.5">Card holder</div>
                                        <div className="text-white text-[12px] sm:text-[13px] font-semibold">{cardName || "YOUR NAME"}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white/50 text-[9px] uppercase tracking-widest mb-0.5">Expires</div>
                                        <div className="text-white text-[12px] sm:text-[13px] font-semibold">{expiry || "MM/YY"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <TextInput label="Card number" value={cardNumber}
                            onChange={(v) => setCardNumberRaw(formatCardNumber(v))}
                            placeholder="1234 5678 9012 3456" maxLength={19} required
                            rightEl={<CardTypeBadge type={cardType} />} />
                        <TextInput label="Cardholder name" value={cardName}
                            onChange={setCardName} placeholder="Jane Smith" required />
                        <div className="grid grid-cols-2 gap-3">
                            <TextInput label="Expiry date" value={expiry}
                                onChange={(v) => setExpiryRaw(formatExpiry(v))}
                                placeholder="MM/YY" maxLength={5} required />
                            <TextInput label="CVV / CVC" type={showCvv ? "text" : "password"} value={cvv}
                                onChange={(v) => setCvv(v.replace(/\D/g, "").slice(0, 4))}
                                placeholder="•••" maxLength={4} required
                                rightEl={
                                    <button onClick={() => setShowCvv(!showCvv)} type="button"
                                        className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <Icon name={showCvv ? "visibility_off" : "visibility"} className="text-[16px]" />
                                    </button>
                                } />
                        </div>
                    </div>
                )}

                {payMethod !== "card" && (
                    <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-8 sm:p-10 flex flex-col items-center gap-3">
                        <Icon name={payMethod === "paypal" ? "account_balance_wallet" : "phone_iphone"}
                            className="text-4xl text-gray-300" />
                        <p className="text-[13px] sm:text-[14px] text-gray-400 font-semibold text-center">
                            You'll be redirected to {payMethod === "paypal" ? "PayPal" : "Apple Pay"} to complete payment
                        </p>
                    </div>
                )}

                {/* Billing address */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
                    <h3 className="text-[14px] font-extrabold text-gray-900 mb-3"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Billing address
                    </h3>
                    <label className="flex items-center gap-2.5 cursor-pointer mb-4">
                        <div onClick={() => setBillingMatch(!billingMatch)}
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200
                                ${billingMatch ? "bg-[#00327d] border-[#00327d]" : "border-gray-300"}`}>
                            {billingMatch && <Icon name="check" className="text-white text-[10px]" />}
                        </div>
                        <span className="text-[13px] text-gray-600">Same as lead traveller's country</span>
                    </label>
                    {!billingMatch && (
                        <TextInput label="Billing address" value={booking.billingAddress || ""}
                            onChange={(v) => onChange("billingAddress", v)}
                            placeholder="123 Main St, City, Country" />
                    )}
                </div>

                {/* Order review */}
                <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 sm:p-5">
                    <h3 className="text-[14px] font-extrabold text-gray-900 mb-4"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Order review
                    </h3>
                    <div className="flex flex-col gap-2 text-[12px] sm:text-[13px]">
                        <ReviewLine
                            label={`${destination.name} — ${booking.travellers} traveller${booking.travellers !== 1 ? "s" : ""}`}
                            value={destination.price * booking.travellers} />
                        {roomOpt.priceModifier > 0 &&
                            <ReviewLine label={`${roomOpt.label} upgrade`} value={roomOpt.priceModifier * booking.travellers} />}
                        {ADD_ONS.filter((a) => booking.addOns.includes(a.id)).map((a) =>
                            <ReviewLine key={a.id} label={a.label} value={a.price} />)}
                        <ReviewLine label="Taxes & fees (8%)" value={taxes} muted />
                        <div className="flex justify-between pt-3 border-t border-gray-300 mt-1">
                            <span className="font-extrabold text-gray-900 text-[14px] sm:text-[15px]"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Total due today</span>
                            <span className="font-extrabold text-[#00327d] text-[16px] sm:text-[18px]"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>${total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* SSL note */}
                <div className="flex items-center gap-2 text-[11px] sm:text-[12px] text-gray-400">
                    <Icon name="lock" className="text-[14px] text-emerald-500 flex-shrink-0" />
                    Your payment info is encrypted with 256-bit SSL. We never store card details.
                </div>

                {/* Not logged in banner */}
                {!user && (
                    <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
                        <Icon name="info" className="text-[18px] text-amber-500 flex-shrink-0" />
                        <p className="text-[12px] sm:text-[13px] text-amber-700 font-semibold">
                            You must be signed in to complete your booking.
                        </p>
                    </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3">
                    <button onClick={onBack} disabled={isBusy}
                        className="flex items-center gap-2 px-4 sm:px-6 py-3.5 sm:py-4 rounded-2xl border border-gray-200
                            text-[13px] sm:text-[14px] font-bold text-gray-600 bg-white hover:border-gray-300
                            transition-all duration-200 active:scale-95 disabled:opacity-50"
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                        <Icon name="arrow_back" className="text-lg" />
                        Back
                    </button>
                    <button onClick={handlePay} disabled={isBusy}
                        className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 sm:py-4 rounded-2xl
                            text-[14px] sm:text-[15px] font-bold text-white transition-all duration-300
                            ${isBusy
                                ? "bg-[#fc8a40]/70 cursor-not-allowed"
                                : !user
                                    ? "bg-[#fc8a40] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-300/50 active:scale-95"
                                    : canProceed
                                        ? "bg-[#fc8a40] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-300/50 active:scale-95"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                        {isBusy ? (
                            <>
                                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                Processing payment…
                            </>
                        ) : !user ? (
                            <>
                                <Icon name="lock" className="text-lg" />
                                Sign in to pay ${total.toLocaleString()}
                            </>
                        ) : (
                            <>
                                <Icon name="lock" className="text-lg" />
                                Pay ${total.toLocaleString()} securely
                            </>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}

function ReviewLine({ label, value, muted }) {
    return (
        <div className="flex justify-between gap-2">
            <span className={`${muted ? "text-gray-400" : "text-gray-600"} flex-1 min-w-0`}>{label}</span>
            <span className={`font-semibold flex-shrink-0 ${muted ? "text-gray-400" : "text-gray-800"}`}>
                ${value.toLocaleString()}
            </span>
        </div>
    );
}