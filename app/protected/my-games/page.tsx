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

  return <MyGames userId={user.id} />;
}
