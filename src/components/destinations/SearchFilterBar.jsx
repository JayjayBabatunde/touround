import Icon from "./Icon";

function SelectFilter({ value, onChange, options }) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none bg-gray-50 border border-transparent focus:border-[#00327d]
          rounded-xl pl-3 pr-8 py-2.5 text-[13px] font-semibold text-gray-700
          cursor-pointer outline-none transition-all duration-200 focus:bg-white"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon name="expand_more" className="text-base" />
            </span>
        </div>
    );
}

export default function SearchFilterBar({ filters, onChange, onClear }) {
    return (
        <div className="max-w-[1280px] mx-auto px-12">
            <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/10 px-6 py-5 -mt-7 relative z-10
        flex flex-wrap gap-3 items-center">

                <div
                    className="flex-1 min-w-[200px] flex items-center gap-2.5 bg-gray-50 rounded-xl px-4 py-2.5
            border border-transparent focus-within:border-[#00327d] focus-within:bg-white transition-all duration-200"
                >
                    <Icon name="search" className="text-xl text-gray-400" />
                    <input
                        type="text"
                        value={filters.search}
                        onChange={(e) => onChange("search", e.target.value)}
                        placeholder="Search destinations, countries, experiences…"
                        className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                    />
                    {filters.search && (
                        <button onClick={() => onChange("search", "")} className="text-gray-400 hover:text-gray-600">
                            <Icon name="close" className="text-base" />
                        </button>
                    )}
                </div>

                <SelectFilter
                    value={filters.budget}
                    onChange={(v) => onChange("budget", v)}
                    options={[
                        { value: "", label: "Any Budget" },
                        { value: "budget", label: "Budget (< $1k)" },
                        { value: "mid", label: "Mid-range ($1k–$3k)" },
                        { value: "luxury", label: "Luxury ($3k+)" },
                    ]}
                />

                <SelectFilter
                    value={filters.type}
                    onChange={(v) => onChange("type", v)}
                    options={[
                        { value: "", label: "All Types" },
                        { value: "beach", label: "Beach" },
                        { value: "adventure", label: "Adventure" },
                        { value: "cultural", label: "Cultural" },
                        { value: "city", label: "City" },
                        { value: "nature", label: "Nature" },
                    ]}
                />

                <SelectFilter
                    value={filters.duration}
                    onChange={(v) => onChange("duration", v)}
                    options={[
                        { value: "", label: "Any Duration" },
                        { value: "short", label: "3–5 nights" },
                        { value: "medium", label: "6–10 nights" },
                        { value: "long", label: "10+ nights" },
                    ]}
                />

                <button
                    onClick={onClear}
                    className="flex items-center gap-1.5 text-[13px] font-bold text-[#00327d] bg-blue-50
            px-4 py-2.5 rounded-xl hover:bg-[#00327d] hover:text-white transition-all duration-200"
                    style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                >
                    <Icon name="tune" className="text-base" />
                    Clear
                </button>
            </div>
        </div>
    );
}