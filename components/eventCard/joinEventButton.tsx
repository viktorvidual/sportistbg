"use client";
import React from "react";
import { Button } from "../ui/button";
import { joinGame, leaveGame } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Event } from "@/types/Event";

type Props = {
  eventId: string;
  userHasJoined: boolean;
  updateGamesState: React.Dispatch<React.SetStateAction<Event[]>>;
  userId?: string;
};

export default function JoinEventButton({
  eventId,
  userHasJoined,
  updateGamesState,
  userId,
}: Props) {
  const { toast } = useToast();

  const onJoinGame = async () => {
    const { error } = await joinGame(eventId);

    if (error) {
      return toast({
        title: "Error joining event",
        description: error.message,
      });
    }

    updateGamesState((prev: Event[]) => {
      const events = [...prev];

      const updatedGames = events.map((el) => {
        if (el.id === eventId) {
          const participants = userId
            ? [...el.participants, userId] // Ensure userId is not undefined before adding
            : el.participants;

          return {
            ...el,
            participants,
          };
        }
        return el;
      });
      return updatedGames;
    });
    toast({
      title: "Game Joined",
    });
  };

  const onLeaveGame = async () => {
    const { error } = await leaveGame(eventId);

    if (error) {
      console.log(error);
      return toast({
        title: "Error joining event",
        description: error.message,
      });
    }

    updateGamesState((prev: Event[]) => {
      const events = [...prev];

      const updatedGames = events.map((el) => {
        // Fix the comparison here (el.id === eventId)
        if (el.id === eventId) {
          // Fix the filter logic to return a boolean value
          const participants = el.participants.filter(
            (participant) => participant !== userId
          );

          return {
            ...el,
            participants: participants,
          };
        }
        return el;
      });
      return updatedGames;
    });

    toast({
      title: "Game Left",
    });
  };
  return (
    <>
      {userHasJoined ? (
        <Button
          onClick={async (e) => {
            e.preventDefault();
            await onLeaveGame();
          }}
          className="bg-black text-white"
        >
          Leave
        </Button>
      ) : (
        <Button
          onClick={async (e) => {
            e.preventDefault();
            await onJoinGame();
          }}
          className="bg-black text-white"
        >
          Join
        </Button>
      )}
    </>
  );
}
