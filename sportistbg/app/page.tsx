import Hero from "@/components/hero";
import AllGames from "@/components/all-games";
import { Main } from "@/components/tags/mainContainer";

export default async function Index() {
  return (
    <>
      <Hero />
      <Main>
        <AllGames />
      </Main>
    </>
  );
}
