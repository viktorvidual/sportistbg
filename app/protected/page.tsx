import { fetchAllGames } from "../actions";
import AllGames from "@/components/all-games";

//styles components
import { Main } from "@/components/tags/mainContainer";

export default async function ProtectedPage() {

  return (
    <Main>
      <AllGames />
    </Main>
  );
}
