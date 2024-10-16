import { fetchGames } from "@/actions/gameActions";
import { createClient } from "@/utils/supabase/server";
import GamesList from "./games-list";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

//this has to be redone and included in types file

export default async function GamesForToday() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  const { data: todayEvents } = await fetchGames({
    limit: 6,
  });

  return (
    <div className="flex-1 w-full flex flex-col gap-6 items-center">
      <h2 className="font-bold text-3xl text-center">Upcoming games</h2>
      {todayEvents && todayEvents.length > 0 ? (
        <>
          <GamesList games={todayEvents} userId={user?.id} />
        </>
      ) : (
        <p>There are no events scheduled for today</p>
      )}
      <div className="flex flex-1 justify-center">
        {todayEvents && todayEvents.length > 5 && (
          <Link
            href={ROUTES.EXPLORE_GAMES}
            className={`${buttonVariants({ variant: "default" })}`}
          >
            See More
          </Link>
        )}
      </div>
    </div>
  );
}
