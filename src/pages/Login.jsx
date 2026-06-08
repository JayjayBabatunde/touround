import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/destinations/Icon";
import { loginUser, resetPassword } from "../../firebase/Auth";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Be+Vietnam+Pro:wght@400;500;600&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
  @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
`;

const PREVIEW_DESTINATIONS = [
  { name: "Santorini", country: "Greece", rating: 4.9, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8hu3AAhnqxYZLlCq3J1agWB38u05FtuPfAC38UL927skdElt0pJRAT3zf3_GNLq8u9Sk6sDjpvvZsovG7pqIJJ1dABR6DN6icfPa0QjJCUGaKuQKvkJrSOzkUELyebapWfY4SxPv6NbZuRI-x6UzU9-K8j7UJccWWyMxtLEFkqfv73wRbd1Ct5_S2Z2alqe9mV0crzkiQzJz-2feXBct4AYumYbZGbFloesjNd2w78WAKHDVc3ooPtuE3sVv1ZuCTD7PNBLGegH19" },
  { name: "Serengeti Safari", country: "Tanzania", rating: 5.0, img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80" },
  { name: "Kyoto", country: "Japan", rating: 4.9, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsTgerhko72rNj0yJbnOhYGYM_H6GgyJVlroAdiinb0AhTCY5IuqVkcYMo_wJiY_rOSr6WQFjTq1uv3iBkEN9C0h-8_aYqEJSEHQRIYRzLYn40iYummCvk6psyu-jFNXTT4NMwE-y8c73tWaAbysPoPpD2aYh5xrsk2lkZtGfjl6Zzxhcx0HMZz85iWhsYhsvuUwcxP-HrWQ23dsMsFq8vjH-qp_QndEs4Sthb0onpylxpihPqvwLlY9kwa04DbyFqVyzlDtRCDozH" },
];

const STATS = [
  { value: "450+", label: "Destinations" },
  { value: "10k+", label: "Travelers" },
  { value: "4.9★", label: "Avg Rating" },
];

// Firebase error codes → friendly messages
function friendlyError(code) {
  switch (code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    default:
      return "Something went wrong. Please try again.";
  }
}

function FloatingDestinationCard({ dest, style }) {
  return (
    <div className="absolute bg-white/15 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-xl" style={style}>
      <img src={dest.img} alt={dest.name} className="w-full h-20 object-cover" />
      <div className="px-3 py-2">
        <div className="text-white text-[13px] font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{dest.name}</div>
        <div className="flex items-center justify-between mt-0.5">
          <div className="text-white/70 text-[11px]">{dest.country}</div>
          <div className="flex items-center gap-0.5 text-[11px] text-amber-300 font-semibold">
            <Icon name="star" fill className="text-[12px]" />{dest.rating}
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, type = "text", value, onChange, placeholder, icon, rightElement }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-gray-700" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
        {label}
      </label>
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
    </div>
  );
}


export default function LoginPage({ onNavigateToSignup }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginUser(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email) { setError("Enter your email above first."); return; }
    setError("");
    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (err) {
      setError(friendlyError(err.code));
    }
  }

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      <style>{GLOBAL_STYLES}</style>

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-gradient-to-br from-[#00327d] via-[#0047ab] to-[#005375]">
        <div className="absolute -top-32 -right-20 w-[480px] h-[480px] rounded-full bg-orange-400/10 animate-pulse" />
        <div className="absolute -bottom-20 -left-16 w-72 h-72 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: "1.2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <button onClick={() => navigate("/")} className="text-2xl font-extrabold text-white text-left" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            VentureGlobal
          </button>
          <div style={{ animation: "slideUp .5s ease .1s both" }}>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 text-[11px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              <Icon name="travel_explore" className="text-[15px]" />
              Your journey awaits
            </div>
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              The world is<br />your playground.
            </h2>
            <p className="text-white/65 text-[15px] leading-relaxed max-w-sm">
              Sign in to unlock personalised itineraries, saved favourites, and exclusive member deals across 450+ destinations.
            </p>
            <div className="flex gap-8 mt-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.value}</div>
                  <div className="text-[11px] font-semibold text-white/50 uppercase tracking-widest mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-52">
            <FloatingDestinationCard dest={PREVIEW_DESTINATIONS[0]} style={{ width: 170, bottom: 24, left: 0, animation: "slideUp .55s ease .25s both" }} />
            <FloatingDestinationCard dest={PREVIEW_DESTINATIONS[1]} style={{ width: 170, bottom: 56, left: "50%", transform: "translateX(-50%)", animation: "slideUp .55s ease .35s both" }} />
            <FloatingDestinationCard dest={PREVIEW_DESTINATIONS[2]} style={{ width: 170, bottom: 24, right: 0, animation: "slideUp .55s ease .45s both" }} />
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-[#f7f9fb] p-8">
        <div className="w-full max-w-[420px]" style={{ animation: "slideUp .45s ease both" }}>
          <button onClick={() => navigate("/")} className="lg:hidden text-xl font-extrabold text-[#00327d] mb-8 text-left" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            VentureGlobal
          </button>

          <div className="mb-7">
            <h1 className="text-[28px] font-extrabold text-gray-900 mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Welcome back</h1>
            <p className="text-[14px] text-gray-500">
              Don't have an account?{" "}
              <button onClick={onNavigateToSignup} className="font-bold text-[#fc8a40] hover:underline">Sign up free</button>
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-4 flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 text-[13px] font-semibold px-4 py-3 rounded-xl">
              <Icon name="error" className="text-[16px] flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Reset sent confirmation */}
          {resetSent && (
            <div className="mb-4 flex items-center gap-2.5 bg-green-50 border border-green-200 text-green-600 text-[13px] font-semibold px-4 py-3 rounded-xl">
              <Icon name="mark_email_read" className="text-[16px] flex-shrink-0" />
              Password reset email sent. Check your inbox.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" icon="mail" />
            <InputField
              label="Password" type={showPass ? "text" : "password"} value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" icon="lock"
              rightElement={
                <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Icon name={showPass ? "visibility_off" : "visibility"} className="text-lg" />
                </button>
              }
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div onClick={() => setRemember(!remember)} className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${remember ? "bg-[#00327d] border-[#00327d]" : "border-gray-300"}`}>
                  {remember && <Icon name="check" className="text-[10px] text-white" />}
                </div>
                <span className="text-[13px] text-gray-600">Remember me</span>
              </label>
              <button type="button" onClick={handleForgotPassword} className="text-[13px] font-semibold text-[#00327d] hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit" disabled={loading}
              className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-[14px] font-bold text-white mt-1 transition-all duration-200 active:scale-95
                                ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#fc8a40] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-300/50"}`}
              style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
              {loading
                ? <><Icon name="progress_activity" className="text-lg animate-spin" /> Signing in…</>
                : <><Icon name="login" className="text-lg" /> Sign In</>
              }
            </button>
          </form>

          <div className="mt-8 bg-white rounded-2xl border border-gray-100 px-5 py-4">
            <div className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-3">Member Benefits</div>
            <div className="flex flex-col gap-2.5">
              {[
                { icon: "favorite", text: "Save & sync your favourite destinations" },
                { icon: "confirmation_number", text: "Early access to exclusive deals" },
                { icon: "route", text: "Build and share custom itineraries" },
              ].map(({ icon, text }) => (
                <div key={icon} className="flex items-center gap-2.5 text-[13px] text-gray-600">
                  <Icon name={icon} className="text-[16px] text-[#fc8a40]" />{text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}