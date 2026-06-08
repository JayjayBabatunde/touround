import Icon from "../../components/destinations/Icon";

const CHANNELS = [
    {
        icon: "support_agent",
        label: "Live chat",
        value: "Available 24/7",
        sub: "Average response under 2 minutes",
    },
    {
        icon: "mail",
        label: "Email",
        value: "support@ventureglobal.com",
        sub: "We reply within 4 business hours",
    },
    {
        icon: "phone",
        label: "Phone",
        value: "+1 (800) 867-5309",
        sub: "Mon–Fri, 8 am – 8 pm EST",
    },
];

const FACTS = [
    { icon: "confirmation_number", value: "10k+", label: "Bookings supported" },
    { icon: "star", value: "4.9", label: "Support rating" },
    { icon: "public", value: "450+", label: "Destinations" },
];

export default function ContactHero() {
    return (
        <div className="relative overflow-hidden flex flex-col justify-between
      bg-gradient-to-br from-[#00327d] via-[#0047ab] to-[#005375]
      px-10 py-12 lg:py-16">

            <div className="absolute -top-20 -right-16 w-80 h-80 rounded-full bg-orange-400/10 animate-pulse" />
            <div className="absolute -bottom-14 -left-10 w-56 h-56 rounded-full bg-white/5 animate-pulse"
                style={{ animationDelay: "1.2s" }} />

            <div className="relative z-10 flex flex-col gap-10">
                <div>
                    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm
            text-white/90 text-[11px] font-bold tracking-widest uppercase
            px-4 py-1.5 rounded-full mb-5">
                        <Icon name="headset_mic" className="text-[14px]" />
                        We're here to help
                    </div>
                    <h2
                        className="text-[32px] font-extrabold text-white leading-tight mb-3"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Get in touch<br />with our team
                    </h2>
                    <p className="text-white/65 text-[14px] leading-relaxed max-w-sm">
                        Whether you have a question about a booking, need help planning a trip,
                        or just want to say hello — we'd love to hear from you.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    {CHANNELS.map((c) => (
                        <div
                            key={c.label}
                            className="flex items-start gap-3.5 bg-white/10 backdrop-blur-sm
                rounded-2xl px-4 py-3.5 border border-white/15"
                        >
                            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                                <Icon name={c.icon} className="text-[17px] text-white" />
                            </div>
                            <div>
                                <div className="text-[11px] font-bold text-white/50 uppercase tracking-widest mb-0.5">
                                    {c.label}
                                </div>
                                <div
                                    className="text-[14px] font-bold text-white"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                >
                                    {c.value}
                                </div>
                                <div className="text-[11px] text-white/55 mt-0.5">{c.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-8 pt-2 border-t border-white/10">
                    {FACTS.map((f) => (
                        <div key={f.label}>
                            <div
                                className="text-[22px] font-extrabold text-white"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                {f.value}
                            </div>
                            <div className="text-[10px] font-semibold text-white/45 uppercase tracking-widest mt-0.5">
                                {f.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}