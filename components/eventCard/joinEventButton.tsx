"use client";
import React from "react";
import { Button } from "../ui/button";
import { joinGame, leaveGame } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

type Props = {
  eventId: string;
  userHasJoined: boolean;
};

export default function JoinEventButton({ eventId, userHasJoined }: Props) {
  const { toast } = useToast();

  const onJoinGame = async () => {
    const { error } = await joinGame(eventId);

    if (error) {
      console.log(error);
      return toast({
        title: "Error joining event",
        description: error.message,
      });
    }

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
