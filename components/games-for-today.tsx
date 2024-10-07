import { EventCard } from "./ui/event-card";
import { fetchTodayGames } from "@/app/actions";
import { Event } from "@/types/Event";
import { Button } from "./ui/button";

//this has to be redone and included in types file

export default async function GamesForToday() {
  const { data: todayEvents } = await fetchTodayGames();

  return (
    <div className="flex-1 w-full flex flex-col gap-6">
      <h1 className="font-bold text-2xl">Games for today</h1>
      {todayEvents ? (
        <>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
            {todayEvents.map((event: Event, index: number) =>
              index >= 5 ? (
                <></>
              ) : (
                <EventCard
                  id={event.id}
                  eventName={event.name}
                  location={event.location}
                  key={event.id}
                  scheduledAt={event.scheduledAt}
                />
              )
            )}
          </div>
        </>
      ) : (
        <p>There are no events scheduled for today</p>
      )}
      <div className="flex flex-1 justify-center">
        {todayEvents && todayEvents.length > 5 && (
          <Button className="">View all games for today</Button>
        )}
      </div>
    </div>
  );
}
