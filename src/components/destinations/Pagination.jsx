import Icon from "./Icon";

function PageBtn({ onClick, active, disabled, label, icon }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-9 h-9 rounded-xl border text-[13px] font-semibold flex items-center justify-center
        transition-all duration-200
        ${active
                    ? "bg-[#00327d] border-[#00327d] text-white"
                    : disabled
                        ? "border-gray-200 text-gray-300 cursor-not-allowed opacity-50"
                        : "bg-white border-gray-200 text-gray-600 hover:border-[#00327d] hover:text-[#00327d]"
                }`}
            style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
            {icon ? <Icon name={icon} className="text-lg" /> : label}
        </button>
    );
}


export default function Pagination({ page, totalPages, onChange }) {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let p = 1; p <= totalPages; p++) {
        if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
            pages.push(p);
        } else if (Math.abs(p - page) === 2) {
            pages.push("…");
        }
    }
    const deduped = pages.filter((p, i) => !(p === "…" && pages[i - 1] === "…"));

    return (
        <div className="flex items-center justify-center gap-2 mt-12">
            <PageBtn
                onClick={() => onChange(page - 1)}
                disabled={page === 1}
                icon="chevron_left"
            />

            {deduped.map((p, i) =>
                p === "…" ? (
                    <span key={`ellipsis-${i}`} className="px-1 text-gray-400 text-sm">
                        …
                    </span>
                ) : (
                    <PageBtn
                        key={p}
                        onClick={() => onChange(p)}
                        active={page === p}
                        label={p}
                    />
                )
            )}

            <PageBtn
                onClick={() => onChange(page + 1)}
                disabled={page === totalPages}
                icon="chevron_right"
            />
        </div>
    );
}