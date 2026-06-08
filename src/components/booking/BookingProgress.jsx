import Icon from "../destinations/Icon";
import { BOOKING_STEPS } from "../../data/BookingConstants";

export default function BookingProgress({ currentStep }) {
    return (
        <div className="w-full bg-white border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center">
                    {BOOKING_STEPS.map((step, idx) => {
                        const done = currentStep > step.id;
                        const active = currentStep === step.id;
                        const pending = currentStep < step.id;

                        return (
                            <div key={step.id} className="flex items-center flex-1 last:flex-none">
                                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300
                                        ${done ? "bg-emerald-500" : ""}
                                        ${active ? "bg-[#00327d] ring-4 ring-blue-100" : ""}
                                        ${pending ? "bg-gray-100" : ""}`}>
                                        {done
                                            ? <Icon name="check" className="text-white text-[14px] sm:text-[16px]" />
                                            : <Icon name={step.icon} className={`text-[14px] sm:text-[16px] ${active ? "text-white" : "text-gray-400"}`} />
                                        }
                                    </div>
                                    <span className={`text-[10px] sm:text-[11px] font-bold whitespace-nowrap transition-colors duration-200
                                        ${active ? "text-[#00327d]" : ""}
                                        ${done ? "text-emerald-600" : ""}
                                        ${pending ? "text-gray-400" : ""}`}
                                        style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                                        {/* hide label on very small screens */}
                                        <span className="hidden xs:inline">{step.label}</span>
                                        <span className="xs:hidden">{step.id}</span>
                                    </span>
                                </div>
                                {idx < BOOKING_STEPS.length - 1 && (
                                    <div className="flex-1 mx-2 sm:mx-3 mb-5">
                                        <div className="h-0.5 w-full rounded-full bg-gray-200 overflow-hidden">
                                            <div className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                                                style={{ width: done ? "100%" : "0%" }} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}