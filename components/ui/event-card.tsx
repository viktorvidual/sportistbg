import React from "react";
import moment from "moment";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { Button } from "./button";

type EventCardProps = {
  id: number;
  scheduledAt: string;
  eventName: string;
  location: string;
  myGame?: boolean;
};

export const EventCard = ({
  id,
  scheduledAt,
  eventName = "10 vs 10",
  location = "Spartak Varna",
  myGame = false,
}: EventCardProps) => {
  const href = `${ROUTES.gameDetails}/${id}`;

  const time = moment(scheduledAt).format("LT");
  const date = moment(scheduledAt).format("DD/MM/YY");

  return (
    <Link href={href} className="z-index-0">
      <div className="w-100% rounded overflow-hidden shadow-lg bg-white relative group lg:w-[300px]">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

        <div className="p-4 group-active:scale-95 transition-transform duration-150">
          {/* Time & Date */}
          <div className="flex flex-row justify-between">
            <p className="text-md font-bold text-gray-600">Varna</p>
            <p className="text-md font-bold text-gray-600">{date}</p>
            <p className="text-md font-bold text-gray-600">{time}</p>
          </div>

          <h3 className="text-lg font-bold text-gray-900">{eventName}</h3>

          <div className="flex flex-row justify-between">
            <div className="flex flex-col justify-center item-center mt-2">
              <p className="text-sm text-gray-600">6/12 Players</p>
              <p className="text-sm text-gray-600">{location} Stadium</p>
            </div>
            <div className="flex flex-col justify-center mt-2 ml-2">
              <Button className="bg-black text-white z-index-10">
                {myGame ? "Edit Game" : "Join Game"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
