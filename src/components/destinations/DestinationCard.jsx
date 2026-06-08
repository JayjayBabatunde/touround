import { useState } from "react";
import { useFadeInUp } from "../../hooks/FadeinUp";
import { BADGE_STYLES } from "../../data/data";
import Icon from "./Icon";


export default function DestinationCard({ destination, isFav, onFavToggle, onClick, animDelay = 0 }) {
    const [ref, fadeStyle] = useFadeInUp(animDelay);
    const [imgHovered, setImgHovered] = useState(false);
    const d = destination;

    return (
        <div ref={ref} style={fadeStyle}>
            <div
                onClick={() => onClick(d)}
                onMouseEnter={() => setImgHovered(true)}
                onMouseLeave={() => setImgHovered(false)}
                className="group bg-white rounded-3xl overflow-hidden cursor-pointer
          shadow-sm hover:shadow-2xl hover:shadow-blue-900/15 hover:-translate-y-1.5
          transition-all duration-350 border border-gray-100/80"
            >
                <div className="relative overflow-hidden" style={{ height: 220 }}>
                    <img
                        src={d.img}
                        alt={d.name}
                        className="w-full h-full object-cover transition-transform duration-700"
                        style={{ transform: imgHovered ? "scale(1.07)" : "scale(1)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {d.badge && (
                        <span
                            className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full
                tracking-wide ${BADGE_STYLES[d.badge] ?? "bg-orange-400 text-white"}`}
                        >
                            {d.badge}
                        </span>
                    )}

                    <button
                        onClick={(e) => { e.stopPropagation(); onFavToggle(d.id); }}
                        className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/85 backdrop-blur-sm
              flex items-center justify-center hover:scale-110 transition-transform duration-200"
                    >
                        <Icon
                            name="favorite"
                            fill={isFav}
                            className={`text-lg ${isFav ? "text-red-500" : "text-gray-400"}`}
                        />
                    </button>
                </div>

                <div className="p-4 pb-5">
                    <div className="text-[11px] font-bold tracking-widest uppercase text-[#fc8a40] mb-1">
                        {d.continent}
                    </div>
                    <div
                        className="text-[17px] font-bold text-gray-900 mb-0.5"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        {d.name}
                    </div>
                    <div className="flex items-center gap-1 text-[12px] text-gray-400 mb-2.5">
                        <Icon name="location_on" className="text-[13px]" />
                        {d.country}
                    </div>

                    <div className="flex gap-1.5 flex-wrap mb-3">
                        {d.tags.map((t) => (
                            <span key={t} className="text-[10px] font-600 px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-end justify-between pt-3 border-t border-gray-100">
                        <div>
                            <div className="text-[10px] text-gray-400 mb-0.5">From per person</div>
                            <div
                                className="text-xl font-extrabold text-[#00327d]"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                ${d.price.toLocaleString()}
                                <span className="text-[11px] font-normal text-gray-400"> / trip</span>
                            </div>
                            <div className="text-[10px] text-gray-400 mt-0.5">{d.nights} nights</div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-[12px] font-bold text-gray-800 justify-end">
                                <Icon name="star" fill className="text-[14px] text-amber-400" />
                                {d.rating}
                            </div>
                            <div className="text-[10px] text-gray-400 mt-0.5">{d.reviews.toLocaleString()} reviews</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}