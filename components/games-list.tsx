"use client";
import React, { useState } from "react";
import { Event } from "@/types/Event";
import { EventCard } from "./eventCard/event-card";

type Props = {
  games: Event[];
  userId?: string;
};

//maybe add width-full?

export default function GamesList({ games, userId }: Props) {
  const [gamesState, updateGamesState] = useState(games);

  return (
    <>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
        {gamesState.map((event: Event) => (
          <EventCard
            key={event.id}
            event={event}
            userId={userId}
            updateGamesState={updateGamesState}
          />
        ))}
      </div>
    </>
  );
}
