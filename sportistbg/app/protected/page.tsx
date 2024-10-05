import { fetchEvents } from "../actions";
import { Camelize } from "camelize-ts";
import AllGames from "@/components/all-games";

//this has to be redone and included in types file
export type EventResult = {
  id: number;
  name: string;
  location: string;
  image?: string;
  scheduled_at: string;
};

export type Event = Camelize<EventResult>;

export default async function ProtectedPage() {
  const { data: eventResults } = await fetchEvents();

  return (
    <div className="flex-1 w-full flex flex-col gap-12 p-8">
      <h1 className="font-bold text-2xl">Events near me:</h1>
      <AllGames />
    </div>
  );
}
