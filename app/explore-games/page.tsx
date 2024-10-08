import { EventCard } from "@/components/ui/event-card";
import { fetchGames } from "../actions";
import { Event } from "@/types/Event";
import GamesPagination from "./pagination";

export default async function ExploreGames({
  searchParams,
}: {
  searchParams: {
    onDate?: string;
    searchQuery?: string;
    page?: number;
    limit?: number;
  };
}) {
  const onDate = searchParams?.onDate || "";
  const searchQuery = searchParams?.searchQuery || "";
  const page = searchParams?.page || 1;
  const limit = searchParams?.limit || 12;

  const { data, error, nPages } = await fetchGames({
    onDate,
    searchQuery,
    page,
    limit,
  });

  const title = searchQuery
    ? `Explor Games in ${searchQuery}`
    : "Explore All Games";

  return (
    <div className="flex-1 w-full flex flex-col gap-6">
      <h1 className="font-bold text-2xl">{title}</h1>
      {data && data.length > 0 ? (
        <>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
            {data.map((event: Event) => (
              <EventCard
                id={event.id}
                eventName={event.name}
                location={event.location}
                key={event.id}
                scheduledAt={event.scheduledAt}
              />
            ))}
          </div>
          <GamesPagination
            onDate={onDate}
            searchQuery={searchQuery}
            page={page}
            limit={limit}
            nPages={nPages}
          />
        </>
      ) : (
        <p>No games found</p>
      )}
    </div>
  );
}
