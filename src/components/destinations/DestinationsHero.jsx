import Icon from "./Icon";

const STATS = [
    { value: "450+", label: "Destinations" },
    { value: "7", label: "Continents" },
    { value: "10k+", label: "Travelers" },
    { value: "4.9★", label: "Avg Rating" },
];

export default function DestinationHero() {
    return (
        <div className="relative bg-gradient-to-br from-[#00327d] via-[#0047ab] to-[#005375] overflow-hidden px-6 sm:px-8 md:px-12 py-10 md:py-14">
            {/* Decorative blobs */}
            <div className="absolute -top-24 -right-20 w-96 h-96 rounded-full bg-orange-400/10 animate-pulse" />
            <div className="absolute -bottom-16 left-1/3 w-60 h-60 rounded-full bg-white/5 animate-pulse delay-1000" />

            <div className="relative z-10 max-w-[1280px] mx-auto">
                {/* Tag */}
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90
                    text-[11px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
                    <Icon name="travel_explore" className="text-[15px]" />
                    450+ Destinations Worldwide
                </div>

                <h1
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-3"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    Explore the World,<br />Your Way
                </h1>

                <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-md mb-8">
                    Discover handpicked destinations across every continent — curated for the modern explorer who craves the extraordinary.
                </p>

                <div className="flex flex-wrap gap-y-5 gap-x-8 sm:gap-x-10">
                    {STATS.map((s) => (
                        <div key={s.label}>
                            <div
                                className="text-2xl sm:text-3xl font-extrabold text-white"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                {s.value}
                            </div>
                            <div className="text-[11px] font-semibold text-white/55 uppercase tracking-widest mt-0.5">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}