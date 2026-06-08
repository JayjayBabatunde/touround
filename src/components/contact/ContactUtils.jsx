
export function validateField(field, value) {
    const v = value.trim();

    switch (field) {
        case "firstName":
            if (!v) return "First name is required.";
            if (v.length < 2) return "Must be at least 2 characters.";
            return null;

        case "lastName":
            if (!v) return "Last name is required.";
            if (v.length < 2) return "Must be at least 2 characters.";
            return null;

        case "email":
            if (!v) return "Email address is required.";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address.";
            return null;

        case "subject":
            if (!v) return "Please select a subject.";
            return null;

        case "message":
            if (!v) return "Message is required.";
            if (v.length < 20) return "Message must be at least 20 characters.";
            if (v.length > 2000) return "Message cannot exceed 2000 characters.";
            return null;

        default:
            return null;
    }
}


export function validateAll(fields) {
    const errors = {};
    for (const [key, value] of Object.entries(fields)) {
        const err = validateField(key, value);
        if (err) errors[key] = err;
    }
    return errors;
}

export function isValid(errors) {
    return Object.keys(errors).length === 0;
}

export const SUBJECTS = [
    { value: "", label: "Select a subject…" },
    { value: "booking_enquiry", label: "Booking enquiry" },
    { value: "existing_booking", label: "Existing booking" },
    { value: "cancellation", label: "Cancellation or refund" },
    { value: "group_travel", label: "Group travel" },
    { value: "partnerships", label: "Partnerships" },
    { value: "other", label: "Something else" },
];