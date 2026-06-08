// USER object removed — real data comes from Firebase via useAuth()

export const BOOKINGS = [
    {
        id: "VG-A8TK39PL",
        destination: "Santorini",
        country: "Greece",
        continent: "Europe",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8hu3AAhnqxYZLlCq3J1agWB38u05FtuPfAC38UL927skdElt0pJRAT3zf3_GNLq8u9Sk6sDjpvvZsovG7pqIJJ1dABR6DN6icfPa0QjJCUGaKuQKvkJrSOzkUELyebapWfY4SxPv6NbZuRI-x6UzU9-K8j7UJccWWyMxtLEFkqfv73wRbd1Ct5_S2Z2alqe9mV0crzkiQzJz-2feXBct4AYumYbZGbFloesjNd2w78WAKHDVc3ooPtuE3sVv1ZuCTD7PNBLGegH19",
        checkIn: "2025-08-14",
        checkOut: "2025-08-21",
        nights: 7,
        travellers: 2,
        total: 4318,
        status: "confirmed",
        room: "Deluxe Room",
    },
    {
        id: "VG-B2NM77QX",
        destination: "Kyoto",
        country: "Japan",
        continent: "Asia",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsTgerhko72rNj0yJbnOhYGYM_H6GgyJVlroAdiinb0AhTCY5IuqVkcYMo_wJiY_rOSr6WQFjTq1uv3iBkEN9C0h-8_aYqEJSEHQRIYRzLYn40iYummCvk6psyu-jFNXTT4NMwE-y8c73tWaAbysPoPpD2aYh5xrsk2lkZtGfjl6Zzxhcx0HMZz85iWhsYhsvuUwcxP-HrWQ23dsMsFq8vjH-qp_QndEs4Sthb0onpylxpihPqvwLlY9kwa04DbyFqVyzlDtRCDozH",
        checkIn: "2025-11-03",
        checkOut: "2025-11-11",
        nights: 8,
        travellers: 2,
        total: 6116,
        status: "confirmed",
        room: "Standard Room",
    },
    {
        id: "VG-C5RW12DH",
        destination: "Bali",
        country: "Indonesia",
        continent: "Asia",
        img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
        checkIn: "2024-12-20",
        checkOut: "2024-12-30",
        nights: 10,
        travellers: 2,
        total: 3218,
        status: "completed",
        room: "Standard Room",
    },
];

export const FAVOURITES = [
    {
        id: 9,
        name: "Maldives",
        country: "Maldives",
        continent: "Asia",
        price: 4800,
        rating: 5.0,
        nights: 7,
        img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
        badge: "Luxury",
    },
    {
        id: 15,
        name: "Patagonia",
        country: "Argentina/Chile",
        continent: "Americas",
        price: 3800,
        rating: 4.9,
        nights: 14,
        img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
        badge: "Off the Grid",
    },
    {
        id: 26,
        name: "Iceland",
        country: "Iceland",
        continent: "Arctic",
        price: 2900,
        rating: 4.9,
        nights: 8,
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuComI0tfPDdInT_rm0t1J2SnBBJsbHgvaBDhRAAt5_wnvE8P0sJPjcRjI4VE1rixPDjhAdCfS7cNC2cZuC53cm54nmTOCY3z4Ocwc8-QKjQ7_isDaO4C6nkZzR_2xGsgDLRndcWbi66E-_SQ-TRL-K2u-0iwXJWsw9y3XppU3HK314HCaKY1KaKEN_yY6XCda5DMFvdTj9dqtuNsBjmBGNdQVQYTsurm1rnpKO1a18ultBIGaFvx8pIBrJ1NkHSI2vZJyp5AcvPyzOY",
        badge: "Top Rated",
    },
];

export function formatDate(iso) {
    return new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric",
    });
}

export function daysUntil(iso) {
    const diff = new Date(iso) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function initials(first, last) {
    return `${(first[0] ?? "").toUpperCase()}${(last[0] ?? "").toUpperCase()}`;
}