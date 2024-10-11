"use client";
import React from "react";
import { joinGame, leaveGame } from "@/app/actions/gameActions";
import { useToast } from "@/hooks/use-toast";
import { Event } from "@/types/Event";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import ConfirmActionModal from "../confirm-action-modal";
import { produce } from "immer";

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
  const router = useRouter();

  const onJoinGame = async () => {
    if (!userId) {
      toast({
        title: "You have to be logged in to join a game.",
      });
      router.push(ROUTES.SIGN_IN);
      return;
    }

    const { error } = await joinGame(eventId);

    if (error) {
      toast({
        title: "Error joining event",
        description: error.message,
      });
      return;
    }

    updateGamesState(
      produce((draft: Event[]) => {
        const event = draft.find((el) => el.id === eventId);
        if (event) {
          event.participants = event.participants
            ? [...event.participants, userId]
            : [userId]; // Ensure userId is not undefined before adding
        }
      })
    );

    toast({
      title: "Game Joined Successfully",
    });
  };

  const onLeaveGame = async () => {
    const { error } = await leaveGame(eventId);

    if (error) {
      console.log(error);
      toast({
        title: "Error joining event",
        description: error.message,
      });
      return;
    }

    updateGamesState(
      produce((draft: Event[]) => {
        const event = draft.find((el) => el.id === eventId);
        if (event) {
          event.participants = event?.participants.filter(
            (el) => el !== userId
          );
        }
      })
    );

    toast({
      title: "Game Left Successfully",
    });
  };

  return (
    <>
      {userHasJoined ? (
        <>
          <ConfirmActionModal
            triggerText="Leave"
            onConfirm={onLeaveGame}
            title="Leave Game?"
            description="Please confirm that you would like to leave this game."
            loadingText="Leaving..."
          />
        </>
      ) : (
        <>
          <ConfirmActionModal
            triggerText="Join"
            onConfirm={onJoinGame}
            title="Join Game?"
            description="Please confirm that you would like to join this game."
            loadingText="Leaving..."
          />
        </>
      )}
    </>
  );
}
