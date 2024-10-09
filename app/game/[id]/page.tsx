import { fetchGame } from "@/app/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { deleteGameAction } from "@/app/actions";
import ConfirmActionModal from "@/components/confirm-action-modal";
import DateTimeWidget from "@/components/date-time-widget";
import moment from "moment";

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
  const deleteGameWithId = deleteGameAction.bind(null, id);

  const timeAndDate = moment(event.scheduledAt).format("dddd, DD/MM/YY, HH:mm");

  return (
    <div className="flex gap-3 flex-col items-center w-11/12 md:w-5/12 mx-auto">
      <h1 className="text-2xl font-bold">{event.name}</h1>
      <h2 className="text-lg">
        {event.location}, {event.city}
      </h2>

      <DateTimeWidget timeStamp={event.scheduledAt} />

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

          <ConfirmActionModal
            triggerText="Delete Game"
            title="Confirm delete"
            description="This action cannot be undone."
            onConfirm={deleteGameWithId}
            loadingText="Deleting Game"
          />
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
