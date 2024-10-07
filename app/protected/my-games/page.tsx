import { Main } from "@/components/tags/mainContainer";
import MyGames from "./my-games";
import { createClient } from "@/utils/supabase/server";
import { signOutUserAfterAuthError } from "@/app/actions";

export default async function MyGamesPage() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  if (!user) {
    return signOutUserAfterAuthError();
  }

  return (
    <Main>
      <MyGames userId={user.id} />
    </Main>
  );
}
