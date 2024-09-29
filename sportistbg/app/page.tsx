import Hero from "@/components/hero";

export default async function Index() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4 justify-center">
        <h2 className="font-medium text-xl mb-4">Render current events here</h2>
      </main>
    </>
  );
}
