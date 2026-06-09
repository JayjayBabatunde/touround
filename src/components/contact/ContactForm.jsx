import { useState, useId } from "react";
import Icon from "../destinations/Icon";
import { validateField, validateAll, isValid, SUBJECTS } from "./ContactUtils";

function FormField({ id, label, error, touched, required, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label
                htmlFor={id}
                className="text-[13px] font-semibold text-gray-700"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
                {label}
                {required && <span className="text-red-400 ml-0.5" aria-hidden="true">*</span>}
            </label>

            {children}

            <div className="min-h-[18px]">
                {touched && error && (
                    <p
                        className="flex items-center gap-1 text-[11px] text-red-500 font-semibold"
                        role="alert"
                    >
                        <Icon name="error" className="text-[13px]" />
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}

function TextInput({ id, value, onChange, onBlur, placeholder, type = "text", hasError, disabled }) {
    const [focused, setFocused] = useState(false);

    return (
        <div
            className={`flex items-center gap-2.5 bg-gray-50 rounded-xl px-4 py-3 border transition-all duration-200
        ${hasError ? "border-red-300 bg-red-50/40" : ""}
        ${focused && !hasError ? "border-[#00327d] bg-white shadow-sm shadow-blue-900/8" : ""}
        ${!focused && !hasError ? "border-gray-200" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
        >
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={() => { setFocused(false); onBlur(); }}
                onFocus={() => setFocused(true)}
                placeholder={placeholder}
                disabled={disabled}
                className="flex-1 bg-transparent text-[14px] text-gray-800 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            />
            {hasError && <Icon name="error" className="text-[16px] text-red-400 flex-shrink-0" />}
        </div>
    );
}

function SelectInput({ id, value, onChange, onBlur, options, hasError, disabled }) {
    const [focused, setFocused] = useState(false);

    return (
        <div
            className={`flex items-center bg-gray-50 rounded-xl px-4 py-3 border transition-all duration-200
        ${hasError ? "border-red-300 bg-red-50/40" : ""}
        ${focused && !hasError ? "border-[#00327d] bg-white shadow-sm shadow-blue-900/8" : ""}
        ${!focused && !hasError ? "border-gray-200" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
        >
            <select
                id={id}
                value={value}
                onChange={onChange}
                onBlur={() => { setFocused(false); onBlur(); }}
                onFocus={() => setFocused(true)}
                disabled={disabled}
                className="flex-1 bg-transparent text-[14px] text-gray-800 outline-none appearance-none disabled:cursor-not-allowed"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
                {options.map((o) => (
                    <option key={o.value} value={o.value} disabled={o.value === ""}>
                        {o.label}
                    </option>
                ))}
            </select>
            <Icon name="expand_more" className="text-gray-400 text-[18px] flex-shrink-0 pointer-events-none" />
        </div>
    );
}

function TextareaInput({ id, value, onChange, onBlur, placeholder, hasError, disabled, maxLength }) {
    const [focused, setFocused] = useState(false);

    return (
        <div
            className={`bg-gray-50 rounded-xl border transition-all duration-200
        ${hasError ? "border-red-300 bg-red-50/40" : ""}
        ${focused && !hasError ? "border-[#00327d] bg-white shadow-sm shadow-blue-900/8" : ""}
        ${!focused && !hasError ? "border-gray-200" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
        >
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                onBlur={() => { setFocused(false); onBlur(); }}
                onFocus={() => setFocused(true)}
                placeholder={placeholder}
                disabled={disabled}
                maxLength={maxLength}
                rows={5}
                className="w-full bg-transparent px-4 py-3 text-[14px] text-gray-800 outline-none
          placeholder:text-gray-400 resize-none disabled:cursor-not-allowed"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            />
            <div className="flex justify-end px-4 pb-2">
                <span className={`text-[11px] ${value.length > maxLength * 0.9 ? "text-amber-500" : "text-gray-400"}`}>
                    {value.length} / {maxLength}
                </span>
            </div>
        </div>
    );
}

function SuccessBanner({ onReset }) {
    return (
        <div
            className="flex flex-col items-center justify-center text-center py-16 px-6"
            style={{ animation: "slideUp .4s ease both" }}
        >
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
                <Icon name="check_circle" fill className="text-4xl text-emerald-500" />
            </div>
            <h3
                className="text-[22px] font-extrabold text-gray-900 mb-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
                Message sent!
            </h3>
            <p className="text-[14px] text-gray-500 max-w-xs leading-relaxed mb-8">
                Thanks for reaching out. Our team will get back to you within 4 business hours.
            </p>
            <button
                onClick={onReset}
                className="flex items-center gap-2 text-[13px] font-bold text-[#00327d]
          bg-blue-50 px-5 py-2.5 rounded-xl hover:bg-[#00327d] hover:text-white
          transition-all duration-150"
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
                <Icon name="edit" className="text-[15px]" />
                Send another message
            </button>
        </div>
    );
}

function ErrorBanner({ onDismiss }) {
    return (
        <div
            className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl px-4 py-4 mb-4"
            role="alert"
        >
            <Icon name="error" className="text-[20px] text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
                <div className="text-[13px] font-bold text-red-700">Something went wrong</div>
                <div className="text-[12px] text-red-500 mt-0.5">
                    We couldn't send your message. Please try again or email us directly at{" "}
                    <a href="mailto:support@ventureglobal.com" className="underline">
                        support@ventureglobal.com
                    </a>
                </div>
            </div>
            <button onClick={onDismiss} className="text-red-400 hover:text-red-600 flex-shrink-0">
                <Icon name="close" className="text-[16px]" />
            </button>
        </div>
    );
}

const EMPTY_FIELDS = {
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
};

export default function ContactForm() {
    const uid = useId();
    const id = (name) => `${uid}-${name}`;

    const [fields, setFields] = useState(EMPTY_FIELDS);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle");


    function handleChange(field, value) {
        setFields((prev) => ({ ...prev, [field]: value }));

        if (touched[field]) {
            const err = validateField(field, value);
            setErrors((prev) => ({ ...prev, [field]: err }));
        }
    }

    function handleBlur(field) {
        setTouched((prev) => ({ ...prev, [field]: true }));
        const err = validateField(field, fields[field]);
        setErrors((prev) => ({ ...prev, [field]: err }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const allTouched = Object.fromEntries(Object.keys(EMPTY_FIELDS).map((k) => [k, true]));
        setTouched(allTouched);

        const newErrors = validateAll(fields);
        setErrors(newErrors);

        if (!isValid(newErrors)) return;

        setStatus("loading");

        try {

            await simulateSubmit(fields);
            setStatus("success");
        } catch {
            setStatus("error");
        }
    }

    function handleReset() {
        setFields(EMPTY_FIELDS);
        setTouched({});
        setErrors({});
        setStatus("idle");
    }

    const disabled = status === "loading";

    if (status === "success") {
        return <SuccessBanner onReset={handleReset} />;
    }

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
            style={{ animation: "slideUp .35s ease both" }}
        >
            {status === "error" && (
                <ErrorBanner onDismiss={() => setStatus("idle")} />
            )}

            <div className="grid grid-cols-2 gap-4">
                <FormField
                    id={id("firstName")}
                    label="First name"
                    error={errors.firstName}
                    touched={touched.firstName}
                    required
                >
                    <TextInput
                        id={id("firstName")}
                        value={fields.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        onBlur={() => handleBlur("firstName")}
                        placeholder="Jane"
                        hasError={!!(touched.firstName && errors.firstName)}
                        disabled={disabled}
                    />
                </FormField>

                <FormField
                    id={id("lastName")}
                    label="Last name"
                    error={errors.lastName}
                    touched={touched.lastName}
                    required
                >
                    <TextInput
                        id={id("lastName")}
                        value={fields.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        onBlur={() => handleBlur("lastName")}
                        placeholder="Smith"
                        hasError={!!(touched.lastName && errors.lastName)}
                        disabled={disabled}
                    />
                </FormField>
            </div>

            <FormField
                id={id("email")}
                label="Email address"
                error={errors.email}
                touched={touched.email}
                required
            >
                <TextInput
                    id={id("email")}
                    type="email"
                    value={fields.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    placeholder="jane@example.com"
                    hasError={!!(touched.email && errors.email)}
                    disabled={disabled}
                />
            </FormField>

            <FormField
                id={id("subject")}
                label="Subject"
                error={errors.subject}
                touched={touched.subject}
                required
            >
                <SelectInput
                    id={id("subject")}
                    value={fields.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    onBlur={() => handleBlur("subject")}
                    options={SUBJECTS}
                    hasError={!!(touched.subject && errors.subject)}
                    disabled={disabled}
                />
            </FormField>

            <FormField
                id={id("message")}
                label="Message"
                error={errors.message}
                touched={touched.message}
                required
            >
                <TextareaInput
                    id={id("message")}
                    value={fields.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                    placeholder="Tell us how we can help…"
                    hasError={!!(touched.message && errors.message)}
                    disabled={disabled}
                    maxLength={2000}
                />
            </FormField>

            <button
                type="submit"
                disabled={disabled}
                className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl
          text-[15px] font-bold text-white transition-all duration-200
          ${disabled
                        ? "bg-[#fc8a40]/60 cursor-not-allowed"
                        : "bg-[#fc8a40] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-300/50 active:scale-95"
                    }`}
                style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
                {disabled ? (
                    <>
                        <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Sending…
                    </>
                ) : (
                    <>
                        <Icon name="send" className="text-lg" />
                        Send message
                    </>
                )}
            </button>

            <p className="text-center text-[11px] text-gray-400">
                We typically respond within 4 business hours.
            </p>
        </form>
    );
}

function simulateSubmit(fields) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fields);
        }, 1800);
    });
}