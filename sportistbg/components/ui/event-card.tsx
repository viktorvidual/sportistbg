import React from "react";
import moment from "moment";

type EventCardProps = {
  imageUrl: string;
  scheduledAt: moment.Moment;
  eventName: string;
  location: string;
  followers: number;
};

const date = "2023-09-20"; // Replace with your date string in YYYY-MM-DD format
const time = "17:00"; // Replace with your time string in HH:mm format

export const EventCard = ({
  imageUrl = "https://upload.wikimedia.org/wikipedia/commons/b/b8/Etihad_Stadium.jpg",
  scheduledAt = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm"),
  eventName = "10 vs 10",
  location = "Spartak Varna",
}: EventCardProps) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-48 object-cover"
        src={imageUrl}
        alt={eventName}
      />
      <div className="p-4">
        <p className="text-sm text-gray-500">{scheduledAt.isLocal()}</p>
        <h3 className="text-xl font-bold text-gray-900 mt-2">{eventName}</h3>
        <p className="text-sm text-gray-600">{location}</p>
      </div>
    </div>
  );
};
