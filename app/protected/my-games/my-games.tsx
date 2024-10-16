import {
  fetchGamesCreatedByUser,
  fetchJoinedGamesByUser,
} from "@/actions/gameActions";
import GamesList from "@/components/games-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  userId: string;
};

export default async function MyGames({ userId }: Props) {
  const [
    { data: eventsCreatedData, error: eventsCreatedError },
    { data: joinedEventsData, error: eventsJoinedError },
  ] = await Promise.all([
    await fetchGamesCreatedByUser(userId),
    await fetchJoinedGamesByUser(userId),
  ]);

  return (
    <>
      <div className="flex flex-1 w-full flex-col gap-4">
        <Tabs defaultValue="my-games" className="w-full">
          <TabsList>
            <TabsTrigger value="my-games">My Games</TabsTrigger>
            <TabsTrigger value="joined-games">Joined Games</TabsTrigger>
          </TabsList>
          <TabsContent value="my-games">
            {eventsCreatedData ? (
              <>
                <GamesList games={eventsCreatedData} userId={userId} />
              </>
            ) : (
              <p>You don't have any active games</p>
            )}
          </TabsContent>
          <TabsContent value="joined-games">
            {joinedEventsData ? (
              <>
                <GamesList games={joinedEventsData} userId={userId} />
              </>
            ) : (
              <p>You don't have any active games</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
