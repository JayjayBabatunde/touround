import { CONTINENTS } from "../../data/data";
import Icon from "./Icon";

export default function ContinentPills({ active, onSelect }) {
    return (
        <div className="max-w-[1280px] mx-auto px-12 pt-8">
            <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                {CONTINENTS.map((c) => (
                    <button
                        key={c.name}
                        onClick={() => onSelect(c.name)}
                        className={`flex-shrink-0 flex items-center gap-1.5 px-5 py-2 rounded-full text-[13px] font-semibold
              whitespace-nowrap border transition-all duration-200
              ${active === c.name
                                ? "bg-[#00327d] text-white border-[#00327d] shadow-md shadow-blue-900/25"
                                : "bg-white text-gray-500 border-gray-200 hover:border-[#00327d] hover:text-[#00327d]"
                            }`}
                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
                    >
                        <Icon name={c.icon} className="text-[15px]" />
                        {c.name}
                    </button>
                ))}
            </div>
        </div>
    );
}