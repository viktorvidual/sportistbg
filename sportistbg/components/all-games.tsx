import { EventCard } from "./ui/event-card";
import { fetchEvents } from "@/app/actions";
import { Camelize } from "camelize-ts";

//this has to be redone and included in types file
export type EventResult = {
  id: number;
  name: string;
  location: string;
  image?: string;
  scheduled_at: string;
};

export type Event = Camelize<EventResult>;

export default async function AllGames() {
  const { data: eventResults } = await fetchEvents();

  console.log(eventResults);

  return (
    <div className="flex-1 w-full flex flex-col gap-12 p-8">
      <h1 className="font-bold text-2xl">Latest Games:</h1>
      {eventResults ? (
        <>
          <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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
        <p>No events found</p>
      )}
    </div>
  );
}
