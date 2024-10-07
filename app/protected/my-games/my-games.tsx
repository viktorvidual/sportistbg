import { EventCard } from "@/components/ui/event-card";
import { fetchGamesByUser } from "@/app/actions";
import { Event } from "@/types/Event";

type Props = {
  userId: string;
};

export default async function MyGames({ userId }: Props) {
  const { data: eventResults } = await fetchGamesByUser(userId);

  return (
    <div className="flex-1 w-full flex flex-col gap-6 p-8">
      <h1 className="font-bold text-2xl">My Games</h1>
      {eventResults ? (
        <>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {eventResults.map((event: Event) => (
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
        <p>You don't have any active games</p>
      )}
    </div>
  );
}
