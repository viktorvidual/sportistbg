import { fetchGame } from "@/app/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { deleteGameAction } from "@/app/actions";
import ConfirmActionModal from "@/components/confirm-action-modal";

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

  return (
    <div className="flex gap-4 flex-col w-full p-3">
      <h1 className="text-2xl">Game Details: {event.name}</h1>
      <h2>Location: {event.location}</h2>
      {/* Google Maps For Mobile */}
      <div className="block md:hidden">
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
      <div className="hidden md:block">
        <iframe
          width="600"
          height="450"
          loading="lazy"
          src={
            "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ7SxO9XJUpEARZg68Is2xLaM&key=" +
            process.env.GOOGLE_MAPS_API_KEY
          }
        />
      </div>
      {userIsOwner && (
        <div className="flex justify-center space-x-4">
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
