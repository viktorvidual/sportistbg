import Hero from "@/components/hero";
import AllGames from "@/components/all-games";
import { MainContainer } from "@/components/ui/mainContainer";

export default async function Index() {
  return (
    <>
      {/* <Hero /> */}
      <MainContainer>
        <AllGames />
      </MainContainer>
    </>
  );
}
