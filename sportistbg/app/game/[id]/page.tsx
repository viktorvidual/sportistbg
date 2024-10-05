import { fetchGame } from "@/app/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
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

  // const userIsOwner = user?.id === event.owner_id;

  const deleteGameWithId = deleteGameAction.bind(null, id);

  return (
    <div className="flex gap-6 flex-col w-full p-3">
      <p className="text-2xl">Game Details: {event.name}</p>
      <p>{event.location}</p>
      {/* Google Maps For Mobile */}
      <div className="block md:hidden">
        <iframe
          width="100%"
          height="350"
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
      <div className="flex justify-center space-x-4">
        <ConfirmActionModal
          triggerText="Delete Game"
          title="Are you sure that you would like to delete this game?"
          onConfirm={deleteGameWithId}
        />
        <Link
          href=""
          className={`${buttonVariants({ variant: "default" })} flex-1`}
        >
          Edit Game
        </Link>
      </div>
    </div>
  );
}
