import { Main } from "@/components/tags/mainContainer";
import AllGames from "@/components/all-games";
import { createClient } from "@/utils/supabase/server";

export default async function MyGamesPage() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return (
    <Main>
      <AllGames userId={user?.id} title="My Games" />
    </Main>
  );
}
