"use client";
import { useState } from "react";
import { QueryError } from "@supabase/supabase-js";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import Loader from "./loader";
import { useToast } from "@/hooks/use-toast";

type Props = {
  triggerText: string;
  onConfirm: () => Promise<void | undefined | { error: QueryError }>;
  title: string;
  description?: string;
  loadingText?: string;
  successMessage?: string;
};

export default function ConfirmActionModal({
  triggerText,
  onConfirm,
  title,
  description,
  loadingText,
  successMessage,
}: Props) {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const onComplete = async () => {
    setIsLoading(true);
    const { error } = (await onConfirm()) || {};

    if (error) {
      toast({
        title: error.message,
      });
      return;
    }

    if (successMessage) {
      toast({
        title: successMessage,
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="flex-1">{triggerText}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-10/12 rounded">
          {isLoading ? (
            <AlertDialogHeader>
              <AlertDialogTitle>{loadingText}</AlertDialogTitle>
            </AlertDialogHeader>
          ) : (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                {description && (
                  <AlertDialogDescription>{description}</AlertDialogDescription>
                )}
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel className="flex-1">Close</AlertDialogCancel>
                <AlertDialogAction className="flex-1" onClick={onComplete}>
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
      {isLoading && <Loader />}
    </>
  );
}
