import { useState, useCallback } from "react";
import { DESTINATIONS, PER_PAGE } from "../data/data";

import Navbar from "../components/Navbar";
import HeroBanner from "../components/destinations/DestinationsHero";
import SearchFilterBar from "../components/destinations/SearchFilterBar";
import ContinentPills from "../components/destinations/ContinentPills";
import SortBar from "../components/destinations/SortBar";
import DestinationsGrid from "../components/destinations/DestinationsGrid";
import Pagination from "../components/destinations/Pagination";
import QuickViewModal from "../components/destinations/QuickViewModal";
import BookingFlow from "../components/booking/BookingFlow";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Be+Vietnam+Pro:wght@400;500;600&family=Material+Symbols+Outlined:wght,FILL@400,0..1&display=swap');
  .scrollbar-none::-webkit-scrollbar { display: none }
  .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none }
  .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden }
`;

function applyFilters(data, filters, continent, sort) {
    let result = [...data];

    if (filters.search) {
        const q = filters.search.toLowerCase();
        result = result.filter(
            (d) =>
                d.name.toLowerCase().includes(q) ||
                d.country.toLowerCase().includes(q) ||
                d.continent.toLowerCase().includes(q) ||
                d.tags.some((t) => t.toLowerCase().includes(q))
        );
    }

    if (continent !== "All") result = result.filter((d) => d.continent === continent);

    if (filters.type) result = result.filter((d) => d.type === filters.type);

    if (filters.budget === "budget") result = result.filter((d) => d.price < 1000);
    if (filters.budget === "mid") result = result.filter((d) => d.price >= 1000 && d.price <= 3000);
    if (filters.budget === "luxury") result = result.filter((d) => d.price > 3000);

    if (filters.duration === "short") result = result.filter((d) => d.nights <= 5);
    if (filters.duration === "medium") result = result.filter((d) => d.nights >= 6 && d.nights <= 10);
    if (filters.duration === "long") result = result.filter((d) => d.nights > 10);

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    else if (sort === "newest") result.sort((a, b) => b.id - a.id);
    else result.sort((a, b) => b.reviews - a.reviews); // popular

    return result;
}


export default function DestinationsPage() {
    const [filters, setFilters] = useState({ search: "", budget: "", type: "", duration: "" });
    const [continent, setContinent] = useState("All");
    const [sort, setSort] = useState("popular");
    const [view, setView] = useState("grid");
    const [favorites, setFavorites] = useState(new Set());
    const [page, setPage] = useState(1);
    const [modal, setModal] = useState(null); // destination | null
    const [bookingDestination, setBookingDestination] = useState(null); // triggers BookingFlow


    const allFiltered = useCallback(
        () => applyFilters(DESTINATIONS, filters, continent, sort),
        [filters, continent, sort]
    )();

    const totalPages = Math.ceil(allFiltered.length / PER_PAGE);
    const paged = allFiltered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    function handleFilterChange(key, value) {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setPage(1);
    }

    function handleClearFilters() {
        setFilters({ search: "", budget: "", type: "", duration: "" });
        setContinent("All");
        setSort("popular");
        setPage(1);
    }

    function handleContinentSelect(c) {
        setContinent(c);
        setPage(1);
    }

    function handleSortChange(v) {
        setSort(v);
        setPage(1);
    }

    function handleFavToggle(id) {
        setFavorites((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }

    function handlePageChange(p) {
        if (p < 1 || p > totalPages) return;
        setPage(p);
        window.scrollTo({ top: 320, behavior: "smooth" });
    }


    if (bookingDestination) {
        return (
            <BookingFlow
                destination={bookingDestination}
                onClose={() => setBookingDestination(null)}
            />
        );
    }

    return (
        <div className="min-h-screen bg-[#f7f9fb]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            <style>{GLOBAL_STYLES}</style>

            <Navbar currentView="destinations" />

            <HeroBanner />

            <SearchFilterBar
                filters={filters}
                onChange={handleFilterChange}
                onClear={handleClearFilters}
            />

            <ContinentPills active={continent} onSelect={handleContinentSelect} />

            <SortBar
                total={allFiltered.length}
                shown={paged.length}
                sort={sort}
                onSortChange={handleSortChange}
                view={view}
                onViewChange={setView}
            />

            <div className="max-w-[1280px] mx-auto px-12 pt-6 pb-16">
                <DestinationsGrid
                    destinations={paged}
                    favorites={favorites}
                    onFavToggle={handleFavToggle}
                    onCardClick={setModal}
                    view={view}
                />
                <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
            </div>

            {modal && (
                <QuickViewModal
                    destination={modal}
                    isFav={favorites.has(modal.id)}
                    onFavToggle={handleFavToggle}
                    onClose={() => setModal(null)}
                    onBook={(dest) => {
                        setModal(null);
                        setBookingDestination(dest);
                    }}
                />
            )}
        </div>
    );
}