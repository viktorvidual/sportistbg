import { EventCard } from "@/components/eventCard/event-card";
import { fetchGamesByUser } from "@/app/actions";
import { Event } from "@/types/Event";

type Props = {
  userId: string;
};

export default async function MyGames({ userId }: Props) {
  const { data: eventResults } = await fetchGamesByUser(userId);

  return (
    <div className="flex flex-1 w-full flex-col gap-6">
      <h1 className="font-bold text-2xl">My Games</h1>
      {eventResults ? (
        <>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {eventResults.map((event: Event) => (
              <EventCard event={event} userId={userId} />
            ))}
          </div>
        </>
      ) : (
        <p>You don't have any active games</p>
      )}
    </div>
  );
}
