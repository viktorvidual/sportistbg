import { fetchGames } from "../actions";
import { Camelize } from "camelize-ts";
import AllGames from "@/components/all-games";

//styles components
import { MainContainer } from "@/components/ui/mainContainer";

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
  const { data: eventResults } = await fetchGames();

  return (
    <MainContainer>
      <AllGames />
    </MainContainer>
  );
}
