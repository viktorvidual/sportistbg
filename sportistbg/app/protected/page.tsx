import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { EventCard } from "@/components/ui/event-card";
import { fetchEvents } from "../actions";
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

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: eventResults } = await fetchEvents();

  return (
    <div className="flex-1 w-full flex flex-col gap-12 p-8">
      <h1 className="font-bold text-2xl">Events near me:</h1>
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
