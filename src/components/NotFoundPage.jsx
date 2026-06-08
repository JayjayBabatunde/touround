import { useNavigate } from "react-router-dom";

const STYLES = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-12px); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .not-found-plane { animation: float 4s ease-in-out infinite; }
  .not-found-a { animation: fadeUp .5s ease both; }
  .not-found-b { animation: fadeUp .5s ease .1s both; }
  .not-found-c { animation: fadeUp .5s ease .2s both; }
  .not-found-d { animation: fadeUp .5s ease .3s both; }
`;

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-[#f7f9fb] px-6"
            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
            <style>{STYLES}</style>

            <button
                onClick={() => navigate("/")}
                className="absolute top-6 left-8 text-[18px] font-extrabold text-[#00327d]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
                VentureGlobal
            </button>

            <div className="not-found-plane mb-8 select-none">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                    <circle cx="60" cy="60" r="60" fill="#00327d" opacity="0.06" />
                    <circle cx="60" cy="60" r="44" fill="#00327d" opacity="0.07" />

                    <g transform="translate(60,60) rotate(-30) translate(-24,-16)">
                        <path d="M4 16 L44 8 L44 24 L4 16Z" fill="#00327d" />
                        <path d="M4 16 L16 10 L16 14 L4 16Z" fill="#0047ab" />
                        <path d="M44 8 L48 4 L48 12 L44 8Z" fill="#fc8a40" />
                        <path d="M44 24 L48 20 L48 28 L44 24Z" fill="#fc8a40" />
                        <path d="M20 16 L28 6 L32 6 L24 16Z" fill="#0047ab" opacity="0.7" />
                    </g>

                    <circle cx="28" cy="72" r="2.5" fill="#fc8a40" opacity="0.5" />
                    <circle cx="20" cy="80" r="2" fill="#fc8a40" opacity="0.35" />
                    <circle cx="14" cy="88" r="1.5" fill="#fc8a40" opacity="0.2" />
                </svg>
            </div>


            <div className="not-found-a text-center mb-3">
                <span
                    className="text-[96px] font-extrabold leading-none text-[#00327d] tracking-tight"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", opacity: 0.12 }}
                >
                    404
                </span>
            </div>

            <h1
                className="not-found-b text-[26px] font-extrabold text-gray-900 text-center mb-2 -mt-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
                Looks like you're off the map
            </h1>

            <p className="not-found-c text-[14px] text-gray-500 text-center max-w-xs leading-relaxed mb-8">
                The page you're looking for doesn't exist or has been moved.
                Let's get you back on course.
            </p>

            <div className="not-found-d flex gap-3 flex-wrap justify-center">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl text-[13px] font-bold
            text-white bg-[#fc8a40] hover:-translate-y-0.5 hover:shadow-lg
            hover:shadow-orange-300/50 transition-all duration-200 active:scale-95"
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                >
                    Go home
                </button>
                <button
                    onClick={() => navigate("/destinations")}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl text-[13px] font-bold
            text-[#00327d] bg-blue-50 hover:bg-[#00327d] hover:text-white
            transition-all duration-200 active:scale-95"
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                >
                    Explore destinations
                </button>
            </div>
        </div>
    );
}