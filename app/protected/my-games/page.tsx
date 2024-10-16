import MyGames from "./my-games";
import { createClient } from "@/utils/supabase/server";
import { signOutUserAfterAuthError } from "@/actions/authActions";
import {
  fetchGamesCreatedByUser,
  fetchJoinedGamesByUser,
} from "@/actions/gameActions";

export default async function MyGamesPage({}) {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  if (!user) {
    return signOutUserAfterAuthError();
  }

  const [
    { data: eventsCreatedData, error: eventsCreatedError },
    { data: joinedEventsData, error: eventsJoinedError },
  ] = await Promise.all([
    await fetchGamesCreatedByUser(user.id),
    await fetchJoinedGamesByUser(user.id),
  ]);

  return (
    <MyGames
      eventsCreatedData={eventsCreatedData}
      joinedEventsData={joinedEventsData}
      userId={user.id}
    />
  );
}
