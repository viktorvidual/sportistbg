import { EventCard } from "./eventCard/event-card";
import { fetchTodayGames } from "@/app/actions";
import { Event } from "@/types/Event";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

//this has to be redone and included in types file

export default async function GamesForToday() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  const { data: todayEvents } = await fetchTodayGames();

  return (
    <div className="flex-1 w-full flex flex-col gap-6 items-center">
      <h2 className="font-bold text-3xl text-center">
        Games to be played today
      </h2>
      {todayEvents && todayEvents.length > 0 ? (
        <>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
            {todayEvents.map((event: Event, index: number) =>
              index >= 5 ? <></> : <EventCard event={event} userId={user?.id} />
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
