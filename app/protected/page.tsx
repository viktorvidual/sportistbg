import GamesForToday from "@/components/games-for-today";
import Hero from "@/components/hero";

//styles components
import { Main } from "@/components/tags/mainContainer";

export default async function ProtectedPage() {
  return (
    <>
      <Hero />
      <Main>
        <GamesForToday />
      </Main>
    </>
  );
}
