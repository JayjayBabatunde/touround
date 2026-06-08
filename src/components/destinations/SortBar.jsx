import Icon from "./Icon";


export default function SortBar({ total, shown, sort, onSortChange, view, onViewChange }) {
    return (
        <div className="max-w-[1280px] mx-auto px-12 pt-6 pb-0 flex items-center justify-between flex-wrap gap-3">
            <p className="text-[14px] text-gray-500" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                Showing <span className="font-bold text-gray-800">{shown}</span>{" "}
                of <span className="font-bold text-gray-800">{total}</span> destinations
            </p>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-500">
                    <span>Sort:</span>
                    <div className="relative">
                        <select
                            value={sort}
                            onChange={(e) => onSortChange(e.target.value)}
                            className="appearance-none bg-gray-50 border border-gray-200 rounded-xl pl-3 pr-8 py-2
                text-[13px] font-semibold text-gray-700 cursor-pointer outline-none
                focus:border-[#00327d] transition-all duration-200"
                            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                        >
                            <option value="popular">Most Popular</option>
                            <option value="price-asc">Price: Low → High</option>
                            <option value="price-desc">Price: High → Low</option>
                            <option value="rating">Top Rated</option>
                            <option value="newest">Newest</option>
                        </select>
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                            <Icon name="expand_more" className="text-base" />
                        </span>
                    </div>
                </div>

                <div className="flex gap-1">
                    {[
                        { v: "grid", icon: "grid_view" },
                        { v: "list", icon: "view_list" },
                    ].map(({ v, icon }) => (
                        <button
                            key={v}
                            onClick={() => onViewChange(v)}
                            className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-200
                ${view === v
                                    ? "bg-[#00327d] border-[#00327d] text-white"
                                    : "bg-white border-gray-200 text-gray-500 hover:border-[#00327d] hover:text-[#00327d]"
                                }`}
                        >
                            <Icon name={icon} className="text-lg" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}