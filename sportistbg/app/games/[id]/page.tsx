import { fetchEvent } from "@/app/actions";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const { data } = await fetchEvent(id);

  if (data?.length === 0) {
    notFound();
  }

  const [event] = data;

  return (
    <div>
      <p className="text-2xl">Game Details: {event.name}</p>
      <p>{event.location}</p>
    </div>
  );
}
