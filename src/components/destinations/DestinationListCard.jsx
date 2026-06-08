import { useFadeInUp } from "../../hooks/FadeinUp";
import { BADGE_STYLES } from "../../data/data";
import Icon from "./Icon";


export default function DestinationListCard({ destination, isFav, onFavToggle, onClick, animDelay = 0 }) {
    const [ref, fadeStyle] = useFadeInUp(animDelay);
    const d = destination;

    return (
        <div ref={ref} style={fadeStyle}>
            <div
                onClick={() => onClick(d)}
                className="group bg-white rounded-2xl overflow-hidden cursor-pointer flex
          shadow-sm hover:shadow-xl hover:shadow-blue-900/12 hover:-translate-y-1
          transition-all duration-300 border border-gray-100/80"
            >
                <div className="relative w-52 flex-shrink-0 overflow-hidden">
                    <img
                        src={d.img}
                        alt={d.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {d.badge && (
                        <span
                            className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full
                ${BADGE_STYLES[d.badge] ?? "bg-orange-400 text-white"}`}
                        >
                            {d.badge}
                        </span>
                    )}
                </div>

                <div className="flex-1 p-5 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <div className="text-[11px] font-bold tracking-widest uppercase text-[#fc8a40] mb-1">
                                {d.continent}
                            </div>
                            <div
                                className="text-xl font-bold text-gray-900 mb-1"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                {d.name}
                            </div>
                            <div className="flex items-center gap-1 text-[12px] text-gray-400">
                                <Icon name="location_on" className="text-[13px]" />
                                {d.country}
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <div className="text-[10px] text-gray-400 mb-0.5">From per person</div>
                            <div
                                className="text-2xl font-extrabold text-[#00327d]"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                ${d.price.toLocaleString()}
                            </div>
                            <div className="text-[11px] text-gray-400">{d.nights} nights</div>
                        </div>
                    </div>

                    <p className="text-[13px] text-gray-500 leading-relaxed my-3 line-clamp-2">{d.desc}</p>

                    <div className="flex items-center justify-between">
                        <div className="flex gap-1.5 flex-wrap">
                            {d.tags.map((t) => (
                                <span key={t} className="text-[10px] px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 font-semibold">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0">
                            <div className="flex items-center gap-1 text-[13px] font-bold text-gray-700">
                                <Icon name="star" fill className="text-[15px] text-amber-400" />
                                {d.rating}
                                <span className="text-[11px] font-normal text-gray-400">({d.reviews.toLocaleString()})</span>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); onFavToggle(d.id); }}
                                className="hover:scale-110 transition-transform"
                            >
                                <Icon
                                    name="favorite"
                                    fill={isFav}
                                    className={`text-xl ${isFav ? "text-red-500" : "text-gray-300"}`}
                                />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onClick(d); }}
                                className="text-[12px] font-bold text-white bg-[#fc8a40] px-4 py-2 rounded-xl
                  hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-300/50 transition-all duration-200"
                                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}