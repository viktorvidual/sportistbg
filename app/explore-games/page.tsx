import { fetchGames } from "../actions";
import GamesPagination from "./pagination";
import SearchBar from "@/components/search-bar";
import moment from "moment";
import { createClient } from "@/utils/supabase/server";
import GamesList from "@/components/games-list";

export default async function ExploreGames({
  searchParams,
}: {
  searchParams: {
    onDate?: string;
    searchQuery?: string;
    page?: number;
    limit?: number;
  };
}) {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  const onDate = searchParams?.onDate || "";
  const searchQuery = searchParams?.searchQuery || "";
  const page = searchParams?.page || 1;
  const limit = searchParams?.limit || 12;

  const { data, error, nPages } = await fetchGames({
    onDate,
    searchQuery,
    page,
    limit,
  });

  if (error) {
    return <p>Could not fetch games</p>;
  }

  let title = "Explore Games";

  if (onDate) {
    title += ` on ${moment(onDate).format("MM/DD/YY")}`;
  }

  if (searchQuery) {
    title += ` in ${searchQuery}`;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-6">
      <h1 className="font-bold text-2xl">{title}</h1>
      <SearchBar searchParams={{ query: searchQuery, onDate: onDate }} />
      {data && data.length > 0 ? (
        <>
          <GamesList games={data} userId={user?.id} />

          {nPages && nPages > 1 && (
            <GamesPagination
              onDate={onDate}
              searchQuery={searchQuery}
              page={page}
              limit={limit}
              nPages={nPages ? nPages : 1}
            />
          )}
        </>
      ) : (
        <p>No games found</p>
      )}
    </div>
  );
}
