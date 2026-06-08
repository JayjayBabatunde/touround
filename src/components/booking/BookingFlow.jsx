import { useState } from "react";
import Icon from "../destinations/Icon";
import BookingProgress from "./BookingProgress";
import BookingSummaryCard from "./BookingSummaryCard";
import TripDetailsStep from "./TripDetailsStep";
import TravellersStep from "./TravellerStep";
import PaymentStep from "./PaymentStep";
import ConfirmationStep from "./ConfirmationStep";
import { useAuth } from "../../hooks/useAuth";
import { createBooking } from "../../../firebase/Bookings";
import { ROOM_OPTIONS, ADD_ONS } from "../../data/BookingConstants";
import { useNavigate } from "react-router-dom";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Be+Vietnam+Pro:wght@400;500;600&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
  @keyframes fadeIn   { from { opacity: 0 }                              to { opacity: 1 } }
  @keyframes slideUp  { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
  @keyframes slideDown{ from { opacity: 0; transform: translateY(-10px)} to { opacity: 1; transform: translateY(0) } }
`;


function defaultBooking() {
    return {
        checkIn: "", checkOut: "", travellers: 2, roomType: "standard",
        addOns: [], specialRequests: "", travellerDetails: [], billingAddress: "",
    };
}

function generateRef() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
    return "VG-" + Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function BookingFlow({ destination, onClose }) {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [booking, setBooking] = useState(defaultBooking());
    const [bookingRef, setBookingRef] = useState("");
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    function updateBooking(key, value) {
        setBooking((prev) => ({ ...prev, [key]: value }));
    }

    function goNext() {
        setStep((s) => Math.min(s + 1, 4));
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    function goBack() {
        setStep((s) => Math.max(s - 1, 1));
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Called by PaymentStep after simulated payment succeeds
    async function handlePaymentSuccess() {
        setSaving(true);
        try {
            const roomOpt = ROOM_OPTIONS.find((r) => r.id === booking.roomType) ?? ROOM_OPTIONS[0];
            const selectedAddOns = ADD_ONS.filter((a) => booking.addOns.includes(a.id));
            const subtotal = (destination.price + roomOpt.priceModifier) * booking.travellers
                + selectedAddOns.reduce((s, a) => s + a.price, 0);
            const taxes = Math.round(subtotal * 0.08);
            const total = subtotal + taxes;
            const ref = generateRef();

            await createBooking(user.uid, {
                ref,
                destination: destination.name,
                country: destination.country,
                continent: destination.continent,
                img: destination.img,
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
                nights: destination.nights,
                travellers: booking.travellers,
                roomType: roomOpt.label,
                addOns: selectedAddOns.map((a) => a.label),
                specialRequests: booking.specialRequests,
                travellerDetails: booking.travellerDetails,
                total,
                status: "confirmed",
                // lead traveller name for admin panel display
                customer: booking.travellerDetails?.[0]
                    ? `${booking.travellerDetails[0].firstName} ${booking.travellerDetails[0].lastName}`
                    : user.displayName ?? "Guest",
            });

            setBookingRef(ref);
            goNext(); // move to confirmation
        } catch (err) {
            console.error("Failed to save booking:", err);
        } finally {
            setSaving(false);
        }
    }

    const isConfirmed = step === 4;

    return (
        <div className="min-h-screen bg-[#f7f9fb]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            <style>{GLOBAL_STYLES}</style>

            {/* Top bar */}
            <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6 h-[60px] flex items-center justify-between">
                    <span className="text-lg sm:text-xl font-extrabold text-[#00327d]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        VentureGlobal
                    </span>
                    {!isConfirmed && (
                        <span className="hidden sm:block text-[13px] font-bold text-gray-500">
                            Step {step} of 3 — {["Trip Details", "Travellers", "Payment"][step - 1]}
                        </span>
                    )}
                    {!isConfirmed && (
                        <button onClick={onClose}
                            className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-500 hover:text-gray-800 transition-colors">
                            <Icon name="close" className="text-lg" />
                            <span className="hidden sm:inline">Exit booking</span>
                        </button>
                    )}
                    {isConfirmed && <div />}
                </div>
            </div>

            <BookingProgress currentStep={step} />

            <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
                {isConfirmed ? (
                    <div className="max-w-2xl mx-auto">
                        <ConfirmationStep
                            destination={destination}
                            booking={booking}
                            bookingRef={bookingRef}
                            onDone={() => navigate("/dashboard")}
                        />
                    </div>
                ) : (
                    <div className="flex gap-8 items-start">
                        <div className="flex-1 min-w-0">
                            {/* Destination pill */}
                            <div className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm px-4 sm:px-5 py-4 mb-6"
                                style={{ animation: "fadeIn .4s ease both" }}>
                                <img src={destination.img} alt={destination.name}
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="text-[11px] font-bold tracking-widest uppercase text-[#fc8a40] mb-0.5">
                                        {destination.continent}
                                    </div>
                                    <div className="text-[15px] sm:text-[17px] font-extrabold text-gray-900 truncate"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        {destination.name}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[12px] text-gray-400 mt-0.5 flex-wrap">
                                        <Icon name="location_on" className="text-[13px]" />{destination.country}
                                        <span className="mx-1 text-gray-300">·</span>
                                        <Icon name="nights_stay" className="text-[13px]" />{destination.nights} nights
                                        <span className="mx-1 text-gray-300">·</span>
                                        <Icon name="star" fill className="text-[13px] text-amber-400" />{destination.rating}
                                    </div>
                                </div>
                                <button onClick={onClose}
                                    className="text-[12px] font-semibold text-[#00327d] hover:underline flex-shrink-0 hidden sm:block">
                                    Change trip
                                </button>
                            </div>

                            {step === 1 && <TripDetailsStep booking={booking} onChange={updateBooking} onNext={goNext} />}
                            {step === 2 && <TravellersStep booking={booking} onChange={updateBooking} onNext={goNext} onBack={goBack} />}
                            {step === 3 && (
                                <PaymentStep
                                    booking={booking}
                                    destination={destination}
                                    onChange={updateBooking}
                                    onNext={handlePaymentSuccess}
                                    onBack={goBack}
                                    saving={saving}
                                />
                            )}
                        </div>

                        {/* Summary sidebar — desktop only */}
                        <div className="w-[300px] xl:w-[320px] flex-shrink-0 hidden lg:block">
                            <BookingSummaryCard destination={destination} booking={booking} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}