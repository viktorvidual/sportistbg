import Hero from "@/components/hero";
import GamesForToday from "@/components/games-for-today";
import { Main } from "@/components/tags/mainContainer";

export default async function Index() {
  return (
    <>
      <Hero />
      <Main>
        <GamesForToday />
      </Main>
    </>
  );
}
