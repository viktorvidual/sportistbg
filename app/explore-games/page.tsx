import { EventCard } from "@/components/ui/event-card";
import { fetchGames } from "../actions";
import { Event } from "@/types/Event";
export default async function ExploreGames({
  searchParams,
}: {
  searchParams: { onDate?: string; searchQuery?: string };
}) {
  console.log("searchParams", searchParams);
  const onDate = searchParams?.onDate || undefined;
  const searchQuery = searchParams?.searchQuery || undefined;

  const { data, error } = await fetchGames({ onDate, searchQuery });

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
        </>
      ) : (
        <p>No games found</p>
      )}
    </div>
  );
}
