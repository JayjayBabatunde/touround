import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/destinations/Icon";
import { registerUser } from "../../firebase/Auth";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Be+Vietnam+Pro:wght@400;500;600&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
  @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
`;

const TRAVELLER_TYPES = [
    { value: "adventure", label: "Adventure", icon: "hiking" },
    { value: "culture", label: "Culture", icon: "museum" },
    { value: "beach", label: "Beach", icon: "beach_access" },
    { value: "city", label: "City", icon: "apartment" },
    { value: "nature", label: "Nature", icon: "park" },
    { value: "luxury", label: "Luxury", icon: "diamond" },
];

const BUCKET_LIST = [
    { flag: "🇬🇷", name: "Santorini" },
    { flag: "🇯🇵", name: "Kyoto" },
    { flag: "🇵🇪", name: "Machu Picchu" },
    { flag: "🇮🇸", name: "Iceland" },
    { flag: "🇹🇿", name: "Serengeti" },
];

function friendlyError(code) {
    switch (code) {
        case "auth/email-already-in-use": return "An account with this email already exists.";
        case "auth/invalid-email": return "Please enter a valid email address.";
        case "auth/weak-password": return "Password must be at least 6 characters.";
        case "auth/too-many-requests": return "Too many attempts. Please try again later.";
        default: return "Something went wrong. Please try again.";
    }
}

function PasswordStrength({ password }) {
    const score =
        (password.length >= 8 ? 1 : 0) +
        (/[A-Z]/.test(password) ? 1 : 0) +
        (/[0-9]/.test(password) ? 1 : 0) +
        (/[^A-Za-z0-9]/.test(password) ? 1 : 0);
    const levels = [
        { label: "Weak", color: "#ef4444" },
        { label: "Fair", color: "#f97316" },
        { label: "Good", color: "#eab308" },
        { label: "Strong", color: "#22c55e" },
    ];
    if (!password) return null;
    const level = levels[Math.min(score - 1, 3)] ?? levels[0];
    return (
        <div className="flex items-center gap-2.5 mt-1.5">
            <div className="flex gap-1 flex-1">
                {levels.map((l, i) => (
                    <div key={l.label} className="flex-1 h-1.5 rounded-full transition-all duration-300"
                        style={{ background: i < score ? level.color : "#e5e7eb" }} />
                ))}
            </div>
            <span className="text-[11px] font-bold" style={{ color: level.color }}>{level.label}</span>
        </div>
    );
}

function InputField({ label, type = "text", value, onChange, placeholder, icon, rightElement, hint }) {
    const [focused, setFocused] = useState(false);
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-gray-700" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>{label}</label>
            <div className={`flex items-center gap-2.5 bg-gray-50 rounded-xl px-4 py-3 border transition-all duration-200
                ${focused ? "border-[#00327d] bg-white shadow-sm shadow-blue-900/10" : "border-gray-200"}`}>
                {icon && <Icon name={icon} className={`text-lg ${focused ? "text-[#00327d]" : "text-gray-400"}`} />}
                <input
                    type={type} value={value} onChange={onChange}
                    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent text-[14px] text-gray-800 outline-none placeholder:text-gray-400"
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                />
                {rightElement}
            </div>
            {hint && <p className="text-[11px] text-gray-400 pl-1">{hint}</p>}
        </div>
    );
}


export default function SignupPage({ onNavigateToLogin }) {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [travellerType, setTravellerType] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [newsletter, setNewsletter] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if (!agreed) return;
        setError("");
        setLoading(true);
        try {
            await registerUser({ firstName, lastName, email, password, travellerType, newsletter });
            navigate("/dashboard");
        } catch (err) {
            setError(friendlyError(err.code));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            <style>{GLOBAL_STYLES}</style>

            {/* Left panel */}
            <div className="hidden lg:flex lg:w-[44%] relative overflow-hidden flex-col bg-gradient-to-br from-[#00327d] via-[#0047ab] to-[#005375]">
                <div className="absolute -top-24 -right-16 w-96 h-96 rounded-full bg-orange-400/10 animate-pulse" />
                <div className="absolute bottom-0 -left-12 w-64 h-64 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: "1.5s" }} />
                <div className="relative z-10 flex flex-col justify-between h-full p-12">
                    <button onClick={() => navigate("/")} className="text-2xl font-extrabold text-white text-left" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        VentureGlobal
                    </button>
                    <div style={{ animation: "slideUp .5s ease .1s both" }}>
                        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 text-[11px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
                            <Icon name="flight_takeoff" className="text-[15px]" />
                            Join 10,000+ travellers
                        </div>
                        <h2 className="text-4xl font-extrabold text-white leading-tight mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Start your next<br />great adventure.
                        </h2>
                        <p className="text-white/65 text-[14px] leading-relaxed">
                            Create your free account and get instant access to handpicked destinations, exclusive deals, and personalised travel planning.
                        </p>
                    </div>
                    <div style={{ animation: "slideUp .55s ease .3s both" }}>
                        <div className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-3">Popular this month</div>
                        <div className="flex flex-col gap-2">
                            {BUCKET_LIST.map((d) => (
                                <div key={d.name} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/15">
                                    <span className="text-xl">{d.flag}</span>
                                    <span className="text-[13px] font-semibold text-white">{d.name}</span>
                                    <Icon name="arrow_forward" className="text-[14px] text-white/40 ml-auto" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-5" style={{ animation: "slideUp .6s ease .45s both" }}>
                        {[
                            { icon: "shield", text: "Secure & private" },
                            { icon: "payments", text: "No hidden fees" },
                            { icon: "support_agent", text: "24/7 support" },
                        ].map(({ icon, text }) => (
                            <div key={icon} className="flex flex-col items-center gap-1.5 text-center">
                                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                                    <Icon name={icon} className="text-[17px] text-white" />
                                </div>
                                <span className="text-[10px] font-semibold text-white/55 leading-tight">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right panel */}
            <div className="flex-1 flex items-start justify-center bg-[#f7f9fb] px-8 py-10 overflow-y-auto">
                <div className="w-full max-w-[460px]" style={{ animation: "slideUp .45s ease both" }}>
                    <button onClick={() => navigate("/")} className="lg:hidden text-xl font-extrabold text-[#00327d] mb-8 text-left" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        TourRound
                    </button>

                    <div className="mb-7">
                        <h1 className="text-[28px] font-extrabold text-gray-900 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Create your account</h1>
                        <p className="text-[14px] text-gray-500">
                            Already have an account?{" "}
                            <button onClick={onNavigateToLogin} className="font-bold text-[#fc8a40] hover:underline">Sign in</button>
                        </p>
                    </div>

                    {/* Error banner */}
                    {error && (
                        <div className="mb-4 flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 text-[13px] font-semibold px-4 py-3 rounded-xl">
                            <Icon name="error" className="text-[16px] flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-3">
                            <InputField label="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jane" icon="person" />
                            <InputField label="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Smith" />
                        </div>
                        <InputField label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" icon="mail" />
                        <div>
                            <InputField
                                label="Password" type={showPass ? "text" : "password"} value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a strong password" icon="lock"
                                hint="Min. 8 characters with a number and symbol"
                                rightElement={
                                    <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <Icon name={showPass ? "visibility_off" : "visibility"} className="text-lg" />
                                    </button>
                                }
                            />
                            <PasswordStrength password={password} />
                        </div>

                        <div>
                            <div className="text-[13px] font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                                I travel for… <span className="text-gray-400 font-normal ml-1.5">(optional)</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {TRAVELLER_TYPES.map((t) => (
                                    <button key={t.value} type="button"
                                        onClick={() => setTravellerType(travellerType === t.value ? "" : t.value)}
                                        className={`flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl border text-[12px] font-semibold transition-all duration-200
                                            ${travellerType === t.value ? "border-[#00327d] bg-blue-50 text-[#00327d]" : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"}`}
                                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                                    >
                                        <Icon name={t.icon} className={`text-xl ${travellerType === t.value ? "text-[#00327d]" : "text-gray-400"}`} />
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-1">
                            {[
                                { state: agreed, setState: setAgreed, text: <>I agree to the <span className="text-[#00327d] font-semibold">Terms of Service</span> and <span className="text-[#00327d] font-semibold">Privacy Policy</span></> },
                                { state: newsletter, setState: setNewsletter, text: "Send me exclusive deals and travel inspiration" },
                            ].map(({ state, setState, text }, i) => (
                                <label key={i} className="flex items-start gap-2.5 cursor-pointer select-none">
                                    <div onClick={() => setState(!state)} className={`mt-0.5 w-4 h-4 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${state ? "bg-[#00327d] border-[#00327d]" : "border-gray-300"}`}>
                                        {state && <Icon name="check" className="text-[10px] text-white" />}
                                    </div>
                                    <span className="text-[13px] text-gray-600 leading-snug">{text}</span>
                                </label>
                            ))}
                        </div>

                        <button
                            type="submit" disabled={!agreed || loading}
                            className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-[14px] font-bold text-white mt-1 transition-all duration-200 active:scale-95
                                ${agreed && !loading ? "bg-[#fc8a40] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-300/50" : "bg-gray-300 cursor-not-allowed"}`}
                            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                        >
                            {loading
                                ? <><Icon name="progress_activity" className="text-lg animate-spin" /> Creating account…</>
                                : <><Icon name="flight_takeoff" className="text-lg" /> Create My Account</>
                            }
                        </button>
                    </form>

                    <p className="text-center text-[11px] text-gray-400 mt-6 leading-relaxed">
                        By creating an account, you confirm you're at least 18 years old.<br />We'll never share your data with third parties.
                    </p>
                </div>
            </div>
        </div>
    );
}