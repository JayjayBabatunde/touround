
export default function Icon({ name, fill = false, className = "" }) {
    return (
        <span
            className={`inline-flex items-center align-middle leading-none select-none ${className}`}
            style={{
                fontFamily: "Material Symbols Outlined",
                fontWeight: 400,
                fontStyle: "normal",
                fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0",
            }}
        >
            {name}
        </span>
    );
}