"use client";
import React from "react";
import { deleteGame } from "@/app/actions/gameActions";
import ConfirmActionModal from "@/components/confirm-action-modal";

type Props = {
  gameId: string;
};

export default function DeleteGameButton({ gameId }: Props) {
  const onDelete = async () => {
    const { error } = (await deleteGame(gameId)) || {};
    if (error) {
      return { error };
    }
  };

  return (
    <>
      <ConfirmActionModal
        triggerText="Delete Game"
        title="Confirm delete"
        description="This action cannot be undone."
        onConfirm={onDelete}
        successMessage="Game Deleted successfully."
      />
    </>
  );
}
