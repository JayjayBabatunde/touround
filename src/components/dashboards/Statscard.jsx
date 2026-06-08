import Icon from "../destinations/Icon";

export default function StatCard({ icon, label, value, sub }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Icon name={icon} className="text-[20px] text-[#00327d]" />
            </div>
            <div>
                <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">{label}</div>
                <div
                    className="text-[22px] font-extrabold text-gray-900 leading-tight"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    {value}
                </div>
                {sub && <div className="text-[11px] text-gray-400 mt-0.5">{sub}</div>}
            </div>
        </div>
    );
}