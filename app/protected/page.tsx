import GamesForToday from "@/components/games-for-today";
import Hero from "@/components/hero";
import MyGames from "./my-games/my-games";

export default async function ProtectedPage() {
  return (
    <>
      <Hero />
      <GamesForToday />
    </>
  );
}
