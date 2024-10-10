import React from "react";
import moment from "moment";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { Button } from "../ui/button";
import JoinEventButton from "./joinEventButton";
import { Event } from "@/types/Event";

const checkUserHasJoined = (participants: string[], userId: string) => {
  if (participants.some((el) => el === userId)) {
    return true;
  }

  return false;
};

export const EventCard = ({
  event,
  userId,
}: {
  event: Event;
  userId?: string;
}) => {
  const href = `${ROUTES.gameDetails}/${event.id}`;
  const time = moment(event.scheduledAt).format("LT");
  const date = moment(event.scheduledAt).format("DD/MM/YY");

  const userIsCreator = userId === event.creatorId;
  const userHasJoined = event.participants?.some((el) => el === userId);

  return (
    <div className="relative group">
      {/* Link wrapping the card content */}
      <Link href={href} className="block z-index-0">
        <div className="w-full rounded overflow-hidden shadow-lg bg-white relative lg:w-[300px]">
          {/* Overlay */}
          <div className="absolute hidden md:block inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

          <div className="p-4 group-active:scale-95 transition-transform duration-150">
            {/* Time & Date */}
            <div className="flex flex-row justify-between">
              <p className="text-md font-bold text-gray-600">Varna</p>
              <p className="text-md font-bold text-gray-600">{date}</p>
              <p className="text-md font-bold text-gray-600">{time}</p>
            </div>

            <h3 className="text-lg font-bold text-gray-900">{event.name}</h3>

            <div className="flex flex-col justify-center item-center mt-2">
              <p className="text-sm text-gray-600">6/12 Players</p>
              <p className="text-sm text-gray-600">{event.location}</p>
            </div>
          </div>
        </div>
      </Link>

      {/* Absolutely positioned button on top of the card */}
      <div className="absolute bottom-4 right-3 md:right-5 z-10">
        {/* {userIsCreator ? (
          <Button className="bg-black text-white">Edit Game</Button>
        ) : ( */}
          <JoinEventButton eventId={event.id} userHasJoined={userHasJoined} />
        {/* )} */}
      </div>
    </div>
  );
};