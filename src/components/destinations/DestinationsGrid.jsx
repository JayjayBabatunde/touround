import Icon from "./Icon";
import DestinationCard from "./DestinationCard";
import DestinationListCard from "./DestinationListCard";


export default function DestinationsGrid({ destinations, favorites, onFavToggle, onCardClick, view }) {
    if (destinations.length === 0) {
        return (
            <div className="text-center py-24 text-gray-400">
                <Icon name="search_off" className="text-6xl text-gray-200 block mb-4" />
                <h3
                    className="text-xl font-bold text-gray-600 mb-2"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    No destinations found
                </h3>
                <p className="text-sm">Try adjusting your filters or search terms.</p>
            </div>
        );
    }

    if (view === "list") {
        return (
            <div className="flex flex-col gap-4">
                {destinations.map((d, i) => (
                    <DestinationListCard
                        key={d.id}
                        destination={d}
                        isFav={favorites.has(d.id)}
                        onFavToggle={onFavToggle}
                        onClick={onCardClick}
                        animDelay={i * 0.05}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destinations.map((d, i) => (
                <DestinationCard
                    key={d.id}
                    destination={d}
                    isFav={favorites.has(d.id)}
                    onFavToggle={onFavToggle}
                    onClick={onCardClick}
                    animDelay={i * 0.06}
                />
            ))}
        </div>
    );
}