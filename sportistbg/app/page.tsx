import Hero from "@/components/hero";
import AllGames from "@/components/all-games";

export default async function Index() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4 justify-center">
        <AllGames />
      </main>
    </>
  );
}
