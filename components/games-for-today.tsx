import { fetchTodayGames } from "@/actions/gameActions";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import GamesList from "./games-list";

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
          <GamesList games={todayEvents} userId={user?.id} />
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
