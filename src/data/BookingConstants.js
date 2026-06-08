
export const BOOKING_STEPS = [
    { id: 1, label: "Trip Details", icon: "event_note" },
    { id: 2, label: "Travellers", icon: "group" },
    { id: 3, label: "Payment", icon: "credit_card" },
    { id: 4, label: "Confirmation", icon: "check_circle" },
];

export const ROOM_OPTIONS = [
    {
        id: "standard",
        label: "Standard Room",
        desc: "Comfortable twin/double room with all essentials",
        priceModifier: 0,
        icon: "hotel",
        features: ["Breakfast included", "Free Wi-Fi", "Daily housekeeping"],
    },
    {
        id: "deluxe",
        label: "Deluxe Room",
        desc: "Spacious room with upgraded amenities & city view",
        priceModifier: 250,
        icon: "king_bed",
        features: ["Breakfast & dinner", "Free Wi-Fi", "Room upgrade", "Late checkout"],
    },
    {
        id: "suite",
        label: "Luxury Suite",
        desc: "Premium suite with private terrace & butler service",
        priceModifier: 750,
        icon: "villa",
        features: ["All meals", "Free Wi-Fi", "Private terrace", "Butler service", "Airport transfer"],
    },
];

export const ADD_ONS = [
    { id: "transfer", label: "Airport Transfers", price: 80, icon: "airport_shuttle" },
    { id: "travel_ins", label: "Travel Insurance", price: 120, icon: "health_and_safety" },
    { id: "photo", label: "Photography Session", price: 200, icon: "photo_camera" },
    { id: "guide", label: "Private Local Guide", price: 350, icon: "person_pin" },
];

export const COUNTRIES = [
    "United States", "United Kingdom", "Canada", "Australia", "Germany",
    "France", "Nigeria", "South Africa", "Japan", "Singapore",
    "United Arab Emirates", "India", "Brazil", "Mexico", "Other",
];

export const CARD_TYPES = {
    visa: { label: "Visa", pattern: /^4/ },
    mastercard: { label: "Mastercard", pattern: /^5[1-5]/ },
    amex: { label: "Amex", pattern: /^3[47]/ },
};