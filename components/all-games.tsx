import { EventCard } from "./ui/event-card";
import { fetchAllGames, fetchGamesByUser } from "@/app/actions";
import { Event } from "@/types/Event";

//this has to be redone and included in types file

type Props = {
  title?: string;
  userId?: string;
};

export default async function AllGames({ userId, title = "All Games" }: Props) {
  let games;

  if (!userId) {
    const { data: eventResults } = await fetchAllGames();
    games = eventResults;
  } else {
    const { data: eventResults } = await fetchAllGames();
    games = eventResults;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12 p-8">
      <h1 className="font-bold text-2xl">{title}</h1>
      {games ? (
        <>
          <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {games.map((event: Event) => (
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
        <p>No events found</p>
      )}
    </div>
  );
}
