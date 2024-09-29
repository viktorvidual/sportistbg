import React from "react";
import moment from "moment";

type EventCardProps = {
  imageUrl?: string;
  scheduledAt: string;
  eventName: string;
  location: string;
};

export const EventCard = ({
  imageUrl = "https://upload.wikimedia.org/wikipedia/commons/b/b8/Etihad_Stadium.jpg",
  scheduledAt,
  eventName = "10 vs 10",
  location = "Spartak Varna",
}: EventCardProps) => {
 const eventDate = moment(scheduledAt).format("MMMM Do YYYY, h:mm:ss a");

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-48 object-cover"
        src={imageUrl}
        alt={eventName}
      />
      <div className="p-4">
        <p className="text-sm text-gray-500">{eventDate}</p>
        <h3 className="text-xl font-bold text-gray-900 mt-2">{eventName}</h3>
        <p className="text-sm text-gray-600">{location}</p>
      </div>
    </div>
  );
};
