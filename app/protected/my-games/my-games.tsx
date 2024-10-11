import { fetchGamesCreatedByUser } from "@/app/actions/gameActions";
import GamesList from "@/components/games-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  userId: string;
};

export default async function MyGames({ userId }: Props) {
  const { data: eventResults } = await fetchGamesCreatedByUser(userId);

  return (
    <>
      <div className="flex flex-1 w-full flex-col gap-4">
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="my-games">My Games</TabsTrigger>
            <TabsTrigger value="joined-games">Joined Games</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          {/* <TabsContent value="my-games">
          <h1 className="font-bold text-2xl">My Games</h1>
        </TabsContent>
        <TabsContent value="joined-games">
          <h1 className="font-bold text-2xl">Games I Joined</h1>
        </TabsContent> */}
        </Tabs>

        {eventResults ? (
          <>
            <GamesList games={eventResults} userId={userId} />
          </>
        ) : (
          <p>You don't have any active games</p>
        )}
      </div>
    </>
  );
}
