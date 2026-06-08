import { useEffect } from "react";
import { BADGE_STYLES } from "../../data/data";
import Icon from "./Icon";


export default function QuickViewModal({ destination, isFav, onFavToggle, onClose, onBook }) {
    const d = destination;

    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 bg-black/55 z-[100] flex items-center justify-center p-4"
            style={{ animation: "fadeIn .2s ease" }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                className="bg-white rounded-3xl max-w-xl w-full max-h-[88vh] overflow-y-auto shadow-2xl shadow-black/30"
                style={{ animation: "slideUp .3s ease" }}
            >
                <div className="relative">
                    <img src={d.img} alt={d.name} className="w-full h-64 object-cover rounded-t-3xl" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm
              flex items-center justify-center hover:bg-white shadow-md transition-all"
                    >
                        <Icon name="close" className="text-lg text-gray-700" />
                    </button>

                    {d.badge && (
                        <span
                            className={`absolute top-4 left-4 text-[11px] font-bold px-3 py-1 rounded-full
                ${BADGE_STYLES[d.badge] ?? "bg-orange-400 text-white"}`}
                        >
                            {d.badge}
                        </span>
                    )}
                </div>

                <div className="p-7">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <div className="text-[11px] font-bold tracking-widest uppercase text-[#fc8a40] mb-1">
                                {d.continent} · {d.country}
                            </div>
                            <h2
                                className="text-3xl font-extrabold text-[#00327d]"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                {d.name}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 my-4">
                        <div className="flex items-center gap-1.5 text-[14px] font-bold text-gray-800">
                            <Icon name="star" fill className="text-[16px] text-amber-400" />
                            {d.rating}
                            <span className="text-[12px] font-normal text-gray-400">({d.reviews.toLocaleString()} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
                            <Icon name="nights_stay" className="text-[16px]" />
                            {d.nights} nights
                        </div>
                        <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
                            <Icon name="flight_takeoff" className="text-[16px]" />
                            {d.type.charAt(0).toUpperCase() + d.type.slice(1)}
                        </div>
                    </div>

                    <p className="text-[14px] text-gray-500 leading-relaxed mb-5">{d.desc}</p>

                    <div className="flex flex-wrap gap-2.5 mb-5">
                        {d.features.map((f) => (
                            <div
                                key={f}
                                className="flex items-center gap-1.5 bg-gray-50 rounded-xl px-3 py-2
                  text-[12px] font-semibold text-gray-600"
                            >
                                <Icon name="check_circle" className="text-[15px] text-[#fc8a40]" />
                                {f}
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2 flex-wrap mb-6">
                        {d.tags.map((t) => (
                            <span key={t} className="text-[11px] font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-500">
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-5 py-4 mb-6">
                        <div>
                            <div className="text-[11px] text-gray-400 mb-1">Starting from (per person)</div>
                            <div
                                className="text-4xl font-extrabold text-[#00327d]"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                ${d.price.toLocaleString()}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-[11px] text-gray-400 mb-1">Duration</div>
                            <div className="text-lg font-bold text-gray-800">{d.nights} nights</div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            className="flex-1 flex items-center justify-center gap-2 text-[14px] font-bold
                text-white bg-[#fc8a40] py-3.5 rounded-2xl
                hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-300/50
                transition-all duration-200"
                            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                            onClick={() => { if (onBook) onBook(d); }}
                        >
                            <Icon name="flight_takeoff" className="text-lg" />
                            Book Now
                        </button>

                        <button
                            onClick={() => onFavToggle(d.id)}
                            className="w-12 h-12 rounded-2xl border border-gray-200 bg-white flex items-center justify-center
                hover:border-red-300 transition-all duration-200"
                        >
                            <Icon
                                name="favorite"
                                fill={isFav}
                                className={`text-xl ${isFav ? "text-red-500" : "text-gray-300"}`}
                            />
                        </button>

                        <button
                            className="w-12 h-12 rounded-2xl border border-gray-200 bg-white flex items-center justify-center
                hover:border-gray-400 transition-all duration-200"
                        >
                            <Icon name="share" className="text-xl text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes fadeIn  { from { opacity: 0 }                          to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(32px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
        </div>
    );
}