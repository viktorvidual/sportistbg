import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import DeleteGameButton from "./delete-game-button";
import DateTimeWidget from "@/components/date-time-widget";
import { createClient } from "@/utils/supabase/server";
import { fetchGame, fetchGameParticipants } from "@/actions/gameActions";

const TextContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex w-full justify-start flex-col">{children}</div>
);
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const { data } = await fetchGame(id);
  if (!data) {
    notFound();
  }
  const [event] = data;

  const {
    data: { user },
  } = await createClient().auth.getUser();

  const userIsOwner = user?.id === event?.creatorId;

  const { data: players } = await fetchGameParticipants(event.participants);

  return (
    <div className="flex gap-3 flex-col items-center w-11/12 md:w-5/12 mx-auto">
      <TextContainer>
        <h1 className="text-2xl font-bold">{event.name}</h1>
        <h2 className="text-lg">
          {event.location}, {event.city}
        </h2>
      </TextContainer>
      <DateTimeWidget timeStamp={event.scheduledAt} />

      <TextContainer>
        <h2 className="text-2xl font-bold">Players</h2>
        {players?.length > 0 && players.map((player) => <p>{player.email}</p>)}
      </TextContainer>

      <TextContainer>
        <h2 className="text-2xl font-bold">Map</h2>
      </TextContainer>
      {/* Google Maps For Mobile */}
      <div className="w-full block md:hidden overflow-hidden rounded">
        <iframe
          width="100%"
          height="300"
          loading="lazy"
          src={
            "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ7SxO9XJUpEARZg68Is2xLaM&key=" +
            process.env.GOOGLE_MAPS_API_KEY
          }
        />
      </div>
      {/* Google Maps For Desktop */}
      <div className="w-full hidden md:block overflow-hidden rounded">
        <iframe
          width="100%"
          height="400"
          loading="lazy"
          src={
            "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ7SxO9XJUpEARZg68Is2xLaM&key=" +
            process.env.GOOGLE_MAPS_API_KEY
          }
        />
      </div>
      {userIsOwner && (
        <div className="flex w-full gap-2 justify-center">
          {/* Modal for delete game */}
          <DeleteGameButton gameId={id} />
          <Link
            href=""
            className={`${buttonVariants({ variant: "default" })} flex-1`}
          >
            Edit Game
          </Link>
        </div>
      )}
    </div>
  );
}
