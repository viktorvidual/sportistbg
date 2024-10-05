import { fetchEvent } from "@/app/actions";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const { data } = await fetchEvent(id);

  if (data?.length === 0) {
    notFound();
  }

  const [event] = data;

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
    </div>
  );
}
